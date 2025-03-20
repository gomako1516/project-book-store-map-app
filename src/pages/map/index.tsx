import { client } from "@/lib/cms/client";
import GoogleMap from "@/components/auth/GoogleMap";
import React, { useEffect, useRef, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import styles from "./Map.module.scss";
import { useSearch } from "@/hooks/useSearch";
import SearchForm from "@/components/SearchForm";

type Address = {
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

type MapProps = {
  shopData: Address[];
  shopTags: Tag[];
};

// クエリ作成
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

export const getServerSideProps: GetServerSideProps<MapProps> = async (
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

const Map: NextPage<MapProps> = ({
  shopData,
  shopTags,
}: {
  shopData: Address[];
  shopTags: Tag[];
}) => {
  return (
    <div className={styles.map}>
      <SearchForm shopTags={shopTags} />
      <p className={styles.shopResult}>検索結果：{shopData.length === 0 ? '検索条件に当てはまる店舗がありません' : `${shopData.length} 件`}</p>
      <GoogleMap shopData={shopData} />
    </div>
  );
};

export default Map;
