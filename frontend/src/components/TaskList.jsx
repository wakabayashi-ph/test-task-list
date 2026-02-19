import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
        タスクがありません。作成してください
      </p>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;
