/* ============ 英语学习站 · 交互逻辑 ============ */
const $ = (id) => document.getElementById(id);

/* ---------- 首页：学段卡片 ---------- */
function renderStages() {
  const grid = $('stageGrid');
  if (!grid) return;
  grid.innerHTML = STAGES.map((s) => `
    <a class="stage-card" style="--sc:${s.color}" href="stage.html?level=${s.id}">
      <div class="icon">${s.icon}</div>
      <h3>${s.name}</h3>
      <div class="en">${s.en}</div>
      <p>${s.desc}</p>
    </a>`).join('');
}

/* ---------- 在线词典（1.4 万词大词库 + 精选词条） ---------- */
function allWords() {
  const seen = new Set();
  const out = [];
  Object.values(LEVEL_DATA).forEach((lv) => {
    lv.vocab.forEach((v) => {
      if (!seen.has(v.w)) { seen.add(v.w); out.push(v); }
    });
  });
  return out;
}
let DICT = null, dictLoading = null;
function loadDict() {
  if (DICT) return Promise.resolve(DICT);
  if (dictLoading) return dictLoading;
  dictLoading = fetch('assets/dict.json')
    .then((r) => r.json())
    .then((j) => { DICT = j; return j; })
    .catch(() => { DICT = {}; return DICT; });
  return dictLoading;
}
function dictSearch() {
  const box = $('dictResult');
  if (!box) return;
  const raw = $('dictInput').value.trim();
  const q = raw.toLowerCase();
  if (!q) { box.innerHTML = '<p class="dict-hint">14000+ 核心词汇，输入即查，比如 hello、apple、phenomenon、苹果</p>'; return; }
  box.innerHTML = '<p class="dict-hint">查询中…</p>';
  loadDict().then(() => {
    const curated = allWords().filter((v) => v.w.toLowerCase().includes(q) || v.zh.includes(raw));
    const seen = new Set(curated.map((v) => v.w.toLowerCase()));
    const big = [];
    const keys = Object.keys(DICT);
    const push = (k) => { if (!seen.has(k)) { seen.add(k); big.push(k); } };
    if (DICT[q]) push(q);                                    // 完全匹配优先
    for (const k of keys) { if (big.length >= 12) break; if (k !== q && k.startsWith(q)) push(k); }
    if (big.length < 6) {
      for (const k of keys) { if (big.length >= 12) break; if (k !== q && !k.startsWith(q) && k.includes(q)) push(k); }
    }
    let html = curated.slice(0, 12).map((v) => `
      <div class="dict-item">
        <span class="w">${v.w}</span><span class="ph">${v.ph}</span><br>
        <span class="pos">${v.pos}</span> ${v.zh}
        <div class="ex">例：${v.ex}</div>
      </div>`).join('');
    html += big.map((k) => `
      <div class="dict-item">
        <span class="w">${k}</span><span class="ph">${DICT[k][0] ? '/' + DICT[k][0] + '/' : ''}</span><br>
        ${DICT[k][1]}
      </div>`).join('');
    if (!html) {
      html = `<p class="dict-hint">没有找到“${raw}”，检查一下拼写，或换个词试试。</p>`;
    }
    box.innerHTML = html;
  });
}

