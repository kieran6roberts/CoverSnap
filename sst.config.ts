/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cvrsnap",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "eu-west-1",
        }
      }
    };
  },
  async run() {
    const storage = await import("./infra/storage");
    await import("./infra/web");

    return {
      imagesBucket: storage.imagesBucket.name,
    };
  },
});
