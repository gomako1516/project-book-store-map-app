# 本屋検索マップ
## 概要
### URL  
  https://book-store-map-app.vercel.app/
### 概要  
独立系書店（個人が運営している書店）を検索できるマップアプリ。  
microCMSに登録した書店情報を取得し、GoogleMap上に表示・検索できる仕様になっています。  
※現状、仮の本屋情報のみ登録しています（大阪・京都・奈良で検索可能）。
### 今後の実装予定
- 店舗登録
- Firebaseを使用したマイページ機能
- お気に入り機能
- アプリの解説ページなどの実装 etc...

## ワイヤーフレーム
[https://www.figma.com/design/aFO8NywrOkK9uN4GI04q7l/本屋マップWF-(新)?node-id=0-1&t=PqSg2bOlJI9VJ4JC-0](https://www.figma.com/design/aFO8NywrOkK9uN4GI04q7l/%E6%9C%AC%E5%B1%8B%E3%83%9E%E3%83%83%E3%83%97WF-(%E6%96%B0)?node-id=0-1&t=PqSg2bOlJI9VJ4JC-0)

## 技術選定
- フロントエンド
  - TypeScript
  - Next.js
  - Google Map JavaScript API
- バックエンド（マイページ）※未実装
  - Firebase（Cloud Firestore・Firebase Authentication）
- CMS
 - micro CMS

## システム構成図
<img width="1136" alt="システム構成図" src="https://github.com/user-attachments/assets/e94c74cc-74da-4787-a96a-349139da0939" />

## DB設計
- **ユーザー（users）**
  - ユーザーID（user_id）_strings
  - ユーザー名（user_name）_strings
  - 作成日（user_create_at）_timestamp
  - 削除日（user_delete_at）_timestamp
  - 更新日（user_update_at）_timestamp
  - お気に入り（user_favorite_stores）_array
    - 店舗ID（user_favorite_store_id）_strings
    - 更新日（user_favorite_update_at）_timestamp

[ER図（Drawio）](https://drive.google.com/file/d/1gsL_66kvfxh05Nvkc7-HfctOtQYG34Fv/view)

## 開発メモ
### こだわった点
本屋情報を管理しやすいように、microCMSの投稿機能をデータベースとして活用。  
microCMSからデータをfetchして、GoogleMapsAPI ジオコーディングで経度緯度を取得。  
GoogleMapsAPIで地図上に本屋情報を表示させていいます。
### 苦労した点
GoogleMapsAPIに表示させる本屋の検索機能の実装には苦労しました。  
都道府県、タグ、フリーワードの検索項目を設置し、検索内容をもとにフィルタリング。  
結果をもとにMAP上にピンを立てる処理を実装しました。
