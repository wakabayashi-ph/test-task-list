import { useNavigate } from 'react-router-dom';

const STATUS_LABELS = {
  pending: '未着手',
  in_progress: '進行中',
  completed: '完了',
};

function TaskItem({ task, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`「${task.title}」を削除しますか？`)) {
      onDelete(task.id);
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '12px 16px',
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <div style={{
          fontWeight: 'bold',
          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
          color: task.status === 'completed' ? '#888' : '#333',
        }}>
          {task.title}
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
          ステータス: {STATUS_LABELS[task.status]}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate(`/edit/${task.id}`)}>編集</button>
        <button onClick={handleDelete} style={{ color: 'red' }}>削除</button>
      </div>
    </div>
  );
}

export default TaskItem;
