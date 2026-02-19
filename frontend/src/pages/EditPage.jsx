import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { fetchTask, updateTask } from '../api/tasks';

function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask(id).then(setTask);
  }, [id]);

  const handleSubmit = async (data) => {
    await updateTask(id, data);
    navigate('/');
  };

  if (!task) return <div style={{ padding: '20px' }}>読み込み中...</div>;

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <button onClick={() => navigate('/')} style={{ marginRight: '12px' }}>← 戻る</button>
        <h1 style={{ margin: 0 }}>タスク編集</h1>
      </div>
      <TaskForm initialData={task} onSubmit={handleSubmit} submitLabel="更新" />
    </div>
  );
}

export default EditPage;
