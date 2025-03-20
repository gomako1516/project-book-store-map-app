import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type SearchQueries = {
  prefecture?: string;
  tagId?: string[];
  keyword?: string;
};

export const useSearch = () => {
  const router = useRouter(); // ルーターオブジェクトを取得
  const { query } = router; // ルーターオブジェクトからクエリパラメータを取得

  // 検索条件用のstate
  const [queries, setQueries] = useState<SearchQueries>({
    prefecture: (query.prefecture as string) ?? "", // クエリパラメータからprefectureを取得、存在しない場合は空文字列を設定
    tagId: (query.tagId as string[]) ?? "",
    keyword: (query.keyword as string) ?? "",
  });

  // 都道府県 検索
  const handleChangePrefecture = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQueries((prev) => {
      return { ...prev, prefecture: e.target.value };
    });
  };

  // タグ検索
  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTagId = e.target.value; // チェックしたタグを取得

    setQueries((prev) => {
      return {
        ...prev,
        tagId: prev.tagId?.includes(selectedTagId)
          ? prev.tagId.filter((tagId) => tagId !== selectedTagId)
          : [...(prev.tagId ?? []), selectedTagId],
      };
    });
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueries((prev) => {
      return { ...prev, keyword: e.target.value };
    })
  }

  // 検索
  const handleSearch = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // router.pushでページ遷移
    router.push({
      pathname: router.pathname, // 遷移先のページのパスを指定
      query: queries, // URLに含めるクエリパラメータを指定
    });
  };

  // リセット
  const handleSearchReset = () => {
    setQueries({
      prefecture: "",
      tagId: [],
      keyword: "",
    });
  };

  return {
    queries,
    handleChangePrefecture,
    handleChangeTag,
    handleChangeKeyword,
    handleSearch,
    handleSearchReset,
  };
};
