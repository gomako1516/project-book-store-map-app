import styles from "./List.module.scss";
import SearchForm from "@/components/SearchForm";
import { client } from "@/lib/cms/client";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

type Shop = {
  id: string;
  address: string;
  name: string;
  prefecture: string;
  tag: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};

type Tag = {
  id: string;
  tag_name: string;
};

type ListProps = {
  shopData: Shop[];
  shopTags: Tag[];
};

const createSearchFilters = (prefecture: string, tagId: string) => {
  if (prefecture && tagId) {
    return `prefecture[contains]${prefecture}[and]tags[contains]${tagId}`;
  } else if (prefecture) {
    return `prefecture[contains]${prefecture}`;
  } else if (tagId) {
    return `tags[contains]${tagId}`;
  } else {
    return "";
  }
};

export const getServerSideProps: GetServerSideProps<ListProps> = async (
  context
) => {
  const { prefecture, tagId, keyword } = context.query;

  const queries = createSearchFilters(prefecture as string, tagId as string);
  const data = await client.get({
    endpoint: "shop",
    queries: { filters: queries, q: (keyword as string | undefined) ?? "" },
  });
  const tag = await client.get({ endpoint: "shop_tag" });

  return {
    props: {
      shopData: data.contents,
      shopTags: tag.contents,
    },
  };
};

const List: NextPage<ListProps> = ({ shopData, shopTags }: ListProps) => {

  
  return (
    <div className={styles.list}>
      <SearchForm shopTags={shopTags} />
      <p className={styles.shopResult}>検索結果：{shopData.length === 0 ? '検索条件に当てはまる店舗がありません' : `${shopData.length} 件`}</p>
      <ul className={styles.shopList}>
        {shopData.map((shopItem) => (
          <li key={shopItem.id} className={styles.shopItem}>
            <Link href={`shop/${shopItem.id}`}>
              <figure className={styles.shopItem__thumb}>
                <img src={shopItem.thumbnail.url} width={shopItem.thumbnail.width} height={shopItem.thumbnail.height} alt={shopItem.name} />
              </figure>
            </Link>
            <p className={styles.shopItem__name}>{shopItem.name}</p>
            <p className={styles.shopItem__address}>{shopItem.address}</p>
            <div className={styles.shopItem__link}>
              <Link href={`shop/${shopItem.id}`}>
                <Image
                  src="/img/common/icon_info.svg"
                  alt=""
                  width={32}
                  height={32}
                  className={styles.shopItem__link_icon}
                />
                詳細を見る
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
