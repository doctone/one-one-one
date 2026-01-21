import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Menu } from '../components/Menu'
import { useEffect } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const location = useLocation()

    // Persist current location to localStorage (simple persistence)
    // We can also do this in individual routes, but global is easy for "resume where I left off"
    useEffect(() => {
        if (location.pathname.startsWith('/mark/')) {
            localStorage.setItem('one-one-one-last-path', location.pathname)
        }
    }, [location.pathname])

    return (
        <>
            <div className="min-h-screen bg-sand-50 selection:bg-clay-200">
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </>
    )
}
