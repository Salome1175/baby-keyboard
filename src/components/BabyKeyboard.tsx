// src/components/BabyKeyboard.tsx
import { useEffect, useState } from "react"
import "./BabyKeyboard.css"

// 所有按键（包括字母和特殊键）
// const allKeys = [
//   ..."abcdefghijklmnopqrstuvwxyz",
//   "0","1","2","3","4","5","6","7","8","9",
//   "tab","enter","escape","backspace","space",
//   "shift","control","option","command","capslock",
//   "f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"
// ]


// 每个字母键映射多个单词（展示和发音）
const wordMap: Record<string, { word: string; image: string; audio?: string }[]> = {

  a: [
    { word: "Apple", image: "images/apple.png", audio: "sounds/apple.mp3" },
    { word: "Artist", image: "images/artist.png", audio: "sounds/artist.mp3" },
  ],
  b: [
    { word: "Banana", image: "images/banana.png", audio: "sounds/banana.mp3" },
    { word: "Ball", image: "images/ball.png", audio: "sounds/ball.mp3" },
  ],
  c: [
    { word: "Cat", image: "images/cat.png", audio: "sounds/cat.mp3" },
    { word: "Car", image: "images/car.png", audio: "sounds/car.mp3" },
  ],
  d: [
    { word: "Dog", image: "images/dog.png", audio: "sounds/dog.mp3" },
    { word: "Duck", image: "images/duck.png", audio: "sounds/duck.mp3" },
  ],
  e: [
    { word: "Elephant", image: "images/elephant.png", audio: "sounds/elephant.mp3" },
    { word: "Egg", image: "images/egg.png", audio: "sounds/egg.mp3" },
  ],
  f: [
    { word: "Fish", image: "images/fish.png", audio: "sounds/fish.mp3" },
    { word: "Frog", image: "images/frog.png", audio: "sounds/frog.mp3" },
  ],
  g: [
    { word: "Giraffe", image: "images/giraffe.png", audio: "sounds/giraffe.mp3" },
    { word: "Guitar", image: "images/guitar.png", audio: "sounds/guitar.mp3" },
  ],
  h: [
    { word: "Hat", image: "images/hat.png", audio: "sounds/hat.mp3" },
    { word: "House", image: "images/house.png", audio: "sounds/house.mp3" },
  ],
  i: [
    { word: "Ice", image: "images/ice.png", audio: "sounds/ice.mp3" },
    { word: "Igloo", image: "images/igloo.png", audio: "sounds/igloo.mp3" },
  ],
  j: [
    { word: "Juice", image: "images/juice.png", audio: "sounds/juice.mp3" },
    { word: "Jelly", image: "images/jelly.png", audio: "sounds/jelly.mp3" },
  ],
  k: [
    { word: "Kite", image: "images/kite.png", audio: "sounds/kite.mp3" },
    { word: "Kangaroo", image: "images/kangaroo.png", audio: "sounds/kangaroo.mp3" },
  ],
  l: [
    { word: "Lion", image: "images/lion.png", audio: "sounds/lion.mp3" },
    { word: "Lamp", image: "images/lamp.png", audio: "sounds/lamp.mp3" },
  ],
  m: [
    { word: "Monkey", image: "images/monkey.png", audio: "sounds/monkey.mp3" },
    { word: "Moon", image: "images/moon.png", audio: "sounds/moon.mp3" },
  ],
  n: [
    { word: "Nose", image: "images/nose.png", audio: "sounds/nose.mp3" },
    { word: "Nest", image: "images/nest.png", audio: "sounds/nest.mp3" },
  ],
  o: [
    { word: "Orange", image: "images/orange.png", audio: "sounds/orange.mp3" },
    { word: "Owl", image: "images/owl.png", audio: "sounds/owl.mp3" },
  ],
  p: [
    { word: "Pig", image: "images/pig.png", audio: "sounds/pig.mp3" },
    { word: "Panda", image: "images/panda.png", audio: "sounds/panda.mp3" },
  ],
  q: [
    { word: "Queen", image: "images/queen.png", audio: "sounds/queen.mp3" },
    { word: "Quail", image: "images/quail.png", audio: "sounds/quail.mp3" },
  ],
  r: [
    { word: "Rabbit", image: "images/rabbit.png", audio: "sounds/rabbit.mp3" },
    { word: "Robot", image: "images/robot.png", audio: "sounds/robot.mp3" },
  ],
  s: [
    { word: "Sun", image: "images/sun.png", audio: "sounds/sun.mp3" },
    { word: "Star", image: "images/star.png", audio: "sounds/star.mp3" },
  ],
  t: [
    { word: "Tiger", image: "images/tiger.png", audio: "sounds/tiger.mp3" },
    { word: "Train", image: "images/train.png", audio: "sounds/train.mp3" },
  ],
  u: [
    { word: "Umbrella", image: "images/umbrella.png", audio: "sounds/umbrella.mp3" },
    { word: "Unicorn", image: "images/unicorn.png", audio: "sounds/unicorn.mp3" },
  ],
  v: [
    { word: "Violin", image: "images/violin.png", audio: "sounds/violin.mp3" },
    { word: "Van", image: "images/van.png", audio: "sounds/van.mp3" },
  ],
  w: [
    { word: "Water", image: "images/water.png", audio: "sounds/water.mp3" },
    { word: "Whale", image: "images/whale.png", audio: "sounds/whale.mp3" },
  ],
  x: [
    { word: "Xylophone", image: "images/xylophone.png", audio: "sounds/xylophone.mp3" },
    { word: "X-ray", image: "images/xray.png", audio: "sounds/xray.mp3" },
  ],
  y: [
    { word: "Yogurt", image: "images/yogurt.png", audio: "sounds/yogurt.mp3" },
    { word: "Yak", image: "images/yak.png", audio: "sounds/yak.mp3" },
  ],
  z: [
    { word: "Zebra", image: "images/zebra.png", audio: "sounds/zebra.mp3" },
    { word: "Zoo", image: "images/zoo.png", audio: "sounds/zoo.mp3" },
  ],
  0: [ { word: "Zero", image: "images/zero.png", audio: "sounds/zero.mp3" } ],
  1: [ { word: "One", image: "images/one.png", audio: "sounds/one.mp3" } ],
  2: [ { word: "Two", image: "images/two.png", audio: "sounds/two.mp3" } ],
  3: [ { word: "Three", image: "images/three.png", audio: "sounds/three.mp3" } ],
  4: [ { word: "Four", image: "images/four.png", audio: "sounds/four.mp3" } ],
  5: [ { word: "Five", image: "images/five.png", audio: "sounds/five.mp3" } ],
  6: [ { word: "Six", image: "images/six.png", audio: "sounds/six.mp3" } ],
  7: [ { word: "Seven", image: "images/seven.png", audio: "sounds/seven.mp3" } ],
  8: [ { word: "Eight", image: "images/eight.png", audio: "sounds/eight.mp3" } ],
  9: [ { word: "Nine", image: "images/nine.png", audio: "sounds/nine.mp3" } ],

  f1: [ { word: "One", image: "images/one.png", audio: "sounds/one.mp3" } ],
  f2: [ { word: "Two", image: "images/two.png", audio: "sounds/two.mp3" } ],
  f3: [ { word: "Three", image: "images/three.png", audio: "sounds/three.mp3" } ],
  f4: [ { word: "Four", image: "images/four.png", audio: "sounds/four.mp3" } ],
  f5: [ { word: "Five", image: "images/five.png", audio: "sounds/five.mp3" } ],
  f6: [ { word: "Six", image: "images/six.png", audio: "sounds/six.mp3" } ],
  f7: [ { word: "Seven", image: "images/seven.png", audio: "sounds/seven.mp3" } ],
  f8: [ { word: "Eight", image: "images/eight.png", audio: "sounds/eight.mp3" } ],
  f9: [ { word: "Nine", image: "images/nine.png", audio: "sounds/nine.mp3" } ],
  f10: [ { word: "Ten", image: "images/ten.png", audio: "sounds/ten.mp3" } ],
  f11: [ { word: "Eleven", image: "images/eleven.png", audio: "sounds/eleven.mp3" } ],
  f12: [ { word: "Twelve", image: "images/twelve.png", audio: "sounds/twelve.mp3" } ],
}
// , [pressedKeys])


