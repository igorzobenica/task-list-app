import React from "react";
import Task, { TaskType } from "./Task";

interface TaskListProps {
  tasks: TaskType[];
  onToggleTaskCompletion: (id: number) => void;
  onConfirmDeleteTask: (id: number) => void;
  newTaskRef?: React.RefObject<HTMLDivElement>;
  addedTaskIdRef: React.MutableRefObject<number | null>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTaskCompletion,
  onConfirmDeleteTask,
  addedTaskIdRef,
}) => {
  const newTaskRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const currentNewTaskRef = newTaskRef.current;

    if (currentNewTaskRef && addedTaskIdRef.current) {
      // Scroll and highlight the new task
      currentNewTaskRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      currentNewTaskRef.classList.add(
        "bg-secondary",
        "transition",
        "duration-500"
      );

      // Remove the highlight after a timeout
      const timeout = setTimeout(() => {
        currentNewTaskRef?.classList.remove("bg-secondary");
        // Reset the addedTaskIdRef after the animation is done
        addedTaskIdRef.current = null;
      }, 1500);

      // Cleanup function to remove the highlight and ensure ref is reset if the component unmounts or updates
      return () => {
        clearTimeout(timeout);
        currentNewTaskRef?.classList.remove("bg-secondary");
        addedTaskIdRef.current = null;
      };
    }
  }, [tasks.length, addedTaskIdRef]);

  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onConfirmDeleteTask}
          onComplete={onToggleTaskCompletion}
          ref={task.id === addedTaskIdRef.current ? newTaskRef : null}
        />
      ))}
    </>
  );
};

export default React.memo(TaskList);
