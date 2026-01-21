import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { Menu } from '../components/Menu'
import { devotionalContent } from '../data/devotionalContent'

export const Route = createFileRoute('/mark/$chapterId/$verseId')({
    component: ChapterVerseComponent,
    loader: ({ params }) => {
        const chapterId = parseInt(params.chapterId, 10)
        const verseId = parseInt(params.verseId, 10)

        const chapterData = devotionalContent.find(d => d.chapter === chapterId && d.verse === verseId)

        if (!chapterData) throw new Error('Content not found')

        return { chapterData, chapterId, verseId }
    },
})

function ChapterVerseComponent() {
    const { chapterData, chapterId, verseId } = Route.useLoaderData()

    // Calculate next chapter/verse logic
    // For now, simpler logic: just go to next chapter (which has a specific default verse)
    // Or find the next entry in the array
    const currentIndex = devotionalContent.findIndex(d => d.chapter === chapterId && d.verse === verseId)
    const nextIndex = (currentIndex + 1) % devotionalContent.length
    const nextContent = devotionalContent[nextIndex]

    return (
        <>
            <Menu currentChapter={chapterId} />
            <Layout
                data={chapterData}
                nextChapterId={nextContent.chapter}
                nextVerseId={nextContent.verse}
            />
        </>
    )
}
