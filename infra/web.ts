import { config } from "../config";

export const frontend = new sst.aws.StaticSite("Frontend", {
  path: "packages/frontend",
  build: {
    output: "build/client",
    command: "pnpm build",
  },
  indexPage: "index.html",
  domain:
  $app.stage === "production"
    ? {
        name: config.domain,
        redirects: [`www.${config.domain}`],
      }
    : undefined,
});
