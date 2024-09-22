import React, { useState } from "react";
import { Button, DatePicker, Input } from "./ui";

interface TaskInputProps {
  onAddTask: (text: string, date: string) => void;
}

const CURRENT_DATE = new Date().toISOString();

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");
  const [dueDate, setDueDate] = React.useState<string>(CURRENT_DATE);

  const handleAddTask = () => {
    onAddTask(taskText, dueDate);
    setTaskText("");
    setDueDate(CURRENT_DATE);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTaskText(e.target.value);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Input
        placeholder="Add a new task"
        value={taskText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <DatePicker value={dueDate} onChange={setDueDate} />
      <Button onClick={handleAddTask}>Add</Button>
    </div>
  );
};

export default React.memo(TaskInput);
