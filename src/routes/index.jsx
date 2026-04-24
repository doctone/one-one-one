import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getDevotionalContent } from '../services/googleSheets'
import { getLastViewedPage } from '../utils/lastViewedPage'

export const Route = createFileRoute('/')({
    component: IndexRoute,
    loader: async () => {
        const devotionalContent = await getDevotionalContent()
        const first = devotionalContent[0]

        return first ?? null
    },
})

function IndexRoute() {
    const first = Route.useLoaderData()
    const navigate = useNavigate()

    useEffect(() => {
        const lastViewedPage = getLastViewedPage()

        if (lastViewedPage) {
            navigate({ to: lastViewedPage, replace: true })
            return
        }

        if (!first) {
            return
        }

        navigate({
            to: '/bible/$book/$chapterId/$verseId',
            params: {
                book: first.book,
                chapterId: first.chapter,
                verseId: first.verse,
            },
            replace: true,
        })
    }, [first, navigate])

    return null
}
