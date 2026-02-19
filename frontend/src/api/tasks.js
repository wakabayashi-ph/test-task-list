const API_BASE = '/api/tasks';

export async function fetchTasks(status) {
  const url = status ? `${API_BASE}?status=${status}` : API_BASE;
  const res = await fetch(url);
  return res.json();
}

export async function fetchTask(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return res.json();
}

export async function createTask(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
