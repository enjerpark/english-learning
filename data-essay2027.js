/* 2027 英语考试作文押题特刊 · 数据文件（草稿，未上线）
   依据：2026-11-05 用户要求“以 2026 年发生的事预测 2027 年英语考试作文”，
   julian 当天在主聊天给出 6 大押题方向；本文件把 6 个方向做成范文 + 词汇表 + 亮点句型。
   事实核对（2026-11-05）：①“智能体”首次写入 2026 年政府工作报告（与智能终端并列，
   报告首提“打造智能经济新形态”）；② 阿尔忒弥斯 2 号 2026-04-01 发射、04-10 溅落，
   1972 年以来首次载人绕月飞行。米兰冬奥会（2026-02）、美加墨世界杯 48 队（2026-06）
   为公开赛程。范文约 160–200 词，适配高考 / 四六级；雅思考生可扩写至 250 词。
   使用方式：essay2027.html 直接引用本文件；上线时只需在 index.html 杂志区加一张卡片并 git push。
*/

const ESSAY2027 = {
  issue: '2027 押题特刊 · 2026 年 11 月',
  intro: '以 2026 年大事为锚：智能体写入政府工作报告、米兰冬奥会、48 队世界杯、阿尔忒弥斯 2 号绕月。6 篇范文，每篇配中文翻译、核心词汇与亮点句型。',
  topics: [
    {
      cat: 'TOPIC 1 · 头号热门',
      title: 'Should Students Use AI to Do Homework?',
      prompt: '预测题目：假如你是李华，你校英语报正在讨论“学生该不该用 AI 写作业”，请写一篇短文谈谈你的看法。',
      exams: '适用：高考 · 四六级 · 考研',
      en: 'In 2026, AI agents were written into China\'s government work report for the first time. AI is no longer just a chatbot; it can now write essays, solve problems and plan our study. So should students use AI to do their homework? My answer is yes — but wisely.\n\nOn the one hand, AI can be a great teacher. When I am stuck on a math problem at midnight, it explains the steps patiently. It helps me find mistakes quickly and learn at my own pace. On the other hand, copying answers from AI is cheating ourselves. If we let AI think for us, our brains will slowly stop working. Homework is not about the answer; it is about the thinking.\n\nIn my opinion, we should use AI as a tutor, not as a writer. Ask it why, not just what. In the age of AI, the most important ability is not memorizing answers, but asking good questions and thinking independently.',
      zh: '2026 年，“智能体”首次被写入政府工作报告。AI 不再只是一个聊天工具，它能写作文、解难题、规划学习。那么，学生该不该用 AI 写作业？我的答案是：可以用，但要用得明智。\n\n一方面，AI 可以是一位好老师。深夜我卡在一道数学题上时，它会耐心地讲解步骤，帮我快速找到错误、按自己的节奏学习。另一方面，直接抄 AI 的答案就是在欺骗自己。如果让 AI 替我们思考，我们的大脑会慢慢停止运转。作业的意义不在于答案，而在于思考的过程。\n\n在我看来，我们应该把 AI 当作辅导老师，而不是代笔。问它“为什么”，而不只是“是什么”。在 AI 时代，最重要的能力不是背答案，而是提出好问题、独立思考。',
      words: [['agent', 'n. 智能体；代理'], ['wisely', 'adv. 明智地'], ['patiently', 'adv. 耐心地'], ['cheat', 'v. 欺骗'], ['independently', 'adv. 独立地'], ['memorize', 'v. 记住；背诵']],
      phrases: ['AI is no longer just a chatbot; it can now…', 'If we let AI think for us, our brains will slowly stop working.', 'Use AI as a tutor, not as a writer.'],
    },
    {
      cat: 'TOPIC 2 · 体育大年',
      title: 'Sportsmanship in the Age of AI',
      prompt: '预测题目：2026 年米兰冬奥会和美加墨世界杯上，AI 已用于裁判和战术分析。请就“科技与体育精神”写一篇议论文。',
      exams: '适用：高考 · 四六级 · 雅思',
      en: 'The year 2026 was a great year for sports. The Winter Olympics were held in Milan in February, and the World Cup, with 48 teams for the first time, kicked off in the USA, Canada and Mexico in June. This World Cup is even called the first "AI World Cup", because AI helps referees make decisions and coaches plan tactics.\n\nSome people worry that technology will kill the spirit of sports. I disagree. Technology can make games fairer. A wrong call used to break an athlete\'s heart after four years of hard training. Now AI helps referees see the truth. But technology should never replace the human heart of sport — the courage to keep running when your legs are tired, the respect for your opponent, and the teamwork that turns eleven players into one team.\n\nSportsmanship means winning with grace and losing with dignity. No machine can teach us that. The best future is one in which AI makes the game fairer, while humans keep the game beautiful.',
      zh: '2026 年是体育大年。2 月米兰冬奥会举行，6 月美加墨世界杯开幕，参赛队首次扩至 48 支。这届世界杯甚至被称为首届“AI 世界杯”，因为 AI 帮助裁判做判罚、帮助教练制定战术。\n\n有人担心科技会扼杀体育精神，我不同意。科技能让比赛更公平。一次误判曾经会让运动员四年的苦训付之东流，如今 AI 帮助裁判看清真相。但科技永远不应取代体育的人性内核——双腿疲惫时仍坚持奔跑的勇气、对对手的尊重，以及把十一个人变成一支队伍的团队合作。\n\n体育精神意味着胜之有风度、败之有尊严。没有机器能教会我们这些。最好的未来是：AI 让比赛更公平，而人类让比赛更美好。',
      words: [['sportsmanship', 'n. 体育精神'], ['referee', 'n. 裁判'], ['tactic', 'n. 战术'], ['opponent', 'n. 对手'], ['dignity', 'n. 尊严'], ['grace', 'n. 优雅；风度']],
      phrases: ['Technology can make games fairer.', 'No machine can teach us that.', 'Winning with grace and losing with dignity.'],
    },
    {
      cat: 'TOPIC 3 · 环保换打法',
      title: 'Living with a Hotter Planet',
      prompt: '预测题目：近年来极端高温频发，微塑料被发现进入人体。请以“气候适应”为主题写一篇短文。',
      exams: '适用：四六级 · 考研 · 雅思',
      en: 'For many years, English exam essays asked us to "protect the environment". But in 2026, the question changed. It is no longer only about saving the planet — it is about learning to live with a hotter planet. Heatwaves are longer, and scientists have found microplastics even in the human body.\n\nWe cannot wait for the climate to go back to normal. We must adapt. Cities can plant more trees and build cool public spaces for old people during hot summers. Schools can change class hours on very hot days. Each of us can use fewer single-use plastics — bring our own bottle, say no to plastic bags.\n\nProtecting the environment used to mean "do less harm". Today it also means "be ready". Small changes in our daily life will not cool the Earth in one day, but they decide what kind of world we will live in.',
      zh: '多年来，英语考试作文总让我们“保护环境”。但 2026 年，问题变了：不再只是拯救地球，而是学会与更热的地球共存。热浪越来越长，科学家甚至在人体内发现了微塑料。\n\n我们不能等气候恢复正常，必须学会适应。城市可以多种树、为老人在酷暑中建清凉的公共空间；学校可以在极端高温天调整上课时间。我们每个人可以少用一次性塑料——自带水杯、拒绝塑料袋。\n\n过去，环保意味着“少造成伤害”；今天，它还意味着“做好准备”。日常生活中的小改变不会让地球一天变凉，但它们决定了我们将生活在怎样的世界里。',
      words: [['heatwave', 'n. 热浪'], ['microplastic', 'n. 微塑料'], ['adapt', 'v. 适应'], ['single-use', 'adj. 一次性的'], ['cool', 'adj. 凉爽的'], ['be ready', '做好准备']],
      phrases: ['It is no longer only about… — it is about…', 'We cannot wait for… We must adapt.', 'Small changes in our daily life will not… but they decide…'],
    },
    {
      cat: 'TOPIC 4 · 手机与青少年',
      title: 'Should Phones Be Kept Out of School?',
      prompt: '预测题目：2026 年多国讨论限制未成年人使用社交媒体。你认为学校该不该禁止学生带手机？请谈谈你的看法。',
      exams: '适用：高考 · 四六级',
      en: 'Short videos are fun. One more video, and suddenly an hour is gone. In 2026, many countries began to discuss limits on teenagers\' use of social media. Should schools ban mobile phones? I think the answer is not a simple yes or no.\n\nPhones can help us learn. We can look up words, watch English videos and talk with foreign friends. But phones also steal our attention. Studies show that students who check their phones often get lower grades and sleep worse. The problem is not the phone itself, but self-control.\n\nMy suggestion is this: schools can collect phones during class and return them after school. At home, parents can agree on screen time with their children instead of simply taking the phone away. Technology is a tool. Learning to control it is more important than banning it.',
      zh: '短视频很好玩，再看一个，一小时就过去了。2026 年，多国开始讨论限制未成年人使用社交媒体。学校该不该禁手机？我认为答案不是简单的“是”或“否”。\n\n手机能帮助学习：查单词、看英文视频、和外国朋友交流。但手机也会偷走我们的注意力。研究表明，常看手机的学生成绩更差、睡眠更糟。问题不在手机本身，而在自控力。\n\n我的建议是：学校可以在上课时统一收手机，放学后归还；在家里，家长可以和孩子商定屏幕时间，而不是简单地没收手机。技术是一种工具，学会控制它，比禁止它更重要。',
      words: [['screen time', 'n. 屏幕时间'], ['self-control', 'n. 自控力'], ['ban', 'v. 禁止'], ['attention', 'n. 注意力'], ['steal', 'v. 偷走'], ['agree on', '就……达成一致']],
      phrases: ['The problem is not… but…', 'One more video, and suddenly an hour is gone.', 'Learning to control it is more important than banning it.'],
    },
    {
      cat: 'TOPIC 5 · 传统文化',
      title: 'A Letter to Introduce Tea Culture',
      prompt: '预测题目：假如你是李华，你的外国朋友 Peter 对中国茶文化很感兴趣，请你写一封信向他介绍中国茶。',
      exams: '适用：高考 · 四六级（书信常考）',
      en: 'Dear Peter,\n\nI am glad to hear that you are interested in Chinese tea culture. I would like to introduce it to you.\n\nIn China, tea is much more than a drink. It has a history of about 5,000 years. The story goes that some tea leaves fell into Emperor Shennong\'s hot water, and he loved the taste. Since then, Chinese people have drunk tea every day. There are many kinds of tea: green tea, black tea, oolong tea, and more. Each kind has its own taste and smell.\n\nDrinking tea is also a way of showing respect. When guests visit, we serve them a cup of hot tea first. In recent years, tea culture has become popular with young people too. Many tea houses now mix traditional tea with modern styles.\n\nI hope you can come to China one day and taste real Chinese tea with me.\n\nYours,\nLi Hua',
      zh: '亲爱的 Peter：\n\n很高兴听说你对中国茶文化感兴趣，我想为你介绍一下。\n\n在中国，茶远不只是一种饮品，它已有约五千年的历史。传说几片茶叶落入神农氏的热水中，他爱上了这种味道。从那时起，中国人每天都喝茶。茶的种类很多：绿茶、红茶、乌龙茶等等，每种都有自己的味道和香气。\n\n喝茶也是一种表达敬意的方式。客人来访时，我们会先奉上一杯热茶。近年来，茶文化在年轻人中也流行起来，许多茶馆把传统茶艺与现代风格结合在一起。\n\n希望有一天你能来中国，和我一起品尝真正的中国茶。\n\n你忠实的李华',
      words: [['culture', 'n. 文化'], ['emperor', 'n. 皇帝'], ['respect', 'n./v. 尊敬'], ['serve', 'v. 招待；端上'], ['traditional', 'adj. 传统的'], ['guest', 'n. 客人']],
      phrases: ['I am glad to hear that…', 'Tea is much more than a drink.', 'I hope you can come to China one day and…'],
    },
    {
      cat: 'TOPIC 6 · 探索与梦想',
      title: 'Why Do We Explore the Moon?',
      prompt: '预测题目：2026 年 4 月，阿尔忒弥斯 2 号载人绕月飞行成功，这是 1972 年以来人类首次重返月球附近。请以“探索精神”为题写一篇议论文。',
      exams: '适用：高考 · 四六级 · 考研',
      en: 'On April 1, 2026, four astronauts flew around the Moon and returned safely nine days later. It was the first time humans had travelled to the Moon since 1972. Why do we spend so much money and take such risks to explore space?\n\nFirst, exploration pushes science forward. To send people to the Moon, we must solve thousands of hard problems — new materials, better computers, safer spaceships. These inventions later improve our life on Earth. Second, exploration teaches us courage. The astronauts knew the risks, but they went anyway, because some dreams are worth the danger.\n\nSome people say we should fix the problems on Earth first. They have a point. But looking up at the stars does not mean forgetting the Earth. It reminds us that humans can do great things when we work together. The Moon is far away, but the spirit of exploration lives in every student who dares to dream big.',
      zh: '2026 年 4 月 1 日，四名宇航员绕月飞行，九天后安全返回。这是自 1972 年以来人类首次重返月球附近。我们为什么要花这么多钱、冒这么大风险去探索太空？\n\n首先，探索推动科学前进。为了把人送上月球，我们必须解决成千上万的难题——新材料、更好的计算机、更安全的飞船，这些发明后来改善了我们在地球上的生活。其次，探索教会我们勇气。宇航员明知风险，依然前行，因为有些梦想值得冒险。\n\n有人说应该先解决地球上的问题，他们有道理。但仰望星空并不意味着忘记地球，它提醒我们：人类团结起来就能成就伟大的事。月球很远，但探索精神活在每一个敢于怀揣大梦想的学生心中。',
      words: [['explore', 'v. 探索'], ['astronaut', 'n. 宇航员'], ['courage', 'n. 勇气'], ['risk', 'n. 风险'], ['invention', 'n. 发明'], ['perseverance', 'n. 毅力；坚持']],
      phrases: ['It was the first time humans had… since 1972.', 'Some dreams are worth the danger.', 'Looking up at the stars does not mean forgetting the Earth.'],
    },
  ],
};
