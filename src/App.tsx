import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Input,
} from "./components/ui";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskItem = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, newTaskItem]);
    setNewTask("");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center">Task List App</h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-xl font-bold mb-4 text-center">
              Today's tasks
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={addTask}>Add</Button>
            </div>
            <div>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span
                    className={`flex-1 ml-2 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default App;
