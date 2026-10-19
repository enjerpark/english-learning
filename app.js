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
      <tr><th>单词</th><th>音标</th><th>词性</th><th>中文</th><th>例句</th><th>操作</th></tr>
      ${vocab.map((v) => `<tr><td class="w">${v.w}</td><td>${v.ph}</td><td>${v.pos}</td><td>${v.zh}</td><td>${v.ex}</td><td style="white-space:nowrap"><button class="icon-btn" data-say="${v.w}" title="朗读发音">🔊</button> <button class="icon-btn" data-add="${v.w}" title="加入生词本">➕</button></td></tr>`).join('')}
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
    <div class="panel" id="p-listen">${listenHtml}
      <div class="listen-box">
        <h3 style="margin-bottom:6px">✍️ 听音写词</h3>
        <p style="color:#64748b;font-size:14px;margin-bottom:12px">听发音写出单词拼写，共 10 词，取自本学段词汇。</p>
        <div id="dictationBox"><button class="btn" id="dcStart">开始听写</button></div>
      </div>
    </div>
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

  // 词汇表：发音 / 加入生词本（事件委托）
  const vt = wrap.querySelector('.vocab-table');
  if (vt) vt.addEventListener('click', (e) => {
    const say = e.target.dataset && e.target.dataset.say;
    const add = e.target.dataset && e.target.dataset.add;
    if (say) speak(say);
    if (add) addWord(add);
  });
  // 听写
  const dcStart = $('dcStart');
  if (dcStart) dcStart.addEventListener('click', () => startDictation(meta.id));
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
      bumpStats(ok);
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
  initHomeFeatures();
  if ($('dictInput')) {
    $('dictInput').addEventListener('input', dictSearch);
    $('dictBtn').addEventListener('click', dictSearch);
    dictSearch();
  }
});

/* ============ 大网站功能包：发音 / 生词本 / 每日一句 / 打卡 / 听写 / 数据 ============ */

/* ---------- 发音（系统语音，无需下载） ---------- */
function speak(text, slow) {
  try {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = slow ? 0.72 : 0.95;
    speechSynthesis.speak(u);
  } catch (e) {}
}

