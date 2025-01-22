export const frontend = new sst.aws.StaticSite("Frontend", {
  path: "packages/frontend",
  build: {
    output: "build",
    command: "pnpm build",
  },
  // domain: {
  //   name: "cvrsnap.com",
  //   redirects: ["www.cvrsnap.com"],
  // },
});
