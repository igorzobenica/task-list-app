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
import Layout from "./components/Layout";
import { useToast } from "./hooks/use-toast";

const App: React.FC = () => {
  const [tasks, setTasks] = useStateWithLocalStorage<TaskType[]>("tasks", []);
  const [taskToDelete, setTaskToDelete] = React.useState<number | null>(null);
  const [filter, setFilter] = React.useState<"all" | "open" | "done">("all");
  const addedTaskIdRef = React.useRef<number | null>(null);
  const { toast } = useToast();

  // Keep track if previous tasks have been loaded to hide the "Load previous tasks" button
  const [hasFetchedPrevious, setHasFetchedPrevious] =
    useStateWithLocalStorage<boolean>("hasFetchedPrevious", false);

  const filteredTasks = React.useMemo(() => {
    return tasks.filter((task) => {
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
  }, [tasks, filter]);

  const { loadTasks, loading, error } = useFetchTasks();

  const handleLoadPreviousTasks = React.useCallback(async () => {
    const fetchedTasks = await loadTasks();
    setTasks((prevTasks) => [...prevTasks, ...fetchedTasks]);
    setHasFetchedPrevious(true);
  }, [loadTasks, setTasks, setHasFetchedPrevious]);

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

  const toggleTaskCompletion = React.useCallback(
    (id: number) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      toast({
        title: "Task completed",
        description: "Task marked as complete.",
        duration: 2000,
      });
    },
    [tasks, setTasks, toast]
  );

  const deleteTask = React.useCallback(() => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setTaskToDelete(null);
      toast({
        title: "Task removed",
        description: "The task was successfully deleted.",
        duration: 2000,
      });
    }
  }, [taskToDelete, tasks, setTasks, toast]);

  const showDeleteDialog = taskToDelete !== null;

  const groupedTasks = groupTasksByDate(filteredTasks);
  const sortedDateKeys = getSortedDates(filteredTasks);

  return (
    <Layout>
      <Card className="w-96">
        <CardHeader>
          <h2 className="text-xl font-bold">Today's tasks</h2>
        </CardHeader>
        <CardContent>
          <TaskInput onAddTask={handleAddTask} />
          <div className="flex justify-between mb-2">
            <div className="flex-1 flex items-center">
              <p className="text-sm text-gray-500">Due date</p>
            </div>
            <FilterTabs filter={filter} setFilter={setFilter} />
          </div>
          <div className="max-h-[calc(100vh-27rem)] overflow-y-auto">
            {sortedDateKeys.map((date) => (
              <div key={date}>
                <p className="text-sm text-gray-500 my-2">
                  {isToday(parseISO(date))
                    ? "Today"
                    : isYesterday(parseISO(date))
                    ? "Yesterday"
                    : date}
                </p>
                <TaskList
                  tasks={groupedTasks[date]}
                  onToggleTaskCompletion={toggleTaskCompletion}
                  onConfirmDeleteTask={setTaskToDelete}
                  addedTaskIdRef={addedTaskIdRef}
                />
              </div>
            ))}
          </div>
          {!hasFetchedPrevious && (
            <div className="flex justify-center items-center mt-6">
              <Button onClick={handleLoadPreviousTasks} loading={loading}>
                {loading ? "Loading tasks..." : "Load previous tasks ..."}
              </Button>
            </div>
          )}
          {error && <p className="text-destructive mt-2">{error}</p>}
        </CardContent>
      </Card>
      <DeleteTaskDialog
        open={showDeleteDialog}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={deleteTask}
      />
    </Layout>
  );
};

export default App;
