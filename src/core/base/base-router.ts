import { IRouter, RequestHandler, Router } from "express";

type Middleware = RequestHandler;

abstract class BaseRouter {
  protected router: IRouter;

  constructor() {
    this.router = Router();
  }

  useMiddlewares(middlewares: Middleware[] = []): void {
    middlewares.forEach((middleware) => {
      this.router.use(middleware);
    });
  }

  abstract setupRoutes(): void;

  getRouter(): IRouter {
    return this.router;
  }
}

export { BaseRouter };
