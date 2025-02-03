export const imagesBucket = new sst.aws.Bucket("images", {
 access: "cloudfront",
 versioning: true,
 cors: {
  allowHeaders: ["*"],
  allowOrigins: ["*"],
  allowMethods: ["DELETE", "GET", "HEAD", "POST", "PUT"],
  exposeHeaders: [],
  maxAge: "0 seconds"
}
});