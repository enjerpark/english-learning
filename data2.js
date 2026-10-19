
/* ============ 扩充包：更多习题 / 更多词汇 / 更多听力题 ============ */

const QUIZ_EXTRA = {

kids: [
  { q: '“小鸟”用英语怎么说？', options: ['fish', 'bird', 'dog', 'cat'], a: 1 },
  { q: 'I ___ two eyes.（我有两只眼睛）', options: ['has', 'have', 'am', 'is'], a: 1 },
  { q: 'The dog is ___.（这只狗很大）', options: ['small', 'big', 'red', 'happy'], a: 1 },
  { q: '“香蕉”用英语怎么说？', options: ['banana', 'orange', 'pear', 'grape'], a: 0 },
  { q: '___ your nose!（摸摸你的鼻子）', options: ['Touch', 'Look', 'Run', 'Drink'], a: 0 },
  { q: 'I love my ___.（我爱我的妈妈）', options: ['dad', 'mom', 'dog', 'cat'], a: 1 },
  { t: 'tf', q: '"Fish" 的意思是"小鸟"。', a: false },
  { t: 'tf', q: '"Good morning" 是"早上好"的意思。', a: true },
  { t: 'f', q: 'c___ （猫）', a: ['cat'] },
  { t: 'f', q: 'r___n （跑）', a: ['run'] },
],

primary: [
  { q: '___ are my friends.（他们是我的朋友）', options: ['He', 'She', 'They', 'It'], a: 2 },
  { q: 'My father ___ in a school.（我爸爸在学校工作）', options: ['work', 'works', 'working', 'worked'], a: 1 },
  { q: '“医生”用英语怎么说？', options: ['teacher', 'doctor', 'farmer', 'driver'], a: 1 },
  { q: 'There ___ some water in the cup.（杯子里有些水）', options: ['is', 'are', 'be', 'am'], a: 0 },
  { q: 'She enjoys ___ books.（她喜欢读书）', options: ['read', 'reads', 'reading', 'readed'], a: 2 },
  { t: 'tf', q: '"There is" 后面跟单数名词。', a: true },
  { t: 'tf', q: '"He go to school." 这句话是对的。', a: false },
  { t: 'f', q: 'I ___ （like） apples.', a: ['like'] },
  { t: 'f', q: '___ （什么） is your name?', a: ['what'] },
  { t: 'f', q: 'This is ___ （一个） orange.', a: ['an'] },
],

junior: [
  { q: 'I have two ___.（我有两支钢笔）', options: ['pen', 'pens', 'penes', "pens'"], a: 1 },
  { q: '___ will you stay there? For a week.（你要待多久？一周）', options: ['How long', 'How soon', 'How often', 'How far'], a: 0 },
  { q: 'The story is ___. I want to read it again.（故事很有趣，我想再读一遍）', options: ['boring', 'bored', 'interesting', 'interested'], a: 2 },
  { q: 'He ___ his homework before dinner yesterday.（他昨天晚饭前做完了作业）', options: ['finish', 'finishes', 'finished', 'finishing'], a: 2 },
  { q: '___ is important to learn English well.（学好英语很重要）', options: ['This', 'That', 'It', 'He'], a: 2 },
  { t: 'tf', q: '"much" 修饰可数名词。', a: false },
  { t: 'tf', q: '一般过去时的标志词有 yesterday、last week。', a: true },
  { t: 'f', q: 'She ___ （be） a teacher.', a: ['is'] },
  { t: 'f', q: 'They ___ （have） a big house.', a: ['have'] },
  { t: 'f', q: 'I ___ （not like） coffee.', a: ['do not like', "don't like"] },
],

senior: [
  { q: '___ you work hard, you will succeed.（只要你努力，就会成功）', options: ['If', 'Unless', 'Though', 'Before'], a: 0 },
  { q: 'The teacher told us ___ in class.（老师让我们上课别说话）', options: ['not talk', 'not to talk', "don't talk", 'to not talk'], a: 1 },
  { q: 'By the end of last year, he ___ over 100 books.（到去年年底，他已读过 100 多本书）', options: ['has read', 'had read', 'reads', 'will read'], a: 1 },
  { q: '___ is known to all, China is a great country.（众所周知，中国是个伟大的国家）', options: ['That', 'What', 'As', 'It'], a: 2 },
  { q: 'She devoted herself ___ teaching.（她投身于教育事业）', options: ['to', 'in', 'for', 'on'], a: 0 },
  { t: 'tf', q: '"despite" 后面可以直接跟一个完整的句子。', a: false },
  { t: 'tf', q: '正式用法中，"If I were you" 的 were 一般不换成 was。', a: true },
  { t: 'f', q: 'He is used to ___ （get） up early.', a: ['getting'] },
  { t: 'f', q: 'The book ___ （write） by Lu Xun.', a: ['was written'] },
  { t: 'f', q: 'Not only he but also I ___ （be） invited.', a: ['was'] },
],
};

