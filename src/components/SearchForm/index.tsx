import styles from "./SearchForm.module.scss";
import { useSearch } from "@/hooks/useSearch";

const PREFECTURES = [
  { id: "osaka", name: "大阪府" },
  { id: "kyoto", name: "京都府" },
  { id: "nara", name: "奈良県" },
];

type Tag = {
  id: string;
  tag_name: string;
};

type MapProps = {
  shopTags: Tag[];
};

const SearchForm: React.FC<MapProps> = ({ shopTags }) => {
  const {
    queries,
    handleChangePrefecture,
    handleChangeTag,
    handleChangeKeyword,
    handleSearch,
    handleSearchReset,
  } = useSearch();

  return (
    <div className={styles.search}>
      <form onSubmit={handleSearch}>
        <div className={styles.search__inner}>
          <div
            className={`${styles.search__block} ${styles["search__block--prefecture"]}`}
          >
            <p className={styles.search__title}>都道府県</p>
            <div className="c-select">
              <select
                value={queries.prefecture}
                onChange={handleChangePrefecture}
              >
                <option value="">全て</option>
                {PREFECTURES.map((prefecture) => (
                  <option key={prefecture.id} value={prefecture.name}>
                    {prefecture.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.search__block}>
            <p className={styles.search__title}>フリーワード</p>
            <input
              type="text"
              onChange={handleChangeKeyword}
              value={queries.keyword}
              className="c-input"
            />
          </div>
          <div className={styles.search__block}>
            <p className={styles.search__title}>タグ</p>
            <div className={styles.search__tags}>
              {shopTags.map((tag) => {
                console.log(queries.tagId?.includes(tag.id));

                return (
                  <div key={tag.id} className={styles.search__tag}>
                    <input
                      type="checkbox"
                      id={tag.id}
                      value={tag.id}
                      checked={queries.tagId?.includes(tag.id)}
                      onChange={handleChangeTag}
                    />
                    <label htmlFor={tag.id}>{tag.tag_name}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.search__block}>
            <button
              type="button"
              onClick={handleSearchReset}
              className="c-btn c-btn--border"
            >
              リセット
            </button>
            <button type="submit" className="c-btn">
              検索
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
