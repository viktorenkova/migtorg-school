import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "./env.js";

const hasStorageConfig =
  Boolean(env.s3Bucket) &&
  Boolean(env.s3AccessKeyId) &&
  Boolean(env.s3SecretAccessKey);

const client = hasStorageConfig
  ? new S3Client({
      region: env.s3Region,
      endpoint: env.s3Endpoint || undefined,
      forcePathStyle: Boolean(env.s3Endpoint),
      credentials: {
        accessKeyId: env.s3AccessKeyId,
        secretAccessKey: env.s3SecretAccessKey
      }
    })
  : null;

export async function getSignedObjectUrl(objectKey: string) {
  if (!client || !env.s3Bucket) {
    return null;
  }

  const expiresIn = 60 * 10;
  const command = new GetObjectCommand({
    Bucket: env.s3Bucket,
    Key: objectKey
  });

  return {
    url: await getSignedUrl(client, command, { expiresIn }),
    expiresIn
  };
}