Object.assign(QUIZ_EXTRA, {

college: [
  { q: 'His success ___ his hard work.（他的成功源于努力）', options: ['results from', 'results in', 'leads from', 'causes in'], a: 0 },
  { q: '___ the rain, the game continued.（尽管下雨，比赛继续）', options: ['Despite', 'Although', 'Because', 'Since'], a: 0 },
  { q: 'The committee ___ of five members.（委员会由五名成员组成）', options: ['consists', 'is consisted', 'composes', 'makes'], a: 0 },
  { q: 'I would rather ___ at home.（我宁愿待在家里）', options: ['stay', 'to stay', 'staying', 'stayed'], a: 0 },
  { q: 'Hardly ___ when it started to rain.（我们刚到就下雨了）', options: ['had we arrived', 'we had arrived', 'did we arrive', 'we arrived'], a: 0 },
  { t: 'tf', q: '"consist of" 没有被动语态。', a: true },
  { t: 'tf', q: '"would rather" 后面跟 to do。', a: false },
  { t: 'f', q: 'She takes ___ her mother.（她像她妈妈）', a: ['after'] },
  { t: 'f', q: 'We look forward to ___ （hear） from you.', a: ['hearing'] },
  { t: 'f', q: 'The problem is difficult ___ （solve）.', a: ['to solve'] },
],

cet46: [
  { q: 'The new law will ___ into effect next month.（新法律下月生效）', options: ['come', 'go', 'take', 'put'], a: 0 },
  { q: 'He was accused ___ stealing.（他被指控偷窃）', options: ['of', 'with', 'for', 'by'], a: 0 },
  { q: '___ careful you are, mistakes happen.（无论多仔细都会出错）', options: ['However', 'No matter how', 'Whatever', 'Although'], a: 1 },
  { q: 'The data ___ by the team last week.（数据上周被团队分析了）', options: ['was analyzed', 'analyzed', 'has analyzed', 'analyzes'], a: 0 },
  { q: 'She is capable ___ solving the problem.（她有能力解决问题）', options: ['of', 'to', 'for', 'in'], a: 0 },
  { t: 'tf', q: '"be accused of" 意为"被指控做某事"。', a: true },
  { t: 'tf', q: '"no matter how" 后面可以直接跟形容词。', a: true },
  { t: 'f', q: 'He succeeded ___ （pass） the exam.', a: ['in passing'] },
  { t: 'f', q: '___ （compare） with you, I am lazy.', a: ['compared'] },
  { t: 'f', q: 'It is no use ___ （cry）.', a: ['crying'] },
],

ielts: [
  { q: 'The graph ___ a sharp increase in sales.（图表显示销量激增）', options: ['shows', 'tells', 'says', 'talks'], a: 0 },
  { q: '___ the fact that he was tired, he kept working.（尽管很累，他继续工作）', options: ['Despite', 'Although', 'Because', 'Since'], a: 0 },
  { q: 'Children should be encouraged to think ___.（应鼓励孩子独立思考）', options: ['independent', 'independently', 'independence', 'independ'], a: 1 },
  { q: 'The number of students ___ rising.（学生人数在上升）', options: ['is', 'are', 'be', 'been'], a: 0 },
  { q: 'By 2030, the population ___ 8 billion.（到 2030 年人口将达 80 亿）', options: ['will reach', 'reaches', 'has reached', 'reached'], a: 0 },
  { t: 'tf', q: '雅思小作文中，"the number of" 后谓语用单数。', a: true },
  { t: 'tf', q: '"a number of" 后谓语用单数。', a: false },
  { t: 'f', q: 'There has been a dramatic rise ___ the price.（填介词）', a: ['in'] },
  { t: 'f', q: 'The chart compares the ___ （consume） of energy.', a: ['consumption'] },
  { t: 'f', q: '___ ， the two cities differ greatly.（然而）', a: ['however'] },
],

toefl: [
  { q: 'The results ___ the hypothesis.（结果支持了这一假设）', options: ['support', 'supports', 'supporting', 'supported'], a: 0 },
  { q: 'Photosynthesis ___ in plants.（光合作用发生在植物体内）', options: ['occurs', 'occur', 'occurring', 'occurred'], a: 0 },
  { q: 'The glacier is melting ___ an alarming rate.（冰川正以惊人的速度融化）', options: ['at', 'with', 'by', 'on'], a: 0 },
  { q: 'The theory was first ___ in the 19th century.（该理论 19 世纪首次被提出）', options: ['proposed', 'proposing', 'propose', 'to propose'], a: 0 },
  { q: 'Birds migrate ___ warmer regions.（鸟类迁往更暖的地区）', options: ['to', 'for', 'at', 'in'], a: 0 },
  { t: 'tf', q: '托福听力中，说话人重读或重复的内容常常是考点。', a: true },
  { t: 'tf', q: '"a variety of" 后面跟单数名词。', a: false },
  { t: 'f', q: 'The ___ （survive） rate is very low.', a: ['survival'] },
  { t: 'f', q: 'This species is ___ to this island.（特有的）', a: ['unique'] },
  { t: 'f', q: 'The volcano had been ___ （dormant） for centuries.', a: ['dormant'] },
],
});

