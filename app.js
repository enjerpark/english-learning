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

  const vocab = d.vocab.concat((typeof VOCAB_EXTRA !== 'undefined' && VOCAB_EXTRA[meta.id]) || []);
  const vocabHtml = `
    <table class="vocab-table">
      <tr><th>单词</th><th>音标</th><th>词性</th><th>中文</th><th>例句</th></tr>
      ${vocab.map((v) => `<tr><td class="w">${v.w}</td><td>${v.ph}</td><td>${v.pos}</td><td>${v.zh}</td><td>${v.ex}</td></tr>`).join('')}
    </table>`;

  const lq = L.questions.concat((typeof LISTEN_EXTRA !== 'undefined' && LISTEN_EXTRA[meta.audio]) || []);
  lq.forEach((q, i) => { QUIZ_REG['l' + i] = q; });
  const listenHtml = `
    <div class="listen-box">
      <h3 style="margin-bottom:4px">${L.title}</h3>
      <p style="color:#64748b;font-size:14px">适用：${L.level} · 先盲听做题，再对照原文</p>
      <audio controls preload="none" src="${L.file}"></audio>
      <details class="transcript"><summary>查看听力原文</summary><p>${L.transcript.replace(/\n/g, '<br>')}</p></details>
      <div style="margin-top:18px">${lq.map((q, i) => quizBlock(q, 'l' + i)).join('')}</div>
    </div>`;

  const quiz = d.quiz.concat((typeof QUIZ_EXTRA !== 'undefined' && QUIZ_EXTRA[meta.id]) || []);
  quiz.forEach((q, i) => { QUIZ_REG['q' + i] = q; });
  const quizHtml = `
    <div class="quiz-box">
      <h3 style="margin-bottom:6px">词汇语法综合练习（${quiz.length} 题）</h3>
      <p style="color:#64748b;font-size:13px;margin-bottom:14px">含选择题、判断题、填空题 · 答错自动记入错题本</p>
      ${quiz.map((q, i) => quizBlock(q, 'q' + i)).join('')}
      <div class="quiz-score"><button class="btn" onclick="scoreQuiz()">交卷看分</button>
      <p id="quizScore" style="margin-top:10px;font-weight:700"></p></div>
    </div>
    <div class="quiz-box" id="mistakeBox"></div>`;

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
  bindQuiz(wrap, meta.id);
  renderMistakes($('mistakeBox'), meta.id);
}

/* ---------- 习题：选择 / 判断 / 填空 + 错题本 ---------- */
const QUIZ_REG = {};
function quizBlock(q, key) {
  const type = q.t || 'c';
  let body = '';
  if (type === 'tf') {
    body = `<div><button class="btn btn-ghost tf-btn" data-v="1">对 ✓</button><button class="btn btn-ghost tf-btn" data-v="0">错 ✗</button></div>`;
  } else if (type === 'f') {
    body = `<div class="q-fill"><input type="text" placeholder="输入答案后点检查" autocomplete="off"><button class="btn btn-small">检查</button></div>`;
  } else {
    body = `<div class="q-opts">${q.options.map((o, i) =>
      `<label><input type="radio" name="${key}" value="${i}"> ${o}</label>`).join('')}</div>`;
  }
  const tag = type === 'tf' ? '判断' : type === 'f' ? '填空' : '选择';
  return `<div class="q" data-key="${key}">
    <div class="q-title"><span class="q-tag">${tag}</span>${q.q}</div>${body}
    <div class="q-feedback"></div>
  </div>`;
}
function bindQuiz(root, stageId) {
  root.querySelectorAll('.q').forEach((box) => {
    const q = QUIZ_REG[box.dataset.key];
    if (!q) return;
    const fb = box.querySelector('.q-feedback');
    const mark = (ok, correctText) => {
      box.dataset.ok = ok ? '1' : '0';
      fb.className = 'q-feedback ' + (ok ? 'ok' : 'no');
      fb.textContent = ok ? '✅ 答对了！' : '❌ 答错了，正确答案：' + correctText;
      if (!ok) {
        saveMistake(stageId, q, correctText);
        const mb = $('mistakeBox');
        if (mb) renderMistakes(mb, stageId);
      }
    };
    if (q.t === 'tf') {
      box.querySelectorAll('.tf-btn').forEach((btn) =>
        btn.addEventListener('click', () => mark((btn.dataset.v === '1') === !!q.a, q.a ? '对' : '错')));
    } else if (q.t === 'f') {
      const inp = box.querySelector('input'), btn = box.querySelector('button');
      btn.addEventListener('click', () => {
        const v = inp.value.trim().toLowerCase();
        mark((q.a || []).some((a) => String(a).toLowerCase() === v), (q.a || []).join(' / '));
      });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
    } else {
      box.querySelectorAll('input').forEach((inp) =>
        inp.addEventListener('change', () => mark(+inp.value === +q.a, q.options[q.a])));
    }
  });
}
function scoreQuiz() {
  const boxes = document.querySelectorAll('#p-quiz .q');
  let done = 0, score = 0;
  boxes.forEach((b) => {
    if (b.dataset.ok === '1' || b.dataset.ok === '0') { done++; if (b.dataset.ok === '1') score++; }
  });
  const el = $('quizScore');
  const total = boxes.length;
  el.textContent = done < total
    ? `已作答 ${done} / ${total} 题，得分 ${score} 分（还有 ${total - done} 题没做）`
    : `得分：${score} / ${total}` + (score === total ? ' 🎉 满分！' : score / total >= 0.6 ? ' 👍 不错，继续加油！' : ' 💪 错题已记入错题本，复习后再来！');
}
/* ---------- 错题本（localStorage） ---------- */
function saveMistake(stageId, q, correctText) {
  try {
    const k = 'eh_mistakes';
    const arr = JSON.parse(localStorage.getItem(k) || '[]');
    if (!arr.some((m) => m.stage === stageId && m.q === q.q)) {
      arr.push({ stage: stageId, q: q.q, c: correctText });
      localStorage.setItem(k, JSON.stringify(arr.slice(-200)));
    }
  } catch (e) {}
}
function renderMistakes(box, stageId) {
  if (!box) return;
  let arr = [];
  try { arr = JSON.parse(localStorage.getItem('eh_mistakes') || '[]').filter((m) => m.stage === stageId); } catch (e) {}
  box.innerHTML = `<h3 style="margin-bottom:10px">📝 我的错题本（${arr.length}）</h3>` +
    (arr.length
      ? arr.map((m) => `<div class="dict-item"><div>${m.q}</div><div style="color:#16a34a;font-size:14px">正确答案：${m.c}</div></div>`).join('') +
        '<button class="btn btn-ghost btn-small" id="clearMistakes" style="margin-top:12px">清空错题本</button>'
      : '<p class="dict-hint">还没有错题，答错的题目会自动收录到这里，方便集中复习。</p>');
  const c = $('clearMistakes');
  if (c) c.addEventListener('click', () => {
    try {
      const all = JSON.parse(localStorage.getItem('eh_mistakes') || '[]').filter((m) => m.stage !== stageId);
      localStorage.setItem('eh_mistakes', JSON.stringify(all));
    } catch (e) {}
    renderMistakes(box, stageId);
  });
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
});
