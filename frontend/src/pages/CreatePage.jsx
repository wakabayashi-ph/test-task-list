import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { createTask } from '../api/tasks';

function CreatePage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createTask(data);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <button onClick={() => navigate('/')} style={{ marginRight: '12px' }}>← 戻る</button>
        <h1 style={{ margin: 0 }}>タスク作成</h1>
      </div>
      <TaskForm onSubmit={handleSubmit} submitLabel="作成" />
    </div>
  );
}

export default CreatePage;
