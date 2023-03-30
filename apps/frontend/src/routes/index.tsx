import { RootRoute, Route, Router } from "@tanstack/router";
import Root from "../Root";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>Home</div>,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <div>About</div>,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}

export { rootRoute, router };
