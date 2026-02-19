# 4. アーキテクチャ設計

## 4.1 全体構成

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│  PostgreSQL  │
│  React.js    │◀────│   Node.js    │◀────│              │
│  :3000       │     │   :4000      │     │   :5432      │
└──────────────┘     └──────────────┘     └──────────────┘
```

## 4.2 技術スタック

| レイヤー | 技術 | バージョン |
|---------|------|-----------|
| Frontend | React.js (Vite) | 18.x |
| Backend | Node.js + Express | 20.x |
| DB | PostgreSQL | 16 |
| コンテナ | Docker Compose | 3.8 |

## 4.3 Frontend構成

```
frontend/
├── src/
│   ├── components/     # UIコンポーネント
│   │   ├── TaskList.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskItem.jsx
│   ├── pages/          # ページコンポーネント
│   │   ├── ListPage.jsx
│   │   ├── CreatePage.jsx
│   │   └── EditPage.jsx
│   ├── api/            # API通信
│   │   └── tasks.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── Dockerfile
```

## 4.4 Backend構成

```
backend/
├── src/
│   ├── routes/         # ルーティング
│   │   └── tasks.js
│   ├── db/             # DB接続・マイグレーション
│   │   ├── index.js
│   │   └── init.sql
│   └── index.js        # エントリポイント
├── package.json
└── Dockerfile
```

## 4.5 API設計

### エンドポイント

| メソッド | パス | リクエスト | レスポンス |
|---------|------|-----------|-----------|
| GET | /api/tasks | query: ?status= | Task[] |
| GET | /api/tasks/:id | - | Task |
| POST | /api/tasks | { title, description, status } | Task |
| PUT | /api/tasks/:id | { title, description, status } | Task |
| DELETE | /api/tasks/:id | - | { message } |

### レスポンス例

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "設計書を作成する",
  "description": "タスク管理アプリの設計書",
  "status": "in_progress",
  "created_at": "2026-02-20T00:00:00.000Z",
  "updated_at": "2026-02-20T00:00:00.000Z"
}
```

## 4.6 DBスキーマ

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
