# Task List App

シンプルなタスク管理アプリケーション。

## アプリ概要

個人のタスクをCRUD操作で管理するWebアプリ。3画面構成でシンプルに使える。

- タスクの作成・閲覧・編集・削除
- ステータス管理（未着手 / 進行中 / 完了）
- ステータス別フィルタリング

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| Frontend | React.js (Vite) |
| Backend | Node.js + Express |
| DB | PostgreSQL 16 |
| インフラ | Docker Compose |

## 画面構成

| 画面 | パス | 説明 |
|------|------|------|
| タスク一覧 | `/` | タスクのリスト表示・フィルタ・削除 |
| タスク作成 | `/new` | 新規タスクの入力フォーム |
| タスク編集 | `/edit/:id` | 既存タスクの編集フォーム |

## プロジェクト構成

```
test-task-list/
├── README.md
├── docker-compose.yml
├── docs/                        # 設計ドキュメント
│   ├── 1_requirements.md        #   要件定義
│   ├── 2_features.md            #   機能一覧
│   ├── 3_screens.md             #   画面設計
│   ├── 4_architecture.md        #   アーキテクチャ設計
│   ├── 5_infra.md               #   インフラ設計
│   └── 6_operation.md           #   運用手順
├── frontend/                    # React.js
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── components/          #   UIコンポーネント
│       ├── pages/               #   ページ
│       ├── api/                 #   API通信
│       ├── App.jsx
│       └── main.jsx
├── backend/                     # Node.js + Express
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── routes/              #   APIルーティング
│       ├── db/                  #   DB接続・初期化SQL
│       └── index.js             #   エントリポイント
└── db/                          # DB初期化
    └── init.sql
```

## セットアップ

### 前提条件

- Docker Desktop

### 起動

```bash
docker compose up --build
```

### アクセス

| サービス | URL |
|---------|-----|
| フロントエンド | http://localhost:3000 |
| バックエンドAPI | http://localhost:4000/api/tasks |

### 停止

```bash
docker compose down
```

### データリセット

```bash
docker compose down -v
docker compose up --build
```

## API

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET | /api/tasks | タスク一覧取得 |
| GET | /api/tasks/:id | タスク詳細取得 |
| POST | /api/tasks | タスク作成 |
| PUT | /api/tasks/:id | タスク更新 |
| DELETE | /api/tasks/:id | タスク削除 |

## ドキュメント

詳細は `docs/` 配下を参照:

1. [要件定義](docs/1_requirements.md)
2. [機能一覧](docs/2_features.md)
3. [画面設計](docs/3_screens.md)
4. [アーキテクチャ設計](docs/4_architecture.md)
5. [インフラ設計](docs/5_infra.md)
6. [運用手順](docs/6_operation.md)
