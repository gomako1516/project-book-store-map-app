import Image from "next/image";
import Link from "next/link";
import styles from './Aside.module.scss';
import { MenuContext } from "@/context/MenuContext";
import { useContext } from "react";

const Aside: React.FC = () => {
  const { openAsideMenu } = useContext(MenuContext);

  return (
    <div className={`${styles.aside} ${openAsideMenu ? styles['is-aside-open'] : styles['is-aside-close']}`}>
      <nav className={styles.aside__nav}>
        <ul className={styles.aside__navList}>
          <li className={styles.aside__navItem}>
            <Link href={"/area/"}>
              <Image
                src="/img/common/icon_map.svg"
                alt=""
                width={32}
                height={32}
              />
              エリア
            </Link>
          </li>
          <li className={styles.aside__navItem}>
            <Link href={"/map/"}>
              <Image
                src="/img/common/icon_pin.svg"
                alt=""
                width={32}
                height={32}
              />
              マップ
            </Link>
          </li>
          <li className={styles.aside__navItem}>
            <Link href={"/list/"}>
              <Image
                src="/img/common/icon_list.svg"
                alt=""
                width={32}
                height={32}
              />
              リスト
            </Link>
          </li>
          <li className={styles.aside__navItem}>
            <Link href={"/favorite/"}>
              <Image
                src="/img/common/icon_favorite.svg"
                alt=""
                width={32}
                height={32}
              />
              お気に入り
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Aside;
