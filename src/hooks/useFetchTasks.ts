import { useState, useCallback } from "react";
import { fetchTasks } from "../services/taskService";
import { getYesterdaysDate } from "@/lib/utils";

const useFetchTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const tasks = await fetchTasks();
      return tasks.map((item) => ({
        id: item.id,
        text: item.title,
        completed: true,
        dueDate: getYesterdaysDate(),
      }));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Tasks could not be loaded.");
      } else {
        setError("An unexpected error occurred.");
      }
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { loadTasks, loading, error };
};

export default useFetchTasks;