/* ---------- 听力理解扩充：每段 +2 题 ---------- */
const LISTEN_EXTRA = {
  kids: [
    { q: '小狗怎么叫？', options: ['meow', 'woof', 'quack', 'moo'], a: 1 },
    { q: 'Sunny 有什么？', options: ['a book and a pen', 'a cat and a dog', 'an apple and milk', 'a bike'], a: 0 },
  ],
  teens: [
    { q: 'Tom 的篮球队下个月有什么安排？', options: ['a trip', 'a game', 'a party', 'an exam'], a: 1 },
    { q: 'Lily 和 Tom 晚饭后要一起做什么？', options: ['watch TV', 'play games', 'study together', 'go shopping'], a: 2 },
  ],
  cet: [
    { q: '这个团队来自几个国家？', options: ['one', 'two', 'three', 'four'], a: 2 },
    { q: '专家建议大家怎么做？', options: ['buy more plastic', 'use fewer plastic bags and bottles', 'stop drinking water', 'build more boats'], a: 1 },
  ],
  ielts: [
    { q: '实验中两组学生学的是什么？', options: ['math', 'the same words', 'history', 'piano'], a: 1 },
    { q: '学生应该怎么做？', options: ['keep a regular sleep schedule', 'study all night', 'drink more coffee', 'skip breakfast'], a: 0 },
  ],
};

