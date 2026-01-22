import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="min-h-screen bg-sand-50 selection:bg-clay-200">
        <Outlet />
      </div>
    </>
  );
}
