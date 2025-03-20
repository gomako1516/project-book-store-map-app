import Image from "next/image";
import Link from "next/link";
import styles from './Header.module.scss';
import { useContext } from "react";
import { MenuContext } from "@/context/MenuContext";

const Header: React.FC = () => {
  const { openMenu, handleOpenAsideMenu, handleOpenMenu } = useContext(MenuContext);

  return (
    <div className={styles.header}>
      <div className={`l-container ${styles.header__inner}`}>
        {/* <button className={styles.header__sideMenuBtn} onClick={handleOpenAsideMenu}>
          <Image
            src="/img/common/icon_menu.svg"
            alt=""
            width={32}
            height={32}
          />
        </button> */}
        <div className={styles.header__logo}>
          <Link href={"/"}>
            <Image
              src="/img/common/icon_book.svg"
              alt=""
              width={32}
              height={32}
            />
            本棚のある風景
          </Link>
        </div>
        <button className={styles.header__menuBtn} onClick={handleOpenMenu}>
          <Image
            src="/img/common/icon_ellipsis.svg"
            alt=""
            width={32}
            height={32}
          />
        </button>
        <nav className={`${styles.header__nav} ${openMenu ? styles['is-open'] : styles['is-close']}`}>
          <ul className={styles.header__navList}>
            <li className={styles.header__navItem}>
              <Link href={"/faq/"}>
                <Image
                  src="/img/common/icon_faq.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </Link>
            </li>
            <li>
              <Link href={"/newslist/"}>
                <Image
                  src="/img/common/icon_info.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </Link>
            </li>
            <li>
              <Link href={"/mypage/"}>
                <Image
                  src="/img/common/icon_user.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </Link>
            </li>
            <li>
              <Link href={"/logout/"}>
                <Image
                  src="/img/common/icon_logout.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
