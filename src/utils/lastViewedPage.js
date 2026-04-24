const STORAGE_KEY = 'devotional-last-viewed-page'

export function getLastViewedPage() {
    if (typeof window === 'undefined') {
        return null
    }

    return localStorage.getItem(STORAGE_KEY)
}

export function setLastViewedPage(path) {
    if (typeof window === 'undefined' || !path) {
        return
    }

    localStorage.setItem(STORAGE_KEY, path)
}
