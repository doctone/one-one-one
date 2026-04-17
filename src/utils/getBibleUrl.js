export function getBibleUrl(book, chapter, verse) {
    const reference = `${book}+${chapter}:${verse}`
    return `https://www.biblegateway.com/passage/?search=${reference}&version=NIV`
}