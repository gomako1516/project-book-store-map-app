import Link from "next/link";
import Image from "next/image";

export default function Area() {
  return (
    <div>
      <section>
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
    </div>
  );
}