/* ---------- 单词记忆配对游戏 ---------- */
const game = { first: null, lock: false, matched: 0, tries: 0, total: 8 };
function gameStart() {
  const grid = $('matchGrid');
  if (!grid) return;
  const pool = allWords().filter((v) => v.w.length <= 12);
  // 洗牌后挑选 8 个，同时保证中文释义不重复（避免两张相同中文卡造成混淆）
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const seenZh = new Set();
  const picked = [];
  for (const v of shuffled) {
    if (picked.length >= game.total) break;
    if (!seenZh.has(v.zh)) { seenZh.add(v.zh); picked.push(v); }
  }
  const cards = [];
  picked.forEach((v) => { cards.push({ t: v.w, k: v.w }); cards.push({ t: v.zh, k: v.w }); });
  cards.sort(() => Math.random() - 0.5);
  game.first = null; game.lock = false; game.matched = 0; game.tries = 0;
  $('gameScore').textContent = '0';
  $('gameTries').textContent = '0';
  grid.innerHTML = cards.map((c, i) =>
    `<div class="mcard" data-k="${c.k}" data-i="${i}">?</div>`).join('');
  grid.querySelectorAll('.mcard').forEach((el) => {
    el.addEventListener('click', () => gameFlip(el, cards[+el.dataset.i].t));
  });
}
function gameFlip(el, text) {
  if (game.lock || el.classList.contains('open') || el.classList.contains('done')) return;
  el.textContent = text;
  el.classList.add('open');
  if (!game.first) { game.first = el; return; }
  game.tries++;
  $('gameTries').textContent = game.tries;
  if (game.first.dataset.k === el.dataset.k) {
    game.first.classList.add('done'); el.classList.add('done');
    game.first.classList.remove('open'); el.classList.remove('open');
    game.first = null;
    game.matched++;
    $('gameScore').textContent = game.matched;
    if (game.matched === game.total) {
      setTimeout(() => alert(`🎉 全部配对成功！共用了 ${game.tries} 次尝试，再来一局？`), 300);
    }
  } else {
    game.lock = true;
    const a = game.first, b = el;
    game.first = null;
    setTimeout(() => {
      a.textContent = '?'; b.textContent = '?';
      a.classList.remove('open'); b.classList.remove('open');
      game.lock = false;
    }, 700);
  }
}

/* ---------- 学段详情页 ---------- */
function renderStagePage() {
  const wrap = $('stageWrap');
  if (!wrap) return;
  const id = new URLSearchParams(location.search).get('level') || 'kids';
  const meta = STAGES.find((s) => s.id === id) || STAGES[0];
  const d = LEVEL_DATA[meta.id];
  const L = LISTENING[meta.audio];

  $('levelHero').innerHTML = `
    <div class="icon">${meta.icon}</div>
    <h1>${meta.name} <span style="font-size:18px;color:#64748b">${meta.en}</span></h1>
    <p>${meta.desc}</p>`;

  const docsHtml = d.docs.map((doc) =>
    `<div class="doc"><h3>${doc.title}</h3><p>${doc.body}</p></div>`).join('');

  const vocabHtml = `
    <table class="vocab-table">
      <tr><th>单词</th><th>音标</th><th>词性</th><th>中文</th><th>例句</th></tr>
      ${d.vocab.map((v) => `<tr><td class="w">${v.w}</td><td>${v.ph}</td><td>${v.pos}</td><td>${v.zh}</td><td>${v.ex}</td></tr>`).join('')}
    </table>`;

  const listenHtml = `
    <div class="listen-box">
      <h3 style="margin-bottom:4px">${L.title}</h3>
      <p style="color:#64748b;font-size:14px">适用：${L.level} · 先盲听做题，再对照原文</p>
      <audio controls preload="none" src="${L.file}"></audio>
      <details class="transcript"><summary>查看听力原文</summary><p>${L.transcript.replace(/\n/g, '<br>')}</p></details>
      <div style="margin-top:18px">${L.questions.map((q, i) => quizBlock(q, 'l' + i)).join('')}</div>
    </div>`;

  const quizHtml = `
    <div class="quiz-box">
      <h3 style="margin-bottom:14px">词汇语法小测（${d.quiz.length} 题）</h3>
      ${d.quiz.map((q, i) => quizBlock(q, 'q' + i)).join('')}
      <div class="quiz-score"><button class="btn" onclick="scoreQuiz('${meta.id}')">交卷看分</button>
      <p id="quizScore" style="margin-top:10px;font-weight:700"></p></div>
    </div>`;

  wrap.innerHTML = `
    <div class="tabs">
      <button class="tab active" data-t="docs">📄 学习文档</button>
      <button class="tab" data-t="vocab">📖 核心词汇</button>
      <button class="tab" data-t="listen">🎧 听力练习</button>
      <button class="tab" data-t="quiz">✍️ 习题练习</button>
    </div>
    <div class="panel active" id="p-docs">${docsHtml}</div>
    <div class="panel" id="p-vocab">${vocabHtml}</div>
    <div class="panel" id="p-listen">${listenHtml}</div>
    <div class="panel" id="p-quiz">${quizHtml}</div>`;

  wrap.querySelectorAll('.tab').forEach((t) => {
    t.addEventListener('click', () => {
      wrap.querySelectorAll('.tab').forEach((x) => x.classList.remove('active'));
      wrap.querySelectorAll('.panel').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      $('p-' + t.dataset.t).classList.add('active');
    });
  });
  bindQuiz(wrap);
}

