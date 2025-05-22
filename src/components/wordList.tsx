import { countries } from './countries'

// 定义所有分类
export const categories = {
  vegetables: [
    { word: "carrot", chinese: "胡萝卜", category: "vegetables" },
    { word: "broccoli", chinese: "西兰花", category: "vegetables" },
    { word: "potato", chinese: "土豆", category: "vegetables" },
    { word: "tomato", chinese: "西红柿", category: "vegetables" },
    { word: "cucumber", chinese: "黄瓜", category: "vegetables" },
    { word: "eggplant", chinese: "茄子", category: "vegetables" },
    { word: "bell pepper", chinese: "青椒", category: "vegetables" },
    { word: "onion", chinese: "洋葱", category: "vegetables" }
  ],
  animals: [
    { word: "cat", chinese: "猫", category: "animals" },
    { word: "dog", chinese: "狗", category: "animals" },
    { word: "elephant", chinese: "大象", category: "animals" },
    { word: "giraffe", chinese: "长颈鹿", category: "animals" },
    { word: "lion", chinese: "狮子", category: "animals" },
    { word: "monkey", chinese: "猴子", category: "animals" },
    { word: "panda", chinese: "熊猫", category: "animals" },
    { word: "tiger", chinese: "老虎", category: "animals" },
    { word: "zebra", chinese: "斑马", category: "animals" },
    { word: "kangaroo", chinese: "袋鼠", category: "animals" },
    { word: "rabbit", chinese: "兔子", category: "animals" },
    { word: "pig", chinese: "猪", category: "animals" },
    { word: "duck", chinese: "鸭子", category: "animals" },
    { word: "owl", chinese: "猫头鹰", category: "animals" }
  ],
  fruits: [
    { word: "apple", chinese: "苹果", category: "fruits" },
    { word: "banana", chinese: "香蕉", category: "fruits" },
    { word: "orange", chinese: "橙子", category: "fruits" },
    { word: "strawberry", chinese: "草莓", category: "fruits" },
    { word: "grape", chinese: "葡萄", category: "fruits" },
    { word: "watermelon", chinese: "西瓜", category: "fruits" },
    { word: "pear", chinese: "梨", category: "fruits" },
    { word: "peach", chinese: "桃子", category: "fruits" }
  ],
  colors: [
    { word: "red", chinese: "红色", category: "colors" },
    { word: "blue", chinese: "蓝色", category: "colors" },
    { word: "yellow", chinese: "黄色", category: "colors" },
    { word: "green", chinese: "绿色", category: "colors" },
    { word: "purple", chinese: "紫色", category: "colors" },
    { word: "orange", chinese: "橙色", category: "colors" },
    { word: "pink", chinese: "粉色", category: "colors" },
    { word: "brown", chinese: "棕色", category: "colors" }
  ],
  vehicles: [
    { word: "car", chinese: "汽车", category: "vehicles" },
    { word: "bus", chinese: "公交车", category: "vehicles" },
    { word: "train", chinese: "火车", category: "vehicles" },
    { word: "airplane", chinese: "飞机", category: "vehicles" },
    { word: "bicycle", chinese: "自行车", category: "vehicles" },
    { word: "motorcycle", chinese: "摩托车", category: "vehicles" },
    { word: "boat", chinese: "船", category: "vehicles" },
    { word: "helicopter", chinese: "直升机", category: "vehicles" }
  ],
  numbers: [
    { word: "zero", chinese: "零", category: "numbers" },
    { word: "one", chinese: "一", category: "numbers" },
    { word: "two", chinese: "二", category: "numbers" },
    { word: "three", chinese: "三", category: "numbers" },
    { word: "four", chinese: "四", category: "numbers" },
    { word: "five", chinese: "五", category: "numbers" },
    { word: "six", chinese: "六", category: "numbers" },
    { word: "seven", chinese: "七", category: "numbers" },
    { word: "eight", chinese: "八", category: "numbers" },
    { word: "nine", chinese: "九", category: "numbers" },
    { word: "ten", chinese: "十", category: "numbers" }
  ],
  flags: countries.map(country => ({
    word: country.word,
    chinese: country.chinese,
    category: "flags"
  })),
  jobs: [
    { word: "teacher", chinese: "老师", category: "jobs" },
    { word: "doctor", chinese: "医生", category: "jobs" },
    { word: "nurse", chinese: "护士", category: "jobs" },
    { word: "police", chinese: "警察", category: "jobs" },
    { word: "firefighter", chinese: "消防员", category: "jobs" },
    { word: "chef", chinese: "厨师", category: "jobs" },
    { word: "artist", chinese: "艺术家", category: "jobs" },
    { word: "scientist", chinese: "科学家", category: "jobs" }
  ],
  musical: [
    { word: "piano", chinese: "钢琴", category: "musical" },
    { word: "guitar", chinese: "吉他", category: "musical" },
    { word: "violin", chinese: "小提琴", category: "musical" },
    { word: "drum", chinese: "鼓", category: "musical" },
    { word: "flute", chinese: "长笛", category: "musical" },
    { word: "trumpet", chinese: "小号", category: "musical" },
    { word: "saxophone", chinese: "萨克斯", category: "musical" },
    { word: "xylophone", chinese: "木琴", category: "musical" }
  ],
  objects: [
    { word: "book", chinese: "书", category: "objects" },
    { word: "pen", chinese: "钢笔", category: "objects" },
    { word: "pencil", chinese: "铅笔", category: "objects" },
    { word: "ruler", chinese: "尺子", category: "objects" },
    { word: "eraser", chinese: "橡皮", category: "objects" },
    { word: "scissors", chinese: "剪刀", category: "objects" },
    { word: "glue", chinese: "胶水", category: "objects" },
    { word: "crayon", chinese: "蜡笔", category: "objects" }
  ],
  others: [
    { word: "sun", chinese: "太阳", category: "others" },
    { word: "moon", chinese: "月亮", category: "others" },
    { word: "star", chinese: "星星", category: "others" },
    { word: "cloud", chinese: "云", category: "others" },
    { word: "rain", chinese: "雨", category: "others" },
    { word: "snow", chinese: "雪", category: "others" },
    { word: "wind", chinese: "风", category: "others" },
    { word: "thunder", chinese: "雷", category: "others" }
  ]
};

