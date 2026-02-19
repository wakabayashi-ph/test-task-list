# 5. インフラ設計

## 5.1 構成概要

ローカル環境のみ。Docker Composeで3コンテナを管理。

## 5.2 コンテナ構成

| サービス | イメージ | ポート | 役割 |
|---------|---------|--------|------|
| frontend | node:20-alpine | 3000 | React開発サーバー |
| backend | node:20-alpine | 4000 | Express APIサーバー |
| db | postgres:16-alpine | 5432 | PostgreSQL |

## 5.3 Docker Compose構成

```yaml
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [backend]
    volumes: ["./frontend/src:/app/src"]   # ホットリロード

  backend:
    build: ./backend
    ports: ["4000:4000"]
    depends_on: [db]
    volumes: ["./backend/src:/app/src"]    # ホットリロード
    environment:
      DATABASE_URL: postgres://taskuser:taskpass@db:5432/taskdb

  db:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]
    environment:
      POSTGRES_DB: taskdb
      POSTGRES_USER: taskuser
      POSTGRES_PASSWORD: taskpass

volumes:
  pgdata:
```

## 5.4 ネットワーク

- Docker内部ネットワーク（デフォルトbridge）
- frontend → backend: `http://backend:4000`
- backend → db: `postgres://db:5432`
- ホストからのアクセス: `localhost:3000`（UI）、`localhost:4000`（API）

## 5.5 データ永続化

| データ | 方式 | 備考 |
|-------|------|------|
| PostgreSQLデータ | Named Volume (`pgdata`) | コンテナ再起動でも保持 |
| ソースコード | Bind Mount | ホットリロード用 |

## 5.6 環境変数

| 変数名 | デフォルト値 | 説明 |
|-------|------------|------|
| POSTGRES_DB | taskdb | DB名 |
| POSTGRES_USER | taskuser | DBユーザー |
| POSTGRES_PASSWORD | taskpass | DBパスワード |
| DATABASE_URL | (自動構成) | Backend用接続文字列 |