function quizBlock(q, key) {
  return `<div class="q" data-a="${q.a}" data-key="${key}">
    <div class="q-title">${q.q}</div>
    <div class="q-opts">${q.options.map((o, i) =>
      `<label><input type="radio" name="${key}" value="${i}"> ${o}</label>`).join('')}</div>
    <div class="q-feedback"></div>
  </div>`;
}
function bindQuiz(root) {
  root.querySelectorAll('.q').forEach((box) => {
    const fb = box.querySelector('.q-feedback');
    box.querySelectorAll('input').forEach((inp) => {
      inp.addEventListener('change', () => {
        const ok = +inp.value === +box.dataset.a;
        fb.className = 'q-feedback ' + (ok ? 'ok' : 'no');
        fb.textContent = ok ? '✅ 答对了！' : '❌ 再想想，正确答案是：' + box.querySelectorAll('label')[+box.dataset.a].textContent.trim();
      });
    });
  });
}
function scoreQuiz(levelId) {
  const d = LEVEL_DATA[levelId];
  let score = 0;
  document.querySelectorAll('#p-quiz .q').forEach((box) => {
    const sel = box.querySelector('input:checked');
    if (sel && +sel.value === +box.dataset.a) score++;
  });
  const el = $('quizScore');
  el.textContent = `得分：${score} / ${d.quiz.length}` + (score === d.quiz.length ? ' 🎉 满分！' : score >= 3 ? ' 👍 不错，继续加油！' : ' 💪 多看看词汇表再来一次吧！');
}

/* ---------- 杂志页 ---------- */
function renderMagazine() {
  const wrap = $('magWrap');
  if (!wrap) return;
  $('magCover').innerHTML = `<h1>📖 English Weekly</h1><div class="issue">${MAGAZINE.issue}</div>
    <p style="color:#64748b;margin-top:10px">每月一期：阅读 · 科普 · 文化，配生词表</p>`;
  wrap.innerHTML = MAGAZINE.articles.map((a) => `
    <article class="article">
      <div class="cat">${a.cat}</div>
      <h2>${a.title}</h2>
      <p class="body-en">${a.en}</p>
      <p class="body-zh">${a.zh}</p>
      <div class="wordlist"><b>生词表：</b>${a.words.map((w) => ` ${w[0]}（${w[1]}）`).join('；')}</div>
    </article>`).join('');
}

/* ---------- 杂志页：第 2 期 ---------- */
function renderMagazine2() {
  const wrap = $('magWrap2');
  if (!wrap) return;
  $('magCover2').innerHTML = `<h1>📖 English Weekly</h1><div class="issue">${MAGAZINE2.issue}</div>
    <p style="color:#64748b;margin-top:10px">每月一期：阅读 · 科普 · 文化，配生词表</p>`;
  wrap.innerHTML = MAGAZINE2.articles.map((a) => `
    <article class="article">
      <div class="cat">${a.cat}</div>
      <h2>${a.title}</h2>
      <p class="body-en">${a.en}</p>
      <p class="body-zh">${a.zh}</p>
    <div class="wordlist"><b>生词表：</b>${a.words.map((w) => ` ${w[0]}（${w[1]}）`).join('；')}</div>
    </article>`).join('');
}

/* ---------- 初始化 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderStages();
  renderStagePage();
  renderMagazine();
  renderMagazine2();
  if ($('dictInput')) {
    $('dictInput').addEventListener('input', dictSearch);
    $('dictBtn').addEventListener('click', dictSearch);
    dictSearch();
  }
  if ($('matchGrid')) {
    $('gameRestart').addEventListener('click', gameStart);
    gameStart();
  }
});
