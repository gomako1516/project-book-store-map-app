import { client } from "@/lib/cms/client";
import styles from "./News.module.scss";

type News = {
  id: string;
  title: string;
  publishedAt: string;
  content: string;
};

// idに基づいたデータを取得
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id; // URLパラメータのidを取得
  const data = await client.get({ endpoint: "news", contentId: id }); // idに基づいたデータ取得

  return {
    props: {
      news: data,
    },
  };
};

// SSGの対象パスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "news" });

  const paths = data.contents.map((content: News) => `/news/${content.id}`); // SSGの対象パスを指定
  return {
    paths,
    fallback: false, // 設定されていないパスの場合は404ページを表示
  };
};

export default function NewsId({ news }: { news: News }) {
  const date = new Date(news.publishedAt).toLocaleDateString();

  return (
    <main>
      <article className={styles.news__article}>
        <p className={styles.news__date}>
          <time dateTime={news.publishedAt}>{date}</time>
        </p>
        <h1 className={styles.news__title}>{news.title}</h1>
        <div className={styles.news__content} dangerouslySetInnerHTML={{ __html: `${news.content}` }}></div>
      </article>
    </main>
  );
}
