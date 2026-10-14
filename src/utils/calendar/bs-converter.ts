/**
 * Bikram Sambat (BS) ↔ Gregorian (AD) conversion engine.
 *
 * The lookup table contains the number of days in each BS month for years
 * 2000–2090 BS. The reference epoch is BS 2000 Baisakh 1 = AD 1943 April 14.
 *
 * Data sourced from the official Nepali calendar (Patro) records.
 */

// Days in each month for BS years 2000–2090
// Index 0 = Baisakh, 11 = Chaitra
const BS_MONTH_DATA: Record<number, number[]> = {
  2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2047: [31, 31, 31, 32, 31, 31, 30, 29, 29, 30, 30, 30],
  2048: [29, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2049: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2050: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2051: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2052: [31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 30, 30],
  2053: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2054: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2055: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2056: [31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 30, 30],
  2057: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2058: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2059: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2060: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2061: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2062: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2063: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2064: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2065: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2066: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2067: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2068: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2069: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2070: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2071: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2072: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2073: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2074: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2075: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2076: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2077: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2078: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2079: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2080: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2083: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2084: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2085: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2086: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2087: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2088: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2089: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2090: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
};

export const BS_MONTH_NAMES = [
  "Baisakh",
  "Jestha",
  "Ashadh",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

const BS_DAY_NAMES = [
  "Aaitabar",   // Sunday
  "Sombar",     // Monday
  "Mangalbar",  // Tuesday
  "Budhabar",   // Wednesday
  "Bihibar",    // Thursday
  "Sukrabar",   // Friday
  "Shanibar",   // Saturday
];

/** Epoch: BS 2000 Baisakh 1 = AD 1943 April 14 */
const EPOCH_AD = new Date(1943, 3, 14); // months are 0-indexed
const EPOCH_BS_YEAR = 2000;
const EPOCH_BS_MONTH = 1; // Baisakh
const EPOCH_BS_DAY = 1;

function daysBetween(a: Date, b: Date): number {
  const msPerDay = 86400000;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}

/** Convert an AD Date to a BS date object. */
export function adToBs(adDate: Date): {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
} {
  let totalDays = daysBetween(EPOCH_AD, adDate);

  let bsYear = EPOCH_BS_YEAR;
  let bsMonth = EPOCH_BS_MONTH;
  let bsDay = EPOCH_BS_DAY;

  // Advance through BS years
  while (true) {
    const monthData = BS_MONTH_DATA[bsYear];
    if (!monthData) break;

    const daysInYear = monthData.reduce((s, d) => s + d, 0);
    if (totalDays < daysInYear) break;

    totalDays -= daysInYear;
    bsYear++;
  }

  // Advance through BS months in the current year
  const monthData = BS_MONTH_DATA[bsYear] ?? BS_MONTH_DATA[2083]!;
  for (let m = 0; m < 12; m++) {
    const daysInMonth = monthData[m]!;
    if (totalDays < daysInMonth) {
      bsMonth = m + 1;
      bsDay = totalDays + 1;
      break;
    }
    totalDays -= daysInMonth;
  }

  return {
    year: bsYear,
    month: bsMonth,
    day: bsDay,
    monthName: BS_MONTH_NAMES[bsMonth - 1] ?? "",
    dayName: BS_DAY_NAMES[adDate.getDay()] ?? "",
  };
}

/** Convert BS year/month/day to a formatted AD date string. */
export function convertBsToAd(
  bsYear: number,
  bsMonth: number,
  bsDay: number,
): string {
  // Count total days from epoch to the given BS date
  let totalDays = 0;

  for (let y = EPOCH_BS_YEAR; y < bsYear; y++) {
    const data = BS_MONTH_DATA[y];
    if (!data) break;
    totalDays += data.reduce((s, d) => s + d, 0);
  }

  const yearData = BS_MONTH_DATA[bsYear] ?? BS_MONTH_DATA[2083]!;
  for (let m = 0; m < bsMonth - 1; m++) {
    totalDays += yearData[m] ?? 0;
  }
  totalDays += bsDay - 1;

  const adDate = new Date(EPOCH_AD.getTime() + totalDays * 86400000);

  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    adDate,
  );
}

/** Approximate Tithi (lunar day) name based on day offset. */
function getTithi(adDate: Date): string {
  // Reference new moon: Jan 1, 2000
  const refNewMoon = new Date(2000, 0, 1);
  const lunarDay = Math.floor(daysBetween(refNewMoon, adDate) % 30);
  const paksha = lunarDay < 15 ? "Shukla" : "Krishna";
  const tithiNum = (lunarDay % 15) + 1;
  return `${paksha} Paksha, Tithi ${tithiNum}`;
}

export interface LiveBsDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  tithi: string;
}

/**
 * Returns the current date in Bikram Sambat, adjusted for Nepal's
 * UTC+5:45 timezone.
 */
export function getLiveBsDate(): LiveBsDate {
  // Nepal is UTC+5:45
  const nowUtc = new Date();
  const nepalOffsetMs = (5 * 60 + 45) * 60 * 1000;
  const nepalNow = new Date(nowUtc.getTime() + nepalOffsetMs);

  // Normalise to midnight so adToBs doesn't drift
  const nepalDate = new Date(
    nepalNow.getUTCFullYear(),
    nepalNow.getUTCMonth(),
    nepalNow.getUTCDate(),
  );

  const bs = adToBs(nepalDate);

  return {
    ...bs,
    tithi: getTithi(nepalDate),
  };
}
