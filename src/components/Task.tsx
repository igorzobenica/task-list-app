import React from "react";
import { Button, Checkbox } from "./ui";

export interface TaskType {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
}

interface Props {
  task: TaskType;
  onDelete?: (id: number) => void;
  onComplete: (id: number) => void;
}

const Task = React.forwardRef<HTMLDivElement, Props>(
  ({ task, onComplete, onDelete }, ref) => {
    return (
      <div
        key={task.id}
        className="flex items-center justify-between p-2"
        ref={ref}
      >
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onComplete(task.id)}
        />
        <span
          className={`truncate flex-1 ml-2 ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
          title={task.text}
        >
          {task.text}
        </span>
        {!!onDelete && (
          <Button
            variant="ghostDestructive"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        )}
      </div>
    );
  }
);

export default React.memo(Task);
