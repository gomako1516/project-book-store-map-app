import styles from "./Top.module.scss";
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
  // const { user } = useAuthContext();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (user) {
  //       const docRef = doc(db, "users", user.uid);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         console.log("Document data:", docSnap.data().username);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     }
  //   };
  //   fetchUser();
  // }, [user]);

  return (
    <div>
      {/* <p>ユーザー名：{user?.uid}</p> */}

      <figure className={styles.fv}>
        <Image
          src="/img/top/img_fv.jpg"
          alt=""
          width={1920}
          height={1097}
        />
      </figure>

      <section className={styles.area}>
        <h2 className="c-heading">エリア一覧</h2>
        <ul className="p-areaList">
          <li className="p-areaItem">
            <Image
              src="/img/common/icon_pin.svg"
              alt=""
              width={32}
              height={32}
              className="p-areaItem__icon"
            />
            <p className="p-areaItem__name">大阪府</p>
            <div className="p-areaItem__links">
              <Link href={`/map?prefecture=大阪府&tagId=&keyword=`} className="map">マップで見る</Link>
              <Link href={`/list?prefecture=大阪府&tagId=&keyword=`} className="list">一覧で見る</Link>
            </div>
          </li>
          <li className="p-areaItem">
            <Image
              src="/img/common/icon_pin.svg"
              alt=""
              width={32}
              height={32}
              className="p-areaItem__icon"
            />
            <p className="p-areaItem__name">京都府</p>
            <div className="p-areaItem__links">
              <Link href={`/map?prefecture=京都府&tagId=&keyword=`} className="map">マップで見る</Link>
              <Link href={`/list?prefecture=京都府&tagId=&keyword=`} className="list">一覧で見る</Link>
            </div>
          </li>
          <li className="p-areaItem">
            <Image
              src="/img/common/icon_pin.svg"
              alt=""
              width={32}
              height={32}
              className="p-areaItem__icon"
            />
            <p className="p-areaItem__name">兵庫県</p>
            <div className="p-areaItem__links">
              <Link href={`/map?prefecture=兵庫県&tagId=&keyword=`} className="map">マップで見る</Link>
              <Link href={`/list?prefecture=兵庫県&tagId=&keyword=`} className="list">一覧で見る</Link>
            </div>
          </li>
          <li className="p-areaItem">
            <Image
              src="/img/common/icon_pin.svg"
              alt=""
              width={32}
              height={32}
              className="p-areaItem__icon"
            />
            <p className="p-areaItem__name">奈良県</p>
            <div className="p-areaItem__links">
              <Link href={`/map?prefecture=奈良県&tagId=&keyword=`} className="map">マップで見る</Link>
              <Link href={`/list?prefecture=奈良県&tagId=&keyword=`} className="list">一覧で見る</Link>
            </div>
          </li>
          <li className="p-areaItem">
            <Image
              src="/img/common/icon_pin.svg"
              alt=""
              width={32}
              height={32}
              className="p-areaItem__icon"
            />
            <p className="p-areaItem__name">和歌山県</p>
            <div className="p-areaItem__links">
              <Link href={`/map?prefecture=和歌山県&tagId=&keyword=`} className="map">マップで見る</Link>
              <Link href={`/list?prefecture=和歌山県&tagId=&keyword=`} className="list">一覧で見る</Link>
            </div>
          </li>
        </ul>
      </section>

      <section className="news l-section">
        <h2 className="c-heading">お知らせ</h2>
        <ul className="p-newsList">
          {news.slice(0, 3).map((newsItem) => (
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
        <div className={styles.news__link}>
          <Link href={`/newslist`}>一覧を見る</Link>
        </div>
      </section>
    </div>
  );
}
