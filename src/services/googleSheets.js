const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const SHEET_NAME = 'devotional-content'; // Adjust if your sheet has a different name

/**
 * Fetches devotional content from Google Sheets
 * @returns {Promise<Array>} Array of devotional content objects
 */
export async function fetchDevotionalContent() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
  }

  const data = await response.json();
  return parseSheetData(data.values);
}

/**
 * Parses raw sheet data into devotional content objects
 * @param {Array<Array<string>>} rows - Raw rows from the sheet (first row is headers)
 * @returns {Array} Parsed devotional content
 */
function parseSheetData(rows) {
  if (!rows || rows.length < 2) {
    return [];
  }

  const [headers, ...dataRows] = rows;

  // Create a map of header names to indices
  const headerIndex = {};
  headers.forEach((header, index) => {
    headerIndex[header.toLowerCase().trim()] = index;
  });

  return dataRows.map((row, index) => {
    const getValue = (key) => {
      const idx = headerIndex[key.toLowerCase()];
      return idx !== undefined ? row[idx] || '' : '';
    };

    return {
      id: parseInt(getValue('id'), 10) || index + 1,
      chapter: parseInt(getValue('chapter'), 10),
      verse: parseInt(getValue('verse'), 10),
      verseText: getValue('versetext') || getValue('verseText'),
      verseRef: getValue('verseref') || getValue('verseRef'),
      extraVerse: getValue('extraverse') || getValue('extraVerse') || undefined,
      question: getValue('question'),
      extraQuestion: getValue('extraquestion') || getValue('extraQuestion') || undefined,
      prayer: getValue('prayer'),
    };
  }).filter(item => item.chapter && item.verse); // Filter out invalid rows
}

// Cache for the fetched data
let cachedContent = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches devotional content with caching
 * @param {boolean} forceRefresh - Force a refresh of the cache
 * @returns {Promise<Array>} Array of devotional content objects
 */
export async function getDevotionalContent(forceRefresh = false) {
  const now = Date.now();

  if (
    !forceRefresh &&
    cachedContent &&
    cacheTimestamp &&
    now - cacheTimestamp < CACHE_DURATION
  ) {
    return cachedContent;
  }

  cachedContent = await fetchDevotionalContent();
  cacheTimestamp = now;
  return cachedContent;
}
