import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  
  return (
    <Html lang="ja">
      <Head>
        {/* Google Maps JavaScript APIのスクリプトを動的に追加 */}
        {googleMapsApiKey && (
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`}
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
