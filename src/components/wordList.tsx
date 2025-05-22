import { countries } from './countries'

// 按类别组织所有单词
const categories = {
  flags: countries.map(country => ({
    word: country.word,
    chinese: country.chinese,
    category: 'flags'
  })),
  animals: [
    { word: "cat", chinese: "猫", category: "pets" },
    { word: "dog", chinese: "狗", category: "pets" },
    { word: "elephant", chinese: "大象", category: "wild animals" },
    { word: "giraffe", chinese: "长颈鹿", category: "wild animals" },
    { word: "lion", chinese: "狮子", category: "wild animals" },
    { word: "monkey", chinese: "猴子", category: "wild animals" },
    { word: "panda", chinese: "熊猫", category: "wild animals" },
    { word: "tiger", chinese: "老虎", category: "wild animals" },
    { word: "zebra", chinese: "斑马", category: "wild animals" },
    { word: "kangaroo", chinese: "袋鼠", category: "wild animals" },
    { word: "rabbit", chinese: "兔子", category: "pets" },
    { word: "pig", chinese: "猪", category: "farm animals" },
    { word: "duck", chinese: "鸭子", category: "birds" },
    { word: "owl", chinese: "猫头鹰", category: "birds" },
    { word: "quail", chinese: "鹌鹑", category: "birds" },
    { word: "yak", chinese: "牦牛", category: "wild animals" }
  ],
  fruits: [
    { word: "apple", chinese: "苹果", category: "fruits" },
    { word: "banana", chinese: "香蕉", category: "fruits" },
    { word: "orange", chinese: "橙子", category: "fruits" }
  ],
  vehicles: [
    { word: "car", chinese: "汽车", category: "vehicles" },
    { word: "train", chinese: "火车", category: "vehicles" },
    { word: "van", chinese: "面包车", category: "vehicles" }
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
    { word: "ten", chinese: "十", category: "numbers" },
    { word: "eleven", chinese: "十一", category: "numbers" },
    { word: "twelve", chinese: "十二", category: "numbers" }
  ],
  nature: [
    { word: "sun", chinese: "太阳", category: "nature" },
    { word: "moon", chinese: "月亮", category: "nature" },
    { word: "star", chinese: "星星", category: "nature" },
    { word: "water", chinese: "水", category: "nature" },
    { word: "ice", chinese: "冰", category: "nature" }
  ],
  sea: [
    { word: "fish", chinese: "鱼", category: "sea creatures" },
    { word: "whale", chinese: "鲸鱼", category: "sea creatures" }
  ],
  musical: [
    { word: "guitar", chinese: "吉他", category: "musical instruments" },
    { word: "violin", chinese: "小提琴", category: "musical instruments" },
    { word: "xylophone", chinese: "木琴", category: "musical instruments" }
  ],
  food: [
    { word: "egg", chinese: "鸡蛋", category: "foods" },
    { word: "jelly", chinese: "果冻", category: "foods" },
    { word: "yogurt", chinese: "酸奶", category: "foods" }
  ],
  drinks: [
    { word: "juice", chinese: "果汁", category: "drinks" }
  ],
  games: [
    { word: "ball", chinese: "球", category: "games and toys" },
    { word: "kite", chinese: "风筝", category: "games and toys" },
    { word: "robot", chinese: "机器人", category: "games and toys" }
  ],
  buildings: [
    { word: "house", chinese: "房子", category: "buildings" },
    { word: "igloo", chinese: "冰屋", category: "buildings" }
  ],
  clothes: [
    { word: "hat", chinese: "帽子", category: "clothes" }
  ],
  jobs: [
    { word: "artist", chinese: "艺术家", category: "jobs" },
    { word: "queen", chinese: "女王", category: "jobs" }
  ],
  body: [
    { word: "nose", chinese: "鼻子", category: "body parts" }
  ],
  objects: [
    { word: "umbrella", chinese: "雨伞", category: "objects" },
    { word: "lamp", chinese: "灯", category: "household items" },
    { word: "x-ray", chinese: "X光", category: "objects" }
  ],
  fantasy: [
    { word: "unicorn", chinese: "独角兽", category: "fantasy" }
  ],
  places: [
    { word: "zoo", chinese: "动物园", category: "public places" }
  ]
};

