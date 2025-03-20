import Image from "next/image";
import Link from "next/link";
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={`l-container ${styles.footer__inner}`}>
        <p className={styles.footer__logo}>
          <Link href={"/"}>
            <Image
              src="/img/common/icon_book_wh.svg"
              alt=""
              width={32}
              height={32}
            />
            本棚のある風景
          </Link>
        </p>
        <nav className={styles.footer__nav}>
          <ul className={styles.footer__navList}>
            <li className={styles.footer__navItem}>
              <Link href={"/term/"}>利用規約</Link>
            </li>
            <li className={styles.footer__navItem}>
              <Link href={"/policy/"}>プライバシーポリシー</Link>
            </li>
            <li className={styles.footer__navItem}>
              <Link href={"/contact/"}>お問い合わせ</Link>
            </li>
          </ul>
          {/* <ul className={styles.footer__socialList}>
            <li className={styles.header__navItem}>
              <Link href={"/"} target="_blank">
                <Image
                  src="/img/common/icon_instagram.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </Link>
            </li>
            <li className={styles.header__navItem}>
              <Link href={"/"} target="_blank">
                <Image
                  src="/img/common/icon_x.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </Link>
            </li>
          </ul> */}
        </nav>
        <p className={styles.footer__copyright}>© 2024 book shelf.</p>
      </div>
    </div>
  );
}

export default Footer;