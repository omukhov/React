import { useState } from "react";
import initialTasks from "../data.js";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 32px;

  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #111827;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
`;

export const TaskInput = styled.input`
  flex: 1;
  padding: 14px 18px;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

export const AddButton = styled.button`
  padding: 0 24px;
  border: none;
  border-radius: 12px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: white;
  padding: 18px 20px;
  border-radius: 14px;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);

  transition: 0.25s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Checkbox = styled.input`
  width: 22px;
  height: 22px;
  cursor: pointer;
  accent-color: #2563eb;
`;

export const TaskTitle = styled.div`
  font-size: 18px;

  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};

  color: ${(props) => (props.completed ? "#9ca3af" : "#111827")};
`;

export const EditInput = styled.input`
  width: 320px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 2px solid #2563eb;
  font-size: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 9px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;

  background: ${(props) => {
    if (props.variant === "edit") return "#f59e0b";
    if (props.variant === "delete") return "#ef4444";
    if (props.variant === "save") return "#10b981";
    return "#2563eb";
  }};

  color: white;

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%);
  padding: 40px 20px;
`;

export default function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [newTask, setNewTask] = useState(null);

  function handleEdit(task) {
    setEditingId(task.id);
    setEditText(task.title);
  }

  function handleSave(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: editText } : task,
    );

    setTasks(updatedTasks);
    setEditingId(null);
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function addTask() {
    const task = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
    };

    setTasks([task, ...tasks]);
    setNewTask("");
  }

  return (
    <Page>
      <Container>
        <Title>To-Do List</Title>

        <InputGroup>
          <TaskInput
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <AddButton onClick={() => addTask()}>Add</AddButton>
        </InputGroup>

        <List>
          {tasks.map((task) => (
            <Card key={task.id}>
              <Left>
                <Checkbox
                  type="checkbox"
                  name="completed"
                  onChange={() => handleToggle(task.id)}
                  checked={task.completed}
                />
                {editingId === task.id ? (
                  <EditInput
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <TaskTitle>{task.title}</TaskTitle>
                )}
              </Left>

              <ButtonGroup>
                {editingId === task.id ? (
                  <Button onClick={() => handleSave(task.id)}>Save</Button>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(task)}>Edit</Button>
                    <Button
                      onClick={() => handleDelete(task.id)}
                      disabled={task.completed}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </ButtonGroup>
            </Card>
          ))}
        </List>
      </Container>
    </Page>
  );
}
