import { DateTime } from 'luxon';

interface EthiopianDate {
  year: number;
  month: number;
  day: number;
}

interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

const ETHIOPIAN_MONTHS = [
  'Meskerem', 'Tikimt', 'Hidar', 'Tahsas',
  'Tir', 'Yekatit', 'Megabit', 'Miazia',
  'Ginbot', 'Sene', 'Hamle', 'Nehase',
  'Pagume'
];

// Fixed date offset between Ethiopian and Gregorian calendars
const JD_EPOCH_OFFSET_AMETE_MIHRET = 1723856;
const JD_EPOCH_OFFSET_GREGORIAN = 1721426;

export const isEthiopianLeapYear = (year: number): boolean => {
  return year % 4 === 3 || year % 4 === 2;
};

export const isGregorianLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Convert Ethiopian date to Julian Day Number
const ethiopianToJDN = (year: number, month: number, day: number): number => {
  const jdn = JD_EPOCH_OFFSET_AMETE_MIHRET +
             365 * (year - 1) +
             Math.floor(year / 4) +
             30 * (month - 1) +
             day - 1;
  return jdn;
};

// Convert Julian Day Number to Ethiopian date
const jdnToEthiopian = (jdn: number): EthiopianDate => {
  const r = (jdn - JD_EPOCH_OFFSET_AMETE_MIHRET) % 1461;
  const n = (r % 365) + 365 * Math.floor(r / 1460);

  const year = 4 * Math.floor((jdn - JD_EPOCH_OFFSET_AMETE_MIHRET) / 1461) +
               Math.floor(r / 365) - Math.floor(r / 1460);
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;

  return { year, month, day };
};

// Convert Gregorian date to Julian Day Number
const gregorianToJDN = (year: number, month: number, day: number): number => {
  const a = Math.floor((14 - month) / 12);
  year = year + 4800 - a;
  month = month + 12 * a - 3;

  const jdn = day +
              Math.floor((153 * month + 2) / 5) +
              365 * year +
              Math.floor(year / 4) -
              Math.floor(year / 100) +
              Math.floor(year / 400) -
              32045;

  return jdn;
};

// Convert Julian Day Number to Gregorian date
const jdnToGregorian = (jdn: number): GregorianDate => {
  const j = jdn + 32044;
  const g = Math.floor(j / 146097);
  const dg = j % 146097;
  const c = Math.floor((Math.floor(dg / 36524) + 1) * 3 / 4);
  const dc = dg - c * 36524;
  const b = Math.floor(dc / 1461);
  const db = dc % 1461;
  const a = Math.floor((Math.floor(db / 365) + 1) * 3 / 4);
  const da = db - a * 365;
  const y = g * 400 + c * 100 + b * 4 + a;
  const m = Math.floor((da * 5 + 308) / 153) - 2;
  const d = da - Math.floor((m + 4) * 153 / 5) + 122;

  const year = y - 4800 + Math.floor((m + 2) / 12);
  const month = ((m + 2) % 12) + 1;
  const day = d + 1;

  return { year, month, day };
};

export const convertToEthiopian = (gcDate: GregorianDate): EthiopianDate => {
  // First convert Gregorian date to Julian Day Number
  const a = Math.floor((14 - gcDate.month) / 12);
  let y = gcDate.year + 4800 - a;
  let m = gcDate.month + 12 * a - 3;

  const jdn = gcDate.day +
              Math.floor((153 * m + 2) / 5) +
              365 * y +
              Math.floor(y / 4) -
              Math.floor(y / 100) +
              Math.floor(y / 400) -
              32045;

  // Then convert JDN to Ethiopian date
  const r = (jdn - JD_EPOCH_OFFSET_AMETE_MIHRET) % 1461;
  const n = (r % 365) + 365 * Math.floor(r / 1460);

  const year = 4 * Math.floor((jdn - JD_EPOCH_OFFSET_AMETE_MIHRET) / 1461) +
               Math.floor(r / 365) - Math.floor(r / 1460);
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;

  return { year, month, day };
};

export const convertToGregorian = (ecDate: EthiopianDate): GregorianDate => {
  let year = ecDate.year + 7;
  let month = ecDate.month;
  let day = ecDate.day;

  // Convert Ethiopian months to Gregorian
  if (month === 1) { // Meskerem
    month = 9;
    day += 10;
  } else if (month === 2) { // Tikimt
    month = 10;
    day += 10;
  } else if (month === 3) { // Hidar
    month = 11;
    day += 9;
  } else if (month === 4) { // Tahsas
    month = 12;
    day += 9;
  } else if (month === 5) { // Tir
    month = 1;
    year += 1;
    day += 8;
  } else if (month === 6) { // Yekatit
    month = 2;
    year += 1;
    day += 7;
  } else if (month === 7) { // Megabit
    month = 3;
    year += 1;
    day += 9;
  } else if (month === 8) { // Miazia
    month = 4;
    year += 1;
    day += 8;
  } else if (month === 9) { // Ginbot
    month = 5;
    year += 1;
    day += 8;
  } else if (month === 10) { // Sene
    month = 6;
    year += 1;
    day += 7;
  } else if (month === 11) { // Hamle
    month = 7;
    year += 1;
    day += 7;
  } else if (month === 12) { // Nehase
    month = 8;
    year += 1;
    day += 6;
  } else if (month === 13) { // Pagume
    month = 9;
    year += 1;
    day += 5;
  }

  // Handle month boundary cases
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isGregorianLeapYear(year)) {
    monthDays[1] = 29;
  }

  // Adjust if day exceeds month length
  while (day > monthDays[month - 1]) {
    day -= monthDays[month - 1];
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return { year, month, day };
};

export const getEthiopianMonthName = (month: number): string => {
  return ETHIOPIAN_MONTHS[month - 1] || '';
};

export const formatEthiopianDate = (date: EthiopianDate): string => {
  return `${getEthiopianMonthName(date.month)} ${date.day}, ${date.year} E.C`;
};

export const formatGregorianDate = (date: GregorianDate): string => {
  return DateTime.local(date.year, date.month, date.day).toFormat('MMMM d, yyyy G.C');
};

export const getCurrentEthiopianDate = (): EthiopianDate => {
  const now = DateTime.now();
  const currentGC = {
    year: now.year,
    month: now.month,
    day: now.day
  };
  return convertToEthiopian(currentGC);
};