/* ---------- 词汇扩充 ---------- */
const VOCAB_EXTRA = {
kids: [
  { w: 'banana', ph: '/bəˈnɑːnə/', pos: 'n.', zh: '香蕉', ex: 'I like bananas.' },
  { w: 'juice', ph: '/dʒuːs/', pos: 'n.', zh: '果汁', ex: 'Drink some juice.' },
  { w: 'cake', ph: '/keɪk/', pos: 'n.', zh: '蛋糕', ex: 'A birthday cake.' },
  { w: 'sad', ph: '/sæd/', pos: 'adj.', zh: '难过的', ex: "Don't be sad." },
  { w: 'hand', ph: '/hænd/', pos: 'n.', zh: '手', ex: 'Clap your hands.' },
],
primary: [
  { w: 'window', ph: '/ˈwɪndəʊ/', pos: 'n.', zh: '窗户', ex: 'Open the window.' },
  { w: 'door', ph: '/dɔːr/', pos: 'n.', zh: '门', ex: 'Close the door.' },
  { w: 'chair', ph: '/tʃer/', pos: 'n.', zh: '椅子', ex: 'Sit on the chair.' },
  { w: 'desk', ph: '/desk/', pos: 'n.', zh: '书桌', ex: 'My desk is clean.' },
  { w: 'bag', ph: '/bæɡ/', pos: 'n.', zh: '书包', ex: 'My bag is heavy.' },
  { w: 'lunch', ph: '/lʌntʃ/', pos: 'n.', zh: '午餐', ex: "What's for lunch?" },
  { w: 'dinner', ph: '/ˈdɪnər/', pos: 'n.', zh: '晚餐', ex: 'Dinner is ready.' },
  { w: 'breakfast', ph: '/ˈbrekfəst/', pos: 'n.', zh: '早餐', ex: 'I eat breakfast at 7.' },
],
junior: [
  { w: 'absent', ph: '/ˈæbsənt/', pos: 'adj.', zh: '缺席的', ex: 'He was absent yesterday.' },
  { w: 'active', ph: '/ˈæktɪv/', pos: 'adj.', zh: '活跃的', ex: 'An active student.' },
  { w: 'admire', ph: '/ədˈmaɪər/', pos: 'v.', zh: '钦佩', ex: 'I admire my teacher.' },
  { w: 'annual', ph: '/ˈænjuəl/', pos: 'adj.', zh: '每年的', ex: 'Our annual meeting.' },
  { w: 'anxious', ph: '/ˈæŋkʃəs/', pos: 'adj.', zh: '焦虑的', ex: "Don't be anxious." },
  { w: 'bargain', ph: '/ˈbɑːrɡɪn/', pos: 'n.', zh: '便宜货', ex: 'A real bargain.' },
  { w: 'cancel', ph: '/ˈkænsl/', pos: 'v.', zh: '取消', ex: 'The game was cancelled.' },
],
senior: [
  { w: 'assemble', ph: '/əˈsembl/', pos: 'v.', zh: '集合；组装', ex: 'Assemble in the hall.' },
  { w: 'blunt', ph: '/blʌnt/', pos: 'adj.', zh: '直率的', ex: 'A blunt answer.' },
  { w: 'cherish', ph: '/ˈtʃerɪʃ/', pos: 'v.', zh: '珍爱', ex: 'Cherish your time.' },
  { w: 'dazzle', ph: '/ˈdæzl/', pos: 'v.', zh: '使目眩', ex: 'Dazzled by the lights.' },
  { w: 'embark', ph: '/ɪmˈbɑːrk/', pos: 'v.', zh: '着手', ex: 'Embark on a journey.' },
  { w: 'fathom', ph: '/ˈfæðəm/', pos: 'v.', zh: '理解', ex: "I can't fathom it." },
  { w: 'glitter', ph: '/ˈɡlɪtər/', pos: 'v.', zh: '闪耀', ex: 'Stars glitter at night.' },
],
college: [
  { w: 'bestow', ph: '/bɪˈstəʊ/', pos: 'v.', zh: '授予', ex: 'Bestow a prize on her.' },
  { w: 'debut', ph: '/ˈdeɪbjuː/', pos: 'n.', zh: '初次登场', ex: 'Her debut film.' },
  { w: 'elude', ph: '/ɪˈluːd/', pos: 'v.', zh: '逃避', ex: 'Elude the question.' },
  { w: 'fret', ph: '/fret/', pos: 'v.', zh: '烦恼', ex: "Don't fret about it." },
  { w: 'gist', ph: '/dʒɪst/', pos: 'n.', zh: '要点', ex: 'Get the gist of it.' },
  { w: 'hone', ph: '/həʊn/', pos: 'v.', zh: '磨炼', ex: 'Hone your skills.' },
  { w: 'lull', ph: '/lʌl/', pos: 'v./n.', zh: '使平静；间歇', ex: 'A lull in the rain.' },
],
cet46: [
  { w: 'abate', ph: '/əˈbeɪt/', pos: 'v.', zh: '减弱', ex: 'The storm abated.' },
  { w: 'bolster', ph: '/ˈbəʊlstər/', pos: 'v.', zh: '支持；加强', ex: 'Bolster the economy.' },
  { w: 'curtail', ph: '/kɜːrˈteɪl/', pos: 'v.', zh: '削减', ex: 'Curtail spending.' },
  { w: 'deplete', ph: '/dɪˈpliːt/', pos: 'v.', zh: '耗尽', ex: 'Deplete resources.' },
  { w: 'engulf', ph: '/ɪnˈɡʌlf/', pos: 'v.', zh: '吞没', ex: 'Engulfed in flames.' },
  { w: 'flout', ph: '/flaʊt/', pos: 'v.', zh: '藐视', ex: 'Flout the rules.' },
  { w: 'grapple', ph: '/ˈɡræpl/', pos: 'v.', zh: '搏斗；努力应对', ex: 'Grapple with problems.' },
  { w: 'herald', ph: '/ˈherəld/', pos: 'v.', zh: '预示', ex: 'Herald a new era.' },
],
ielts: [
  { w: 'accolade', ph: '/ˈækəleɪd/', pos: 'n.', zh: '赞誉', ex: 'Win international accolades.' },
  { w: 'corroborate', ph: '/kəˈrɑːbəreɪt/', pos: 'v.', zh: '证实', ex: 'Corroborate the theory.' },
  { w: 'debunk', ph: '/diːˈbʌŋk/', pos: 'v.', zh: '揭穿', ex: 'Debunk the myth.' },
  { w: 'engender', ph: '/ɪnˈdʒendər/', pos: 'v.', zh: '引起', ex: 'Engender heated debate.' },
  { w: 'inimical', ph: '/ɪˈnɪmɪkl/', pos: 'adj.', zh: '有害的', ex: 'Inimical to health.' },
  { w: 'lacuna', ph: '/ləˈkjuːnə/', pos: 'n.', zh: '空白；缺口', ex: 'A lacuna in the research.' },
  { w: 'nuance', ph: '/ˈnjuːɑːns/', pos: 'n.', zh: '细微差别', ex: 'Cultural nuances.' },
],
toefl: [
  { w: 'burgeon', ph: '/ˈbɜːrdʒən/', pos: 'v.', zh: '迅速成长', ex: 'Burgeoning cities.' },
  { w: 'crepuscular', ph: '/krɪˈpʌskjələr/', pos: 'adj.', zh: '黄昏活动的', ex: 'Crepuscular animals.' },
  { w: 'detritus', ph: '/dɪˈtraɪtəs/', pos: 'n.', zh: '碎屑', ex: 'Leaf detritus on the ground.' },
  { w: 'edifice', ph: '/ˈedɪfɪs/', pos: 'n.', zh: '大厦；建筑', ex: 'Ancient edifices.' },
  { w: 'frond', ph: '/frɑːnd/', pos: 'n.', zh: '蕨叶；棕榈叶', ex: 'Palm fronds.' },
  { w: 'littoral', ph: '/ˈlɪtərəl/', pos: 'adj.', zh: '海滨的', ex: 'The littoral zone.' },
  { w: 'pelagic', ph: '/pəˈlædʒɪk/', pos: 'adj.', zh: '远洋的', ex: 'Pelagic fish.' },
],
};

