import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/mark/$chapterId/$verseId')({
    beforeLoad: ({ params }) => {
        throw redirect({
            to: '/bible/$book/$chapterId/$verseId',
            params: {
                book: 'Mark',
                chapterId: params.chapterId,
                verseId: params.verseId,
            },
            replace: true,
        })
    },
})
