import { client } from "@/lib/cms/client";
import styles from "./Shop.module.scss";
import Image from "next/image";

interface Photo {
  url: string;
  height: number;
  width: number;
}

type Shop = {
  id: string;
  name: string;
  address: string;
  profile: string;
  tel: string;
  time: string;
  holiday: string;
  map: string;
  note: string;
  web: { fieldId: string; url_link: string }[];
  photo: Photo[];
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};

// idに基づいたデータを取得
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id; // URLパラメータのidを取得
  const data = await client.get({ endpoint: "shop", contentId: id }); // idに基づいたデータ取得

  return {
    props: {
      shop: data,
    },
  };
};

// SSGの対象パスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "shop" });

  const paths = data.contents.map((content: Shop) => `/shop/${content.id}`); // SSGの対象パスを指定
  return {
    paths,
    fallback: false, // 設定されていないパスの場合は404ページを表示
  };
};

export default function NewsId({ shop }: { shop: Shop }) {
  const createMarkup = (text: string) => {
    return { __html: text.replace(/\n/g, "<br />") };
  };

  return (
    <main>
      <figure className={styles.shop__thumb}>
        <img src={shop.thumbnail.url} width={shop.thumbnail.width} height={shop.thumbnail.height} alt={shop.name} />
      </figure>

      <h1 className={styles.shop__title}>{shop.name}</h1>

      {shop.profile && (
        <div className={styles.shop__description} dangerouslySetInnerHTML={{ __html: `${shop.profile}` }}></div>
      )}

      <dl className={styles.shop__data}>
        {shop.address && (
          <div className={styles.shop__data_wrap}>
            <dt>住所</dt>
            <dd>
              <p dangerouslySetInnerHTML={createMarkup(shop.address)}></p>
              {shop.map && (
                <div className={styles.shop__data_link}>
                  <a href={shop.map} className={styles.text} target="_blank">GoogleMapで見る</a>
                  <span className={styles.icon}>
                    <Image
                      src="/img/common/icon_outlook.svg"
                      alt=""
                      width={13}
                      height={9}
                    />
                  </span>
                </div>
              )}
            </dd>
          </div>
        )}

        {shop.tel && (
          <div className={styles.shop__data_wrap}>
            <dt>TEL</dt>
            <dd>
              <p>{shop.tel}</p>
            </dd>
          </div>
        )}

        {shop.time && (
          <div className={styles.shop__data_wrap}>
            <dt>営業時間</dt>
            <dd>
              <p dangerouslySetInnerHTML={createMarkup(shop.time)}></p>
            </dd>
          </div>
        )}

        {shop.holiday && (
          <div className={styles.shop__data_wrap}>
            <dt>定休日</dt>
            <dd>
              <p dangerouslySetInnerHTML={createMarkup(shop.holiday)}></p>
            </dd>
          </div>
        )}

        {shop.web && (
          <div className={styles.shop__data_wrap}>
            <dt>Web</dt>
            <dd>
              {shop.web.map((webLink, index) => (
                <div key={index} className={styles.shop__data_url}>
                  <a href={webLink.url_link} target="_blank" rel="noopener noreferrer">{webLink.url_link}</a>
                </div>
              ))}
            </dd>
          </div>
        )}

        {shop.note && (
          <div className={styles.shop__data_wrap}>
            <dt>備考</dt>
            <dd>
              <p dangerouslySetInnerHTML={createMarkup(shop.note)}></p>
            </dd>
          </div>
        )}
      </dl>

      {shop.photo && shop.photo.length > 0 && (
        <div className={styles.shop__photos}>
          {shop.photo.map((photo, index) => (
            <figure key={index} className={styles.shop__photo}>
              <img src={photo.url} width={photo.width} height={photo.height} alt={shop.name} />
            </figure>
          ))}
        </div>
      )}
    </main>
  );
}
