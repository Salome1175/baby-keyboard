import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const countries = [
    { code: 'cn', name: 'China', chinese: '中国' },
    { code: 'us', name: 'United States', chinese: '美国' },
    { code: 'gb', name: 'United Kingdom', chinese: '英国' },
    { code: 'jp', name: 'Japan', chinese: '日本' },
    { code: 'kr', name: 'South Korea', chinese: '韩国' },
    { code: 'fr', name: 'France', chinese: '法国' },
    { code: 'de', name: 'Germany', chinese: '德国' },
    { code: 'it', name: 'Italy', chinese: '意大利' },
    { code: 'es', name: 'Spain', chinese: '西班牙' },
    { code: 'ru', name: 'Russia', chinese: '俄罗斯' },
    { code: 'ca', name: 'Canada', chinese: '加拿大' },
    { code: 'au', name: 'Australia', chinese: '澳大利亚' },
    { code: 'br', name: 'Brazil', chinese: '巴西' },
    { code: 'in', name: 'India', chinese: '印度' },
    { code: 'mx', name: 'Mexico', chinese: '墨西哥' },
    { code: 'sg', name: 'Singapore', chinese: '新加坡' },
    { code: 'nl', name: 'Netherlands', chinese: '荷兰' },
    { code: 'se', name: 'Sweden', chinese: '瑞典' },
    { code: 'ch', name: 'Switzerland', chinese: '瑞士' },
    { code: 'no', name: 'Norway', chinese: '挪威' }
];

const downloadFlag = (country) => {
    const url = `https://flagcdn.com/w1280/${country.code}.png`;
    const fileName = country.name.toLowerCase().replace(/\s+/g, '-');
    const filePath = path.join(__dirname, '../public/images/flags', `${fileName}.png`);

    https.get(url, (response) => {
        if (response.statusCode === 200) {
            const file = fs.createWriteStream(filePath);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded flag for ${country.name}`);
            });
        } else {
            console.error(`Failed to download flag for ${country.name}`);
        }
    }).on('error', (err) => {
        console.error(`Error downloading flag for ${country.name}:`, err.message);
    });
};

// Create flags directory if it doesn't exist
const flagsDir = path.join(__dirname, '../public/images/flags');
if (!fs.existsSync(flagsDir)) {
    fs.mkdirSync(flagsDir, { recursive: true });
}

// Download all flags
countries.forEach(downloadFlag);

// Generate countries data file
const countriesData = countries.map(country => ({
    word: country.name,
    chinese: country.chinese,
    image: `images/flags/${country.code}.png`,
    category: 'flags'
}));

fs.writeFileSync(
    path.join(__dirname, '../src/components/countries.ts'),
    `export const countries = ${JSON.stringify(countriesData, null, 2)};`
); 