const exitKeys: [string, string] = ["q", "p"]

export default function BabyKeyboard() {
  const [currentWord, setCurrentWord] = useState<string>("Apple")
  const [currentImage, setCurrentImage] = useState<string>("/images/apple.png")
  // const [keyPressed, setKeyPressed] = useState<string>("")
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set<string>())

  const speak = (text: string, audioPath?: string) => {
    window.speechSynthesis.cancel()
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch(e => console.warn('Audio play failed:', e));
    } else {
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const newKeys = new Set(pressedKeys);
      newKeys.add(key);
      setPressedKeys(newKeys);
      setPressedKeys(new Set(pressedKeys))

      if (pressedKeys.has(exitKeys[0]) && pressedKeys.has(exitKeys[1])) {
        window.location.reload()
        return
      }

      // setKeyPressed(key)

      const list = wordMap[key] || wordMap['a']
      const entry = list[Math.floor(Math.random() * list.length)]
      setCurrentWord(entry.word)
      setCurrentImage(entry.image)
      speak(entry.word, entry.audio)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const newKeys = new Set(pressedKeys);
      newKeys.delete(e.key.toLowerCase());
      setPressedKeys(newKeys);
      setPressedKeys(new Set(pressedKeys))
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [pressedKeys])

  return (
      <div className="baby-keyboard">
        <div className="top-bar">
          <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(err => console.error(err));
                } else {
                  document.exitFullscreen().catch(err => console.error(err));
                }
              }}
              className="fullscreen-button"
          >
            切换全屏模式
          </button>
          <span className="exit-tip">同时按 <strong>Q</strong> 和 <strong>P</strong> 可退出游戏</span>
        </div>

        <div className="word-display">
          {currentWord}
        </div>
        {currentImage && (
            <img
                src={currentImage}
                alt={currentWord}
                className="word-image"
            />
        )}
      </div>
  )

}
