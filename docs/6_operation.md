# 6. 運用手順

## 6.1 前提条件

- Docker Desktop インストール済み
- Docker Compose v2 利用可能

## 6.2 初回セットアップ

```bash
# リポジトリクローン後
cd test-task-list

# コンテナビルド＆起動
docker compose up --build
```

初回起動時にDBの初期化（テーブル作成）が自動実行される。

## 6.3 日常操作

### 起動

```bash
docker compose up -d
```

### 停止

```bash
docker compose down
```

### ログ確認

```bash
# 全サービス
docker compose logs -f

# 特定サービス
docker compose logs -f backend
```

### 再ビルド（依存パッケージ変更時）

```bash
docker compose up --build
```

## 6.4 データ操作

### DBリセット

```bash
docker compose down -v   # ボリューム含めて削除
docker compose up --build
```

### DB直接接続

```bash
docker compose exec db psql -U taskuser -d taskdb
```

## 6.5 アクセス先

| サービス | URL |
|---------|-----|
| フロントエンド | http://localhost:3000 |
| バックエンドAPI | http://localhost:4000/api/tasks |
| PostgreSQL | localhost:5432 |

## 6.6 トラブルシューティング

| 問題 | 対処 |
|------|------|
| ポート競合 | `docker compose down` → 該当ポート使用プロセスを停止 |
| DB接続エラー | `docker compose restart db` → backend再起動 |
| 依存エラー | `docker compose down && docker compose up --build` |
| データ破損 | `docker compose down -v && docker compose up --build` |
