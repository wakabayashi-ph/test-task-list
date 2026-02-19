# 2. 機能一覧

## 2.1 タスク管理機能

### タスクCRUD

| 機能 | メソッド | エンドポイント | 説明 |
|------|----------|----------------|------|
| 一覧取得 | GET | /api/tasks | 全タスク取得（フィルタ対応） |
| 詳細取得 | GET | /api/tasks/:id | 1件取得 |
| 新規作成 | POST | /api/tasks | タスク作成 |
| 更新 | PUT | /api/tasks/:id | タスク編集 |
| 削除 | DELETE | /api/tasks/:id | タスク削除 |

### タスクデータモデル

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| id | UUID | 自動 | 一意識別子 |
| title | VARCHAR(255) | Yes | タスク名 |
| description | TEXT | No | 詳細説明 |
| status | ENUM | Yes | pending / in_progress / completed |
| created_at | TIMESTAMP | 自動 | 作成日時 |
| updated_at | TIMESTAMP | 自動 | 更新日時 |

## 2.2 フィルタリング機能

- ステータス別表示（全て / 未着手 / 進行中 / 完了）
- クエリパラメータ: `GET /api/tasks?status=pending`

## 2.3 ステータス遷移

```
pending(未着手) → in_progress(進行中) → completed(完了)
                                       ↓
                   pending(未着手) ← (戻し可能)
```

すべてのステータス間で自由に遷移可能。
