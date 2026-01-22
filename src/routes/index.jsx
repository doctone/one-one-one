import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        // Always redirect to the first devotional
        throw redirect({ to: '/mark/1/1' })
    },
})
