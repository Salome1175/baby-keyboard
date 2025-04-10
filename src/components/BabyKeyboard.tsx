// src/components/BabyKeyboard.tsx
import {useEffect, useRef, useState} from "react"
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
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const [showTip, setShowTip] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showAskDialog, setShowAskDialog] = useState(false);

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

  //启动自动全屏
  useEffect(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, [])
  //Esc 键并“恢复全屏”
  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        console.log("检测到退出全屏，尝试重新进入");
        document.documentElement.requestFullscreen().catch(() => {});
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      pressedKeysRef.current.add(key);

      if (
          pressedKeysRef.current.has(exitKeys[0]) &&
          pressedKeysRef.current.has(exitKeys[1])
      ) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        window.location.reload();
      }

      const list = wordMap[key] || wordMap['a'];
      const entry = list[Math.floor(Math.random() * list.length)];
      setCurrentWord(entry.word);
      setCurrentImage(entry.image);
      speak(entry.word, entry.audio);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  //拦截部分系统按键
  useEffect(() => {
    const preventKeys = ["meta", "control", "alt", "escape"];
    const handleBlockKeys = (e: KeyboardEvent) => {
      if (preventKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`拦截了按键：${e.key}`);
      }
    };
    window.addEventListener("keydown", handleBlockKeys, true);
    return () => window.removeEventListener("keydown", handleBlockKeys, true);
  }, []);

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

        <button
            onClick={() => setShowAskDialog(true)}
            className="milk-button-icon"
            aria-label="请我喝奶茶"
        >
          🧋
        </button>

        {showTip && (
            <div className="milk-overlay" onClick={() => setShowTip(false)}>
              <div className="milk-popup" onClick={(e) => e.stopPropagation()}>
                <h2 className="milk-title">请我喝一杯奶茶 🧋</h2>
                <p className="milk-text">扫描下方任意二维码支持作者</p>
                <div className="milk-pay-options">
                  <div className="pay-item">
                    <img
                        src="images/wechat.png"
                        alt="微信"
                        className="pay-image"
                        onClick={() => setPreviewImage("images/wechat.png")}
                    />
                    <p>微信</p>
                  </div>
                  <div className="pay-item">
                    <img
                        src="images/alipay.png"
                        alt="支付宝"
                        className="pay-image"
                        onClick={() => setPreviewImage("images/alipay.png")}
                    />
                    <p>支付宝</p>
                  </div>
                  {/*<div className="pay-item">*/}
                  {/*  <img*/}
                  {/*      src="images/paypal.png"*/}
                  {/*      alt="PayPal"*/}
                  {/*      className="pay-image"*/}
                  {/*      onClick={() => setPreviewImage("images/paypal.png")}*/}
                  {/*  />*/}
                  {/*  <p>PayPal</p>*/}
                  {/*</div>*/}
                </div>
                <button onClick={() => setShowTip(false)} className="milk-close">关闭</button>
              </div>
            </div>
        )}

        {previewImage && (
            <div className="preview-overlay" onClick={() => setPreviewImage(null)}>
              <img src={previewImage} alt="放大预览" className="preview-image" />
            </div>
        )}

        {showAskDialog && (
            <div className="milk-overlay" onClick={() => setShowAskDialog(false)}>
              <div className="milk-dialog" onClick={(e) => e.stopPropagation()}>
                <p className="milk-question">可以请我喝一杯奶茶吗？</p>
                <div className="milk-actions">
                  <button
                      className="milk-confirm"
                      onClick={() => {
                        setShowAskDialog(false);
                        setShowTip(true);
                      }}
                  >
                    好
                  </button>
                  <button
                      className="milk-cancel"
                      onClick={() => setShowAskDialog(false)}
                  >
                    下次一定
                  </button>
                </div>
              </div>
            </div>
        )}

      </div>
  )

}
