import { createFileRoute, redirect } from '@tanstack/react-router'
import { getDevotionalContent } from '../services/googleSheets'

export const Route = createFileRoute('/')({
    loader: async () => {
        const devotionalContent = await getDevotionalContent()
        const first = devotionalContent[0]

        if (!first) {
            return null
        }

        throw redirect({
            to: '/bible/$book/$chapterId/$verseId',
            params: {
                book: first.book,
                chapterId: first.chapter,
                verseId: first.verse,
            },
        })
    },
})
