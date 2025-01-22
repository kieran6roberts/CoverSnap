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
        name: "cvrsnap.com",
        redirects: ["www.cvrsnap.com"],
      }
    : undefined,
});
