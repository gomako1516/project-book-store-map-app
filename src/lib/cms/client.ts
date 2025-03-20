import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN || "", // ドメインを指定
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "", // APIキーを指定
});