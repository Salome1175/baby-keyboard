// src/components/BabyKeyboard.tsx
import {useEffect, useRef, useState} from "react"
import "./BabyKeyboard.css"
import { wordList } from "./wordList.tsx";

// 所有按键（包括字母和特殊键）
// const allKeys = [
//   ..."abcdefghijklmnopqrstuvwxyz",
//   "0","1","2","3","4","5","6","7","8","9",
//   "tab","enter","escape","backspace","space",
//   "shift","control","option","command","capslock",
//   "f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"
// ]

//单词表
export const wordMap: Record<string, { word: string; image: string; audio?: string; category: string }[]> =
    Object.fromEntries(
        Object.entries(wordList).map(([key, entries]) => [
          key,
          entries.map(({ word, category }) => ({
            word: word.charAt(0).toUpperCase() + word.slice(1),
            image: `images/${word}.png`,
            audio: `sounds/${word}.mp3`,
            category,
          })),
        ])
    );

//退出键
const exitKeys: [string, string] = ["q", "p"]

export default function BabyKeyboard() {
  const [currentWord, setCurrentWord] = useState<string>("Apple")
  const [currentImage, setCurrentImage] = useState<string>("/images/apple.png")
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const [showTip, setShowTip] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showAskDialog, setShowAskDialog] = useState(false);

  //新增分类选项区域
  const selectedCategoriesRef = useRef<string[]>(["all"]);
  const [selectedCategories, _setSelectedCategories] = useState<string[]>(["all"]);

  //解决小孩疯狂敲键导致声音混乱问题
  const lastKeyTimeRef = useRef(0);

  //维护一个 indexMap，记录每个字母目前到了第几个单词
  const indexMapRef = useRef<Record<string, number>>({});

  //下拉category选相框
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategory = (category: string) => {
    if (category === "all") {
      selectedCategoriesRef.current = ["all"];
      _setSelectedCategories(["all"]);
    } else {
      _setSelectedCategories(prev => {
        const newSelected = prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev.filter(c => c !== "all"), category];

        selectedCategoriesRef.current = newSelected.length === 0 ? ["all"] : newSelected;
        return selectedCategoriesRef.current;
      });
    }
  };

  //单词分类
  const allCategories = ["all", ...Array.from(
      new Set(
          Object.values(wordList)
              .flat()
              .map(entry => entry.category)
      )
  )];

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

      const now = Date.now();
      if (now - lastKeyTimeRef.current < 200) return;
      lastKeyTimeRef.current = now;

      if (
          pressedKeysRef.current.has(exitKeys[0]) &&
          pressedKeysRef.current.has(exitKeys[1])
      ) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        window.location.reload();
      }

      const fullList = wordMap[key] || wordMap['t'];
      const currentCategories = selectedCategoriesRef.current;
      const filteredList = fullList.filter(entry => {
        return currentCategories.includes("all") || currentCategories.includes(entry.category);
      });

      if (filteredList.length === 0) {
        return;
      }

      const categoryKey = key + "-" + currentCategories.sort().join(",");
      let index = indexMapRef.current[categoryKey] || 0;
      const entry = filteredList[index % filteredList.length];
      indexMapRef.current[categoryKey] = index + 1;

      setCurrentWord(entry.word);
      setCurrentImage(`${import.meta.env.BASE_URL}${entry.image}`);
      speak(entry.word, entry.audio ? `${import.meta.env.BASE_URL}${entry.audio}` : undefined);
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

        {/*单词分类下拉选相框*/}
        <div className="category-dropdown">
          {/* 展开收起按钮 */}
          <div className="category-header" onClick={() => setShowCategories(!showCategories)}>
            <span className="arrow">{showCategories ? "▼" : "▶"}</span>
            <span className="title">category</span>
          </div>

          {/* 展开的分类列表 */}
          {showCategories && (
              <div className="category-list">
                {allCategories.map(category => {
                  const isSelected = selectedCategories.includes(category);
                  return (
                      <div
                          key={category}
                          className="category-item"
                          onClick={() => toggleCategory(category)}
                      >
                        <span className="circle">{isSelected ? "✅" : "⭕️"}</span>
                        <span className="label">{category}</span>
                      </div>
                  );
                })}
              </div>
          )}
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
                        // src="/baby-keyboard/images/wechat.png"
                        src={`${import.meta.env.BASE_URL}images/wechat.png`}
                        alt="微信"
                        className="pay-image"
                        onClick={() => setPreviewImage("images/wechat.png")}
                    />
                    <p>微信</p>
                  </div>
                  <div className="pay-item">
                    <img
                        // src="/baby-keyboard/images/alipay.png"
                        src={`${import.meta.env.BASE_URL}images/alipay.png`}
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
