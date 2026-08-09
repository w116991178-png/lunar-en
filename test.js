// 当前项目与依赖包同名，直接按包名加载时 Node 会优先解析当前项目。
// 显式从 node_modules 加载，使本文件无需先构建 dist 即可直接运行。
const { I18n, Solar } = require('./node_modules/lunar-typescript');

I18n.setLanguage('en');

const festivalTranslations = {
  '五谷母节': 'Mother of Grains Festival',
};

function ordinal(number) {
  const remainder = number % 100;
  if (remainder >= 11 && remainder <= 13) return `${number}th`;
  return `${number}${{ 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] || 'th'}`;
}

function formatLunarSummary(lunar) {
  const lunarMonth = lunar.getMonth();
  const ganzhiYear = lunar.getYearInGanZhi().replace(/([a-z])([A-Z])/g, '$1-$2');
  const festivals = [...lunar.getFestivals(), ...lunar.getOtherFestivals()]
    .map((name) => festivalTranslations[name] || name);
  const parts = [
    `${lunarMonth < 0 ? 'Leap ' : ''}${ordinal(Math.abs(lunarMonth))} Lunar Month, ${ordinal(lunar.getDay())} Day`,
    `${ganzhiYear} (${lunar.getYearShengXiao()}) Year`,
    lunar.getWeekInChinese(),
  ];

  if (festivals.length) parts.push(`Traditional Festival: ${[...new Set(festivals)].join(', ')}`);
  if (lunar.getJieQi()) parts.push(`Solar Term: ${lunar.getJieQi()}`);
  return parts.join(' · ');
}

// 测试2026立秋
const date = Solar.fromYmd(2026, 8, 7);
const lunar = date.getLunar();
console.log('Gregorian Date:', `${date.toYmd()} · ${lunar.getWeekInChinese()}`);
console.log('Lunar Date:', formatLunarSummary(lunar));
console.log('Solar Term:', lunar.getJieQi() || 'No solar term on this date');
