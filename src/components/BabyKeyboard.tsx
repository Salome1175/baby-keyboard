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
export const wordMap: Record<string, { word: string; chinese: string; image: string; audio?: string; category: string }[]> =
    Object.fromEntries(
        Object.entries(wordList).map(([key, entries]) => [
          key,
          entries.map(({ word, chinese, category }) => ({
            word: word.charAt(0).toUpperCase() + word.slice(1),
            chinese: chinese,
            image: category === 'flags' 
              ? `images/flags/${word.toLowerCase().replace(/\s+/g, '-')}.png`
              : `images/${word.toLowerCase()}.png`,
            audio: `sounds/${word.toLowerCase()}.mp3`,
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

  //中文
  const [currentChinese, setCurrentChinese] = useState<string>("苹果");

  //语言状态
  // const [speakLanguage, setSpeakLanguage] = useState<"en" | "zh">("en");

  //新增分类选项区域
  const selectedCategoriesRef = useRef<string[]>(["all"]);
  const [selectedCategories, _setSelectedCategories] = useState<string[]>(["all"]);

  //解决小孩疯狂敲键导致声音混乱问题
  const lastKeyTimeRef = useRef(0);

  //维护一个 indexMap，记录每个字母目前到了第几个单词
  const indexMapRef = useRef<Record<string, number>>({});

  //下拉category选相框
  const [showCategories, setShowCategories] = useState(false);

  //语言状态
  const [speakLanguage, setSpeakLanguage] = useState<"en" | "zh">("en");
  const speakLanguageRef = useRef<"en" | "zh">("en");

  //当切换语言时，一起更新 ref
  const toggleLanguage = () => {
    setSpeakLanguage(prev => {
      const newLang = prev === "en" ? "zh" : "en";
      speakLanguageRef.current = newLang;
      return newLang;
    });
  };

  //分类标签中英文
  const categoryLabels = [
    { id: 'all', en: 'All', zh: '全部' },
    { id: 'vegetables', en: 'Vegetables', zh: '蔬菜' },
    { id: 'animals', en: 'Animals', zh: '动物' },
    { id: 'fruits', en: 'Fruits', zh: '水果' },
    { id: 'colors', en: 'Colors', zh: '颜色' },
    { id: 'objects', en: 'Objects', zh: '物品' },
    { id: 'vehicles', en: 'Vehicles', zh: '交通工具' },
    { id: 'numbers', en: 'Numbers', zh: '数字' },
    { id: 'flags', en: 'Flags', zh: '国旗' },
    { id: 'jobs', en: 'Jobs', zh: '职业' },
    { id: 'musical', en: 'Musical', zh: '乐器' },
    { id: 'others', en: 'Others', zh: '其他' }
  ];
  const categoryIds = categoryLabels.map(c => c.id).filter(id => id !== 'all');

  const toggleCategory = (category: string) => {
    if (category === "all") {
      if (selectedCategoriesRef.current.length === categoryIds.length) {
        // 已全选，再点all则全部取消
        selectedCategoriesRef.current = [];
        _setSelectedCategories([]);
      } else {
        // 选中all时全选
        selectedCategoriesRef.current = [...categoryIds];
        _setSelectedCategories([...categoryIds]);
      }
    } else {
      _setSelectedCategories(prev => {
        let newSelected;
        if (prev.includes(category)) {
          newSelected = prev.filter(c => c !== category);
        } else {
          newSelected = [...prev, category];
        }
        // 如果全选了，自动高亮all
        if (newSelected.length === categoryIds.length) {
          selectedCategoriesRef.current = [...categoryIds];
          return [...categoryIds];
        }
        selectedCategoriesRef.current = newSelected;
        return newSelected;
      });
    }
  };

  //朗读时语言切换
  const speak = (textEn: string, textZh: string) => {
    window.speechSynthesis.cancel();

    const currentLang = speakLanguageRef.current; // 🔥 这里用ref拿最新的！

    console.log("🎯 当前切换语言：", currentLang);
    console.log("🔤 英文单词：", textEn);
    console.log("🀄 中文单词：", textZh);

    const baseFileName = currentLang === "en" ? textEn.toLowerCase() : encodeURIComponent(textZh);
    const audioPath = `${import.meta.env.BASE_URL}sounds/${currentLang === "en" ? "English" : "Chinese"}/${baseFileName}.mp3`;

    console.log("🎵 尝试播放的音频路径：", audioPath);

    const audio = new Audio(audioPath);

    audio.addEventListener('canplaythrough', () => {
      console.log("✅ 音频可以正常播放，开始播放！");
      audio.play().catch(e => console.warn('❌ 播放音频时失败: ', e));
    });

    audio.addEventListener('error', () => {
      console.warn("⚠️ 音频加载失败，准备fallback到系统朗读！");
      const utterance = new SpeechSynthesisUtterance(
          currentLang === "en" ? textEn : textZh
      );
      utterance.lang = currentLang === "en" ? "en-US" : "zh-CN";
      console.log("📢 使用TTS朗读：", utterance.text);
      window.speechSynthesis.speak(utterance);
    });

    audio.load();
  };

  //启动自动全屏
  useEffect(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, [])

  //Esc 键并"恢复全屏"
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

      // 调试输出
      console.log('当前按键:', key, '当前分类:', selectedCategoriesRef.current);
      console.log('wordMap[key]:', wordMap[key]);

      const fullList = wordMap[key] || wordMap['t'];
      const currentCategories = selectedCategoriesRef.current;
      const filteredList = fullList.filter(entry => {
        return currentCategories.includes("all") || currentCategories.includes(entry.category);
      });

      if (filteredList.length === 0) {
        console.log('过滤后无内容', { key, currentCategories, fullList });
        return;
      }

      const categoryKey = key + "-" + currentCategories.sort().join(",");
      let index = indexMapRef.current[categoryKey] || 0;
      const entry = filteredList[index % filteredList.length];
      indexMapRef.current[categoryKey] = index + 1;

      setCurrentWord(entry.word);
      setCurrentChinese(entry.chinese);
      setCurrentImage(`${import.meta.env.BASE_URL}${entry.image}`);
      //speak(entry.word, entry.chinese, entry.audio ? `${import.meta.env.BASE_URL}${entry.audio}` : undefined);
      speak(entry.word, entry.chinese);

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

  // 点击空白处收起分类面板
  useEffect(() => {
    if (!showCategories) return;
    const handleClick = (e: MouseEvent) => {
      const dropdown = document.querySelector('.category-dropdown');
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setShowCategories(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showCategories]);

  return (
      <div className="baby-keyboard">

        {/* 右上角操作区 */}
        <div className="top-right-bar-horizontal">
          <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(err => console.error(err));
                } else {
                  document.exitFullscreen().catch(err => console.error(err));
                }
              }}
              className="fullscreen-button-optimized"
          >
            切换全屏模式
          </button>
          <button
              onClick={toggleLanguage}
              className="language-button-icon-optimized"
          >
            切换朗读：{speakLanguage === "en" ? "英文" : "中文"}
          </button>
          <span className="exit-tip-optimized">同时按 <strong>Q</strong> 和 <strong>P</strong> 可退出游戏</span>
        </div>

        {/*单词分类下拉选相框*/}
        <div className="category-dropdown">
          <div className="category-header" onClick={() => setShowCategories(!showCategories)}>
            <span className="arrow">{showCategories ? "▼" : "▶"}</span>
            <span className="title">{speakLanguage === 'en' ? 'Category' : '分类'}</span>
          </div>
          {showCategories && (
            <div className="category-list">
              <div className="flex flex-col gap-2 mb-4">
                <button
                  key="all"
                  onClick={() => toggleCategory('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center
                    ${selectedCategories.length === categoryIds.length
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <span className="mr-2">{selectedCategories.length === categoryIds.length ? '✅' : '⭕️'}</span>
                  {speakLanguage === 'en' ? categoryLabels[0].en : categoryLabels[0].zh}
                </button>
                {categoryLabels.filter(c => c.id !== 'all').map(category => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center
                      ${selectedCategories.includes(category.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    <span className="mr-2">{selectedCategories.includes(category.id) ? '✅' : '⭕️'}</span>
                    {speakLanguage === 'en' ? category.en : category.zh}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/*<button onClick={() => setSpeakLanguage(speakLanguage === "en" ? "zh" : "en")}>*/}
        {/*  切换朗读：{speakLanguage === "en" ? "英文" : "中文"}*/}
        {/*</button>*/}


        {/*<div className="word-display">*/}
        {/*  {currentWord}       {currentChinese}*/}
        {/*</div>*/}

        <div className="text-4xl font-bold text-purple-600 animate-pulse">
          {currentWord} / {currentChinese}
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
