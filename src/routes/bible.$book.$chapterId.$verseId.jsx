import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Layout } from '../components/Layout'
import { Menu } from '../components/Menu'
import { getDevotionalContent } from '../services/googleSheets'
import { DevotionalContext } from '../context/DevotionalContext'
import { setLastViewedPage } from '../utils/lastViewedPage'

const normalizeBook = (value) => {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
}

export const Route = createFileRoute('/bible/$book/$chapterId/$verseId')({
    component: ChapterVerseComponent,
    loader: async ({ params }) => {
        const chapterId = parseInt(params.chapterId, 10)
        const verseId = parseInt(params.verseId, 10)
        const bookParam = normalizeBook(params.book)

        const devotionalContent = await getDevotionalContent()
        const bookContent = devotionalContent.filter(
            (d) => normalizeBook(d.book) === bookParam,
        )
        const scopedContent = bookContent.length ? bookContent : devotionalContent

        const chapterData = scopedContent.find(
            (d) => d.chapter === chapterId && d.verse === verseId,
        )

        if (!chapterData) {
            const first = scopedContent[0]
            if (first) {
                throw redirect({
                    to: '/bible/$book/$chapterId/$verseId',
                    params: {
                        book: first.book,
                        chapterId: first.chapter,
                        verseId: first.verse,
                    },
                    replace: true,
                })
            }
        }

        const currentIndex = scopedContent.findIndex(
            (d) => d.chapter === chapterId && d.verse === verseId,
        )
        const safeIndex = currentIndex === -1 ? 0 : currentIndex
        const nextIndex = (safeIndex + 1) % scopedContent.length
        const nextContent = scopedContent[nextIndex]

        return { chapterData, chapterId, verseId, devotionalContent, nextContent }
    },
})

function ChapterVerseComponent() {
    const { chapterData, chapterId, verseId, devotionalContent, nextContent } =
        Route.useLoaderData()

    useEffect(() => {
        if (!chapterData) {
            return
        }

        setLastViewedPage(
            `/bible/${encodeURIComponent(chapterData.book)}/${chapterId}/${verseId}`,
        )
    }, [chapterData, chapterId, verseId])

    if (!chapterData) {
        return null
    }

    return (
        <DevotionalContext.Provider value={devotionalContent}>
            <Menu
                currentBook={chapterData.book}
                currentChapter={chapterId}
                currentVerse={verseId}
            />
            <Layout
                data={chapterData}
                nextBook={nextContent.book}
                nextChapterId={nextContent.chapter}
                nextVerseId={nextContent.verse}
            />
        </DevotionalContext.Provider>
    )
}
