import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        const lastPath = localStorage.getItem('one-one-one-last-path')
        // Validate path format: /mark/1/15
        const validPathRegex = /^\/mark\/\d+\/\d+$/
        if (lastPath && validPathRegex.test(lastPath)) {
            throw redirect({ to: lastPath })
        }
        throw redirect({ to: '/mark/1/15' })
    },
})
