import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { fetchTasks, deleteTask } from '../api/tasks';

const FILTERS = [
  { label: '全て', value: '' },
  { label: '未着手', value: 'pending' },
  { label: '進行中', value: 'in_progress' },
  { label: '完了', value: 'completed' },
];

function ListPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');

  const loadTasks = async () => {
    const data = await fetchTasks(filter || undefined);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ margin: 0 }}>Task List</h1>
        <button onClick={() => navigate('/new')}>+ 新規作成</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            style={{
              fontWeight: filter === f.value ? 'bold' : 'normal',
              background: filter === f.value ? '#333' : '#eee',
              color: filter === f.value ? '#fff' : '#333',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  );
}

export default ListPage;
