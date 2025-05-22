import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(filePath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${url}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  // 1. 获取英文名和代码
  const enJson = await download('https://flagcdn.com/en/codes.json');
  const enData = JSON.parse(enJson);

  // 2. 获取中文名
  const zhJson = await download('https://flagcdn.com/zh/codes.json');
  const zhData = JSON.parse(zhJson);

  // 3. 合并数据
  const countries = Object.entries(enData).map(([code, en]) => ({
    code,
    en,
    zh: zhData[code] || en // 没有中文名时用英文名
  }));

  // 4. 下载所有国旗图片
  const flagsDir = path.join(__dirname, '../public/images/flags');
  if (!fs.existsSync(flagsDir)) fs.mkdirSync(flagsDir, { recursive: true });

  for (const country of countries) {
    const fileName = country.en.toLowerCase().replace(/\s+/g, '-');
    const filePath = path.join(flagsDir, `${fileName}.png`);
    const url = `https://flagcdn.com/w1280/${country.code}.png`;
    if (!fs.existsSync(filePath)) {
      try {
        await downloadImage(url, filePath);
        console.log(`Downloaded: ${country.en}`);
      } catch (e) {
        console.warn(`Failed: ${country.en} (${country.code})`);
      }
    }
  }

  // 5. 生成 countries.ts
  const countriesData = countries.map(country => ({
    word: country.en,
    chinese: country.zh,
    image: `images/flags/${country.en.toLowerCase().replace(/\s+/g, '-')}.png`,
    category: 'flags'
  }));

  fs.writeFileSync(
    path.join(__dirname, '../src/components/countries.ts'),
    `export const countries = ${JSON.stringify(countriesData, null, 2)};`
  );
}

main(); 