// 按字母索引组织所有单词
export const wordList: Record<string, { word: string; chinese: string; category: string }[]> = {
  // 字母索引
  a: categories.flags.filter(w => w.word.startsWith('A')).concat(
     categories.animals.filter(w => w.word.startsWith('A')),
     categories.fruits.filter(w => w.word.startsWith('A'))
  ),
  b: categories.flags.filter(w => w.word.startsWith('B')).concat(
     categories.animals.filter(w => w.word.startsWith('B')),
     categories.fruits.filter(w => w.word.startsWith('B'))
  ),
  c: categories.flags.filter(w => w.word.startsWith('C')).concat(
     categories.animals.filter(w => w.word.startsWith('C')),
     categories.fruits.filter(w => w.word.startsWith('C'))
  ),
  // ... 其他字母索引
  d: categories.flags.filter(w => w.word.startsWith('D')).concat(
     categories.animals.filter(w => w.word.startsWith('D'))
  ),
  e: categories.flags.filter(w => w.word.startsWith('E')).concat(
     categories.animals.filter(w => w.word.startsWith('E'))
  ),
  f: categories.flags.filter(w => w.word.startsWith('F')).concat(
     categories.animals.filter(w => w.word.startsWith('F'))
  ),
  g: categories.flags.filter(w => w.word.startsWith('G')).concat(
     categories.animals.filter(w => w.word.startsWith('G'))
  ),
  h: categories.flags.filter(w => w.word.startsWith('H')).concat(
     categories.animals.filter(w => w.word.startsWith('H'))
  ),
  i: categories.flags.filter(w => w.word.startsWith('I')).concat(
     categories.animals.filter(w => w.word.startsWith('I'))
  ),
  j: categories.flags.filter(w => w.word.startsWith('J')).concat(
     categories.animals.filter(w => w.word.startsWith('J'))
  ),
  k: categories.flags.filter(w => w.word.startsWith('K')).concat(
     categories.animals.filter(w => w.word.startsWith('K'))
  ),
  l: categories.flags.filter(w => w.word.startsWith('L')).concat(
     categories.animals.filter(w => w.word.startsWith('L'))
  ),
  m: categories.flags.filter(w => w.word.startsWith('M')).concat(
     categories.animals.filter(w => w.word.startsWith('M'))
  ),
  n: categories.flags.filter(w => w.word.startsWith('N')).concat(
     categories.animals.filter(w => w.word.startsWith('N'))
  ),
  o: categories.flags.filter(w => w.word.startsWith('O')).concat(
     categories.animals.filter(w => w.word.startsWith('O'))
  ),
  p: categories.flags.filter(w => w.word.startsWith('P')).concat(
     categories.animals.filter(w => w.word.startsWith('P'))
  ),
  q: categories.flags.filter(w => w.word.startsWith('Q')).concat(
     categories.animals.filter(w => w.word.startsWith('Q'))
  ),
  r: categories.flags.filter(w => w.word.startsWith('R')).concat(
     categories.animals.filter(w => w.word.startsWith('R'))
  ),
  s: categories.flags.filter(w => w.word.startsWith('S')).concat(
     categories.animals.filter(w => w.word.startsWith('S'))
  ),
  t: categories.flags.filter(w => w.word.startsWith('T')).concat(
     categories.animals.filter(w => w.word.startsWith('T'))
  ),
  u: categories.flags.filter(w => w.word.startsWith('U')).concat(
     categories.animals.filter(w => w.word.startsWith('U'))
  ),
  v: categories.flags.filter(w => w.word.startsWith('V')).concat(
     categories.animals.filter(w => w.word.startsWith('V'))
  ),
  w: categories.flags.filter(w => w.word.startsWith('W')).concat(
     categories.animals.filter(w => w.word.startsWith('W'))
  ),
  x: categories.flags.filter(w => w.word.startsWith('X')).concat(
     categories.animals.filter(w => w.word.startsWith('X'))
  ),
  y: categories.flags.filter(w => w.word.startsWith('Y')).concat(
     categories.animals.filter(w => w.word.startsWith('Y'))
  ),
  z: categories.flags.filter(w => w.word.startsWith('Z')).concat(
     categories.animals.filter(w => w.word.startsWith('Z'))
  ),
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
  f11: categories.numbers.filter(w => w.word === "eleven"),
  f12: categories.numbers.filter(w => w.word === "twelve"),
  // 类别索引
  flags: categories.flags,
  animals: categories.animals,
  fruits: categories.fruits,
  vehicles: categories.vehicles,
  numbers: categories.numbers,
  nature: categories.nature,
  sea: categories.sea,
  musical: categories.musical,
  food: categories.food,
  drinks: categories.drinks,
  games: categories.games,
  buildings: categories.buildings,
  clothes: categories.clothes,
  jobs: categories.jobs,
  body: categories.body,
  objects: categories.objects,
  fantasy: categories.fantasy,
  places: categories.places
};