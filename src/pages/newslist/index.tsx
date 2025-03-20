import { useAuthContext } from "@/context/AuthContext";
import { client } from "@/lib/cms/client";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type News = {
  id: string;
  title: string;
  publishedAt: string;
};

// SSG
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "news" });
  console.log(data);

  return {
    props: {
      news: data.contents,
    },
  };
};

export default function Home({ news }: { news: News[] }) {
  return (
    <section>
      <h2 className="c-heading">お知らせ</h2>
      <ul className="p-newsList">
        {news.map((newsItem) => (
          <li key={newsItem.id} className="p-newsItem">
            <p className="p-newsItem__date">
              <time dateTime={newsItem.publishedAt}>{new Date(newsItem.publishedAt).toLocaleDateString()}</time>
            </p>
            <p className="p-newsItem__title">
              <Link href={`news/${newsItem.id}`} className="p-newsItem__link">
                {newsItem.title}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
