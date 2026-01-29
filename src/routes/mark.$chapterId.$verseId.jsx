import { createFileRoute, redirect } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { Menu } from '../components/Menu'
import { getDevotionalContent } from '../services/googleSheets'
import { DevotionalContext } from '../context/DevotionalContext'

export const Route = createFileRoute('/mark/$chapterId/$verseId')({
    component: ChapterVerseComponent,
    loader: async ({ params }) => {
        const chapterId = parseInt(params.chapterId, 10)
        const verseId = parseInt(params.verseId, 10)

        const devotionalContent = await getDevotionalContent()
        const chapterData = devotionalContent.find(d => d.chapter === chapterId && d.verse === verseId)

        if (!chapterData) {
            // Redirect to first devotional instead of throwing error
            throw redirect({ to: '/mark/1/1', replace: true })
        }

        // Calculate next chapter/verse
        const currentIndex = devotionalContent.findIndex(d => d.chapter === chapterId && d.verse === verseId)
        const nextIndex = (currentIndex + 1) % devotionalContent.length
        const nextContent = devotionalContent[nextIndex]

        return { chapterData, chapterId, verseId, devotionalContent, nextContent }
    },
})

function ChapterVerseComponent() {
    const { chapterData, chapterId, verseId, devotionalContent, nextContent } = Route.useLoaderData()

    return (
        <DevotionalContext.Provider value={devotionalContent}>
            <Menu currentChapter={chapterId} currentVerse={verseId} />
            <Layout
                data={chapterData}
                nextChapterId={nextContent.chapter}
                nextVerseId={nextContent.verse}
            />
        </DevotionalContext.Provider>
    )
}
