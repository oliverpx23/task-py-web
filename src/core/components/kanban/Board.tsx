import { TaskStatus } from "@/interfaces";
import { useTaskStore } from "@/store/task.store";
import { Button, ScrollShadow, Spacer } from "@nextui-org/react";
import { clsx } from "clsx";
import { TaskCard } from "./TaskCard";
import { useState, DragEvent } from "react";
import { classColorMap } from "@/core/config/constants";

interface Props {
  status: TaskStatus;
}

export const Board = ({ status }: Props) => {
  const tasks = useTaskStore((state) => state.getTaskByStatus(status));
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);

  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);

  const [onDragOver, setOnDragOVer] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOVer(false);
    onTaskDrop(status);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOnDragOVer(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setOnDragOVer(false);
      }}
      onDrop={handleDrop}
      className={clsx([
        `flex flex-col flex-shrink-0 w-72 rounded-md overflow-hidden border border-${classColorMap[status]}`,
        isDragging && "border-4 border-dotted",
        (isDragging && onDragOver) && `border-4 bg-${classColorMap[status]}/20`,
      ])}
    >
      <div
        className={clsx([
          `flex items-center flex-shrink-0 h-10 p-4 bg-${classColorMap[status]} dark:bg-${classColorMap[status]}`,
        ])}
      >
        <span className="block text-sm font-semibold uppercase">
          {status} ({tasks.length})
        </span>
        <Spacer />
      </div>

      <ScrollShadow className="w-full h-[calc(100vh-200px)] lg:h-[calc(100vh-250px)] px-4" hideScrollBar>
        {tasks.map((task) => (
          <TaskCard key={`task-${task.id}`} task={task} />
        ))}
      </ScrollShadow>

      <Button 
        className={clsx([
          `rounded-md border-${classColorMap[status]}`,
        ])}
        variant="ghost"
      >
        Agregar Tarea
      </Button>

    </div>
  );
};