/* ---------- 每日一句（按一年中的天数轮换） ---------- */
const DAILY_SENTENCES = [
  { en: 'A journey of a thousand miles begins with a single step.', zh: '千里之行，始于足下。' },
  { en: 'Practice makes perfect.', zh: '熟能生巧。' },
  { en: 'Don’t be afraid to make mistakes; they are proof that you are trying.', zh: '不要害怕犯错，它们是你努力过的证明。' },
  { en: 'The best time to start was yesterday. The second best time is now.', zh: '种一棵树最好的时间是十年前，其次是现在。' },
  { en: 'Every day is a new chance to improve your English.', zh: '每一天都是提升英语的新机会。' },
  { en: 'Read a little English every day, and you will go far.', zh: '每天读一点英语，你会走得很远。' },
  { en: 'Speak English out loud. Your mouth needs exercise too.', zh: '大声说英语，你的嘴巴也需要锻炼。' },
  { en: 'Learn five new words today. Small steps, big results.', zh: '今天学五个新单词，小步快走，收获巨大。' },
  { en: 'Listening is the first step to speaking well.', zh: '听是说好的第一步。' },
  { en: 'Write one English sentence every day.', zh: '每天写一个英文句子。' },
  { en: 'Mistakes are the best teachers.', zh: '错误是最好的老师。' },
  { en: 'Think in English, even for simple things.', zh: '试着用英语思考，哪怕是简单的事。' },
  { en: 'A good dictionary is a good friend.', zh: '一本好词典就是一位好朋友。' },
  { en: 'Sing English songs. It is fun and useful.', zh: '唱英文歌，又有趣又有用。' },
  { en: 'Review yesterday’s words before learning new ones.', zh: '学新词之前，先复习昨天的词。' },
  { en: 'Watch one English video with subtitles today.', zh: '今天看一个带字幕的英文视频。' },
  { en: 'Don’t compare yourself with others. Compare with yesterday’s you.', zh: '别和别人比，和昨天的自己比。' },
  { en: 'Grammar is the map. Vocabulary is the journey.', zh: '语法是地图，词汇是旅程。' },
  { en: 'Keep a notebook for beautiful English sentences.', zh: '准备一个本子，摘抄漂亮的英文句子。' },
  { en: 'Talk to yourself in English in the mirror.', zh: '对着镜子用英语和自己说话。' },
  { en: 'One hour of focused study beats three distracted hours.', zh: '一小时专注学习胜过三小时心不在焉。' },
  { en: 'Learn phrases, not just single words.', zh: '记短语，而不只是记单个单词。' },
  { en: 'Teach someone what you learned today.', zh: '把今天学到的讲给别人听。' },
  { en: 'Sleep well. Your brain organizes English while you sleep.', zh: '好好睡觉，大脑会在睡眠中整理英语。' },
  { en: 'Read the same article three times. Each time you find something new.', zh: '同一篇文章读三遍，每遍都有新发现。' },
  { en: 'Imitate the pronunciation you hear. Be a copycat.', zh: '模仿你听到的发音，做个"模仿者"。' },
  { en: 'Set a small goal: finish one lesson today.', zh: '定个小目标：今天学完一课。' },
  { en: 'English opens doors to the whole world.', zh: '英语为你打开通往全世界的大门。' },
  { en: 'Consistency beats intensity. A little every day wins.', zh: '坚持胜过爆发，每天一点点最厉害。' },
  { en: 'Celebrate every small win in your learning.', zh: '为学习中的每一个小进步庆祝。' },
  { en: 'You are closer than you were yesterday. Keep going.', zh: '你比昨天更近了一步，继续加油。' },
];