// 按字母索引组织所有单词
export const wordList: Record<string, { word: string; chinese: string; category: string }[]> = {
  // 字母索引
  a: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('a')),
  b: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('b')),
  c: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('c')),
  d: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('d')),
  e: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('e')),
  f: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('f')),
  g: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('g')),
  h: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('h')),
  i: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('i')),
  j: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('j')),
  k: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('k')),
  l: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('l')),
  m: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('m')),
  n: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('n')),
  o: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('o')),
  p: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('p')),
  q: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('q')),
  r: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('r')),
  s: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('s')),
  t: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('t')),
  u: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('u')),
  v: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('v')),
  w: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('w')),
  x: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('x')),
  y: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('y')),
  z: Object.values(categories).flat().filter(w => w.word.toLowerCase().startsWith('z')),
  
  // 数字索引
  0: categories.numbers.filter(w => w.word === "zero"),
  1: categories.numbers.filter(w => w.word === "one"),
  2: categories.numbers.filter(w => w.word === "two"),
  3: categories.numbers.filter(w => w.word === "three"),
  4: categories.numbers.filter(w => w.word === "four"),
  5: categories.numbers.filter(w => w.word === "five"),
  6: categories.numbers.filter(w => w.word === "six"),
  7: categories.numbers.filter(w => w.word === "seven"),
  8: categories.numbers.filter(w => w.word === "eight"),
  9: categories.numbers.filter(w => w.word === "nine"),
  
  // 功能键索引
  f1: categories.numbers.filter(w => w.word === "one"),
  f2: categories.numbers.filter(w => w.word === "two"),
  f3: categories.numbers.filter(w => w.word === "three"),
  f4: categories.numbers.filter(w => w.word === "four"),
  f5: categories.numbers.filter(w => w.word === "five"),
  f6: categories.numbers.filter(w => w.word === "six"),
  f7: categories.numbers.filter(w => w.word === "seven"),
  f8: categories.numbers.filter(w => w.word === "eight"),
  f9: categories.numbers.filter(w => w.word === "nine"),
  f10: categories.numbers.filter(w => w.word === "ten"),
  
  // 类别索引
  vegetables: categories.vegetables,
  animals: categories.animals,
  fruits: categories.fruits,
  colors: categories.colors,
  vehicles: categories.vehicles,
  numbers: categories.numbers,
  flags: categories.flags,
  jobs: categories.jobs,
  musical: categories.musical,
  objects: categories.objects,
  others: categories.others
};