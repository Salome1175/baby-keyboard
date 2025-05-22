import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pexels API key - 请替换成你的 API key
const PEXELS_API_KEY = 'YOUR_API_KEY';

const vehicles = [
  { word: 'car', chinese: '汽车', search: 'car vehicle' },
  { word: 'bus', chinese: '公交车', search: 'bus vehicle' },
  { word: 'train', chinese: '火车', search: 'train vehicle' },
  { word: 'airplane', chinese: '飞机', search: 'airplane' },
  { word: 'bicycle', chinese: '自行车', search: 'bicycle' },
  { word: 'motorcycle', chinese: '摩托车', search: 'motorcycle' },
  { word: 'boat', chinese: '船', search: 'boat' },
  { word: 'helicopter', chinese: '直升机', search: 'helicopter' },
  { word: 'truck', chinese: '卡车', search: 'truck vehicle' },
  { word: 'subway', chinese: '地铁', search: 'subway train' },
  { word: 'taxi', chinese: '出租车', search: 'taxi car' },
  { word: 'ambulance', chinese: '救护车', search: 'ambulance vehicle' },
  { word: 'fire truck', chinese: '消防车', search: 'fire truck' },
  { word: 'police car', chinese: '警车', search: 'police car' },
  { word: 'school bus', chinese: '校车', search: 'school bus' }
];

function download(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
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
  // 创建图片目录
  const imagesDir = path.join(__dirname, '../public/images/vehicles');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // 下载每个交通工具的图片
  for (const vehicle of vehicles) {
    const fileName = vehicle.word.toLowerCase().replace(/\s+/g, '-');
    const filePath = path.join(imagesDir, `${fileName}.png`);
    
    if (!fs.existsSync(filePath)) {
      try {
        // 从 Pexels 搜索图片
        const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(vehicle.search)}&per_page=1`;
        const response = await download(searchUrl, {
          'Authorization': PEXELS_API_KEY
        });
        const data = JSON.parse(response);
        
        if (data.photos && data.photos.length > 0) {
          const imageUrl = data.photos[0].src.large;
          await downloadImage(imageUrl, filePath);
          console.log(`Downloaded: ${vehicle.word}`);
          
          // 等待一秒，避免请求过快
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          console.warn(`No image found for: ${vehicle.word}`);
        }
      } catch (e) {
        console.warn(`Failed to download ${vehicle.word}:`, e.message);
      }
    }
  }

  // 生成 vehicles.ts 数据文件
  const vehiclesData = vehicles.map(vehicle => ({
    word: vehicle.word,
    chinese: vehicle.chinese,
    image: `images/vehicles/${vehicle.word.toLowerCase().replace(/\s+/g, '-')}.png`,
    category: 'vehicles'
  }));

  fs.writeFileSync(
    path.join(__dirname, '../src/components/vehicles.ts'),
    `export const vehicles = ${JSON.stringify(vehiclesData, null, 2)};`
  );
}

main(); 