/* ---------- 轻提示 ---------- */
function toast(msg) {
  let t = $('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = 'show';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = ''; }, 1800);
}

/* ---------- 每日一句 ---------- */
function renderDaily() {
  const en = $('dailyEn');
  if (!en || typeof DAILY_SENTENCES === 'undefined') return;
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
  const s = DAILY_SENTENCES[dayOfYear % DAILY_SENTENCES.length];
  en.textContent = s.en;
  $('dailyZh').textContent = s.zh;
  $('dailySpeak').addEventListener('click', () => speak(s.en, true));
}

/* ---------- 生词本 ---------- */
function getWordbook() {
  try { return JSON.parse(localStorage.getItem('eh_wordbook') || '[]'); } catch (e) { return []; }
}
function setWordbook(arr) {
  try { localStorage.setItem('eh_wordbook', JSON.stringify(arr)); } catch (e) {}
}
function addWord(w) {
  const v = allWords().find((x) => x.w === w);
  if (!v) return;
  const wb = getWordbook();
  if (wb.some((x) => x.w === w)) { toast('已在生词本中'); return; }
  wb.push({ w: v.w, ph: v.ph, pos: v.pos, zh: v.zh });
  setWordbook(wb);
  renderWordbook();
  toast(`已收藏：${w}`);
}
function renderWordbook() {
  const list = $('wbList');
  if (!list) return;
  $('wbMain').style.display = '';
  $('wbReview').style.display = 'none';
  const wb = getWordbook();
  if (!wb.length) {
    list.innerHTML = '<p class="dict-hint">生词本还是空的，去各学段词汇表点 ➕ 收藏单词吧。</p>';
  } else {
    list.innerHTML = `<table class="vocab-table"><tr><th>单词</th><th>音标</th><th>中文</th><th>操作</th></tr>` +
      wb.map((v, i) => `<tr><td class="w">${v.w}</td><td>${v.ph}</td><td>${v.zh}</td>` +
        `<td style="white-space:nowrap"><button class="icon-btn" data-wbsay="${i}" title="发音">🔊</button> ` +
        `<button class="icon-btn" data-wbdel="${i}" title="删除">🗑️</button></td></tr>`).join('') + `</table>`;
  }
  renderDashboard();
}
let FC = null;
function startReview() {
  const wb = getWordbook();
  if (!wb.length) { toast('生词本是空的，先去收藏单词吧'); return; }
  FC = { words: [...wb].sort(() => Math.random() - 0.5), i: 0 };
  $('wbMain').style.display = 'none';
  $('wbReview').style.display = '';
  renderCard();
}
function renderCard() {
  const { words, i } = FC;
  if (i >= words.length) {
    $('fcWord').textContent = '🎉 复习完成！';
    $('fcZh').textContent = '明天再来一组吧';
    $('fcZh').style.visibility = 'visible';
    $('fcProg').textContent = '';
    return;
  }
  const w = words[i];
  $('fcWord').textContent = w.w;
  $('fcZh').textContent = `${w.ph} ${w.zh}`;
  $('fcZh').style.visibility = 'hidden';
  $('fcProg').textContent = `${i + 1} / ${words.length}`;
  speak(w.w);
}

/* ---------- 学习打卡 ---------- */
function todayStr(d) {
  d = d || new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function getCheckins() {
  try { return JSON.parse(localStorage.getItem('eh_checkin') || '[]'); } catch (e) { return []; }
}
function calcStreak() {
  const set = new Set(getCheckins());
  const d = new Date();
  if (!set.has(todayStr(d))) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (set.has(todayStr(d))) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}
function renderCheckin() {
  const cal = $('checkinCal');
  if (!cal) return;
  const set = new Set(getCheckins());
  const now = new Date(), y = now.getFullYear(), m = now.getMonth();
  const firstDow = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  let html = `<div class="cal-title">${y} 年 ${m + 1} 月</div><div class="cal-grid">`;
  ['日', '一', '二', '三', '四', '五', '六'].forEach((d) => { html += `<span class="cal-dow">${d}</span>`; });
  for (let i = 0; i < firstDow; i++) html += '<span></span>';
  for (let d = 1; d <= days; d++) {
    const ds = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const cls = set.has(ds) ? 'cal-day done' : (ds === todayStr() ? 'cal-day today' : 'cal-day');
    html += `<span class="${cls}">${d}</span>`;
  }
  cal.innerHTML = html + '</div>';
  const btn = $('checkinBtn');
  const done = set.has(todayStr());
  btn.textContent = done ? '✅ 今日已打卡' : '今日打卡';
  btn.disabled = done;
}

/* ---------- 数据看板 ---------- */
function getStats() {
  try { return JSON.parse(localStorage.getItem('eh_stats') || '{"a":0,"c":0}'); } catch (e) { return { a: 0, c: 0 }; }
}
function bumpStats(ok) {
  try {
    const s = getStats();
    s.a++; if (ok) s.c++;
    localStorage.setItem('eh_stats', JSON.stringify(s));
  } catch (e) {}
  renderDashboard();
}
function renderDashboard() {
  if (!$('stAnswered')) return;
  const s = getStats();
  $('stAnswered').textContent = s.a;
  $('stAcc').textContent = s.a ? Math.round((s.c / s.a) * 100) + '%' : '–';
  $('stStreak').textContent = calcStreak();
  $('stWords').textContent = getWordbook().length;
  let m = 0;
  try { m = JSON.parse(localStorage.getItem('eh_mistakes') || '[]').length; } catch (e) {}
  $('stMistakes').textContent = m;
}

/* ---------- 听音写词（听写） ---------- */
let DC = null;
function startDictation(stageId) {
  const vocab = LEVEL_DATA[stageId].vocab.concat((typeof VOCAB_EXTRA !== 'undefined' && VOCAB_EXTRA[stageId]) || []);
  const words = [...vocab].sort(() => Math.random() - 0.5).slice(0, 10);
  DC = { words, i: 0, score: 0, stageId };
  renderDictation();
}
function renderDictation() {
  const box = $('dictationBox');
  if (!box || !DC) return;
  const { words, i, score } = DC;
  if (i >= words.length) {
    box.innerHTML = `<p style="font-weight:700">完成！得分 ${score} / ${words.length} ${score === words.length ? '🎉 满分！' : score >= 7 ? '👍 很棒！' : '💪 多听几遍再来！'}</p>
      <button class="btn" id="dcAgain" style="margin-top:10px">再来一次</button>`;
    $('dcAgain').addEventListener('click', () => startDictation(DC.stageId));
    return;
  }
  const w = words[i];
  box.innerHTML = `
    <p style="margin-bottom:10px">第 ${i + 1} / ${words.length} 词
      <button class="btn btn-ghost btn-small" id="dcSpeak" style="margin:0 0 0 8px">🔊 重播</button></p>
    <div class="q-fill"><input id="dcInput" placeholder="输入听到的单词" autocomplete="off">
      <button class="btn btn-small" id="dcCheck">确认</button></div>
    <div class="q-feedback" id="dcFb"></div>`;
  speak(w.w);
  $('dcSpeak').addEventListener('click', () => speak(w.w));
  const check = () => {
    const v = $('dcInput').value.trim().toLowerCase();
    if (!v) return;
    const ok = v === w.w.toLowerCase();
    const fb = $('dcFb');
    fb.className = 'q-feedback ' + (ok ? 'ok' : 'no');
    fb.textContent = ok ? '✅ 正确！' : `❌ 正确答案：${w.w}（${w.zh}）`;
    if (ok) DC.score++;
    else { try { saveMistake(DC.stageId + '-听写', { q: `听写：${w.zh} 的英文是？` }, w.w); } catch (e) {} }
    setTimeout(() => { DC.i++; renderDictation(); }, ok ? 900 : 1800);
  };
  $('dcCheck').addEventListener('click', check);
  $('dcInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
  setTimeout(() => { const inp = $('dcInput'); if (inp) inp.focus(); }, 60);
}

/* ---------- 首页功能初始化 ---------- */
function initHomeFeatures() {
  renderDaily();
  renderCheckin();
  renderWordbook();
  renderDashboard();

  const cb = $('checkinBtn');
  if (cb) cb.addEventListener('click', () => {
    const arr = getCheckins(), t = todayStr();
    if (!arr.includes(t)) {
      arr.push(t);
      try { localStorage.setItem('eh_checkin', JSON.stringify(arr)); } catch (e) {}
    }
    renderCheckin(); renderDashboard();
    toast('打卡成功！继续保持 🎉');
  });

  const wl = $('wbList');
  if (wl) wl.addEventListener('click', (e) => {
    const say = e.target.dataset && e.target.dataset.wbsay;
    const del = e.target.dataset && e.target.dataset.wbdel;
    const wb = getWordbook();
    if (say !== undefined && wb[+say]) speak(wb[+say].w);
    if (del !== undefined && wb[+del]) {
      wb.splice(+del, 1); setWordbook(wb); renderWordbook(); toast('已删除');
    }
  });
  if ($('wbReviewBtn')) $('wbReviewBtn').addEventListener('click', startReview);
  if ($('wbClearBtn')) $('wbClearBtn').addEventListener('click', () => {
    setWordbook([]); renderWordbook(); toast('生词本已清空');
  });
  if ($('fcShow')) $('fcShow').addEventListener('click', () => { $('fcZh').style.visibility = 'visible'; });
  if ($('fcKnow')) $('fcKnow').addEventListener('click', () => { FC.i++; renderCard(); });
  if ($('fcExit')) $('fcExit').addEventListener('click', () => { renderWordbook(); });
  if ($('fcSpeak')) $('fcSpeak').addEventListener('click', () => { if (FC && FC.words[FC.i]) speak(FC.words[FC.i].w); });
}
