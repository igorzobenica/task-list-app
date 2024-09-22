import React from "react";
import { Button, Card, CardContent, CardHeader } from "./components/ui";
import { TaskType } from "./components/Task";
import TaskInput from "./components/TaskInput";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import { useFetchTasks } from "./hooks";
import DeleteTaskDialog from "./components/DeleteTaskDialog";
import useStateWithLocalStorage from "./hooks/useStateWithLocalStorage";
import { getSortedDates, groupTasksByDate } from "./lib/utils";
import { isToday, isYesterday, parseISO } from "date-fns";

const App: React.FC = () => {
  const [tasks, setTasks] = useStateWithLocalStorage<TaskType[]>("tasks", []);
  const [previousTasks, setPreviousTasks] = React.useState<TaskType[]>([]);
  const [filter, setFilter] = React.useState<"all" | "open" | "done">("all");
  const allTasks: TaskType[] = React.useMemo(
    () => [...tasks, ...previousTasks],
    [tasks, previousTasks]
  );

  const filteredTasks = React.useMemo(() => {
    return allTasks.filter((task) => {
      switch (filter) {
        case "all":
          return true;
        case "open":
          return !task.completed;
        case "done":
          return task.completed;
        default:
          return true;
      }
    });
  }, [allTasks, filter]);

  const { loadTasks, loading, error } = useFetchTasks();

  const handleLoadPreviousTasks = async () => {
    const fetchedTasks = await loadTasks();
    setPreviousTasks((prevTasks) => [...prevTasks, ...fetchedTasks]);
  };

  const handleAddTask = React.useCallback(
    (newTask: string, dueDate: string) => {
    if (!newTask.trim()) return;
    const newTaskItem = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
        dueDate,
      };
      addedTaskIdRef.current = newTaskItem.id;
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTaskItem];
        return updatedTasks.sort((a, b) =>
          a.dueDate && b.dueDate
            ? a.dueDate.localeCompare(b.dueDate)
            : a.dueDate
            ? -1
            : 1
        );
      });
    },
    [setTasks]
  );

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
            <TaskInput onAddTask={handleAddTask} />
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
            {previousTasks.length === 0 && (
              <div className="flex justify-center items-center mt-6">
                <Button
                  onClick={handleLoadPreviousTasks}
                  loading={loading}
                  disabled={previousTasks.length > 0}
                >
                  {loading ? "Loading tasks..." : "Load previous tasks ..."}
                </Button>
              </div>
            )}
            {error && <p className="text-destructive mt-2">{error}</p>}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default App;
