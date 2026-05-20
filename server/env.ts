export const env = {
  apiHost: process.env.API_HOST ?? "127.0.0.1",
  apiPort: Number(process.env.API_PORT ?? "4000"),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://127.0.0.1:5173",
  cookieSecret: process.env.COOKIE_SECRET ?? "dev-cookie-secret-change-me",
  cookieSecure: process.env.COOKIE_SECURE === "true",
  s3Region: process.env.S3_REGION ?? "ru-central1",
  s3Endpoint: process.env.S3_ENDPOINT ?? "",
  s3Bucket: process.env.S3_BUCKET ?? "",
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? ""
};
