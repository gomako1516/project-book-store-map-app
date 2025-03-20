import React, { useEffect, useRef, useState } from "react";
import styles from "@/pages/map/Map.module.scss";

type Address = {
  id: string;
  address: string;
  name: string;
  prefecture: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};

type GoogleMapProps = {
  shopData: Address[];
};

// Google Map 初期化用の定数
const INITIALIZE_ZOOM = 13; // ズームレベル
const INITIALIZE_MAP_WIDTH = "100%"; // 地図の幅
const INITIALIZE_MAP_HEIGHT = "600px"; // 地図の高さ

const GoogleMap: React.FC<GoogleMapProps> = ({ shopData }) => {
  const mapRef = useRef<HTMLDivElement>(null); // useRefを使って地図を表示するdiv要素への参照を保持
  const activeInfoWindow = useRef<google.maps.InfoWindow | null>(null); // useRefを使ってクリックしたマーカーのインフォウインドウを保持

  useEffect(() => {
    if (!mapRef.current) return; // mapRefが未定義の場合は何もしない

    // マップの初期化
    const initializedMap = new google.maps.Map(mapRef.current, {
      zoom: INITIALIZE_ZOOM, // ズームレベル
      gestureHandling: "greedy", // ジェスチャー操作を無効化
      disableDefaultUI: true, // デフォルトのUI要素を無効化
      zoomControl: true,
    });
    // // TODO: ユーザーの現在地を取得して地図の中心に設定
    const osaka = new google.maps.LatLng(
      34.669946804806614,
      135.49839481688184
    );
    initializedMap.setCenter(osaka);

    // ジオコーダーの初期化
    const geocoder = new google.maps.Geocoder();

    shopData.forEach((locationData) => {
      if (!locationData.address) return; // 住所が未定義の場合は何もしない

      geocoder.geocode({ address: locationData.address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;

          // マーカーの設定
          const marker = new google.maps.Marker({
            position: location,
            map: initializedMap,
            title: locationData.name,
          });

          // インフォウインドウの設定
          const infoWindow = new google.maps.InfoWindow({
            content: `<div class=${styles.map__info}>
                <figure class=${styles.map__info_thumb}>
                  <img src="${locationData.thumbnail.url}" width="${locationData.thumbnail.width}" height="${locationData.thumbnail.height}" alt="${locationData.name}" />
                </figure>
                <p class=${styles.map__info_name}>${locationData.name}</p>
                <p class=${styles.map__info_address}>${locationData.address}</p>
                <div class=${styles.map__info_link}><a href=${`shop/${locationData.id}`}>詳細を見る</a></div>
              </div>`,
          });

          marker.addListener("click", () => {
            if (activeInfoWindow.current) {
              activeInfoWindow.current.close(); // 他のインフォウインドウが開いている場合は閉じる
            }
            infoWindow.open(initializedMap, marker);
            activeInfoWindow.current = infoWindow; // クリックしたマーカーのインフォウインドウを保持
          });

          // マップの中心をマーカーの位置に設定
          initializedMap.setCenter(location);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    });
  }, [shopData]);

  return (
    <div>
      <div
        ref={mapRef}
        style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }}
      />
    </div>
  );
};

export default GoogleMap;
