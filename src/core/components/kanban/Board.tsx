import { TaskStatus } from "@/interfaces";
import { useTaskStore } from "@/store/task.store";
import { Button, CircularProgress, ScrollShadow, Spacer } from "@nextui-org/react";
import { clsx } from "clsx";
import { TaskCard } from "./TaskCard";
import { useState, DragEvent } from "react";

interface Props {
  status: TaskStatus;
  openNewTaskModal: (status: TaskStatus) => void
}

export const Board = ({ status, openNewTaskModal }: Props) => {
  const tasks = useTaskStore((state) => state.getTaskByStatus(status));
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const isloading = useTaskStore((state) => state.isLoading);

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
        `flex flex-col flex-shrink-0 w-72 rounded-md overflow-hidden border`,
        status == 'pending' && "border-warning-800",
        status == 'in-progress' && "border-primary-800",
        status == 'done' && "border-success-800",
        isDragging && "border-4 border-dotted",
        (isDragging && onDragOver) &&  status == 'pending' && `border-4 bg-warning-800/20`,
        (isDragging && onDragOver) &&  status == 'in-progress' && `border-4 bg-primary-800/20`,
        (isDragging && onDragOver) &&  status == 'done' && `border-4 bg-success-800/20`,
      ])}
    >
      <div
        className={clsx([
          `flex items-center flex-shrink-0 h-10 p-4`,
          status == 'pending' && "bg-warning-800",
          status == 'in-progress' && "bg-primary-800",
          status == 'done' && "bg-success-800",
        ])}
      >
        <span className="flex justify-between text-sm font-semibold uppercase">
          {status} ({tasks.length})
          {
            isloading &&
            <div className="flex">
              <CircularProgress classNames={{
                svg: "w-4 h-4"
              }} size="lg" aria-label="cargando..."/>
            </div>
          }
        </span>
      </div>

      <ScrollShadow className="w-full h-[calc(100vh-200px)] lg:h-[calc(100vh-250px)] px-4" hideScrollBar>
        {tasks.map((task) => (
          <TaskCard key={`task-${task.id}`} task={task} />
        ))}
      </ScrollShadow>

      <Button 
        onClick={() => openNewTaskModal(status)}
        className={clsx([
          `rounded-md`,
          status == 'pending' && "border-warning-800",
          status == 'in-progress' && "border-primary-800",
          status == 'done' && "border-success-800",
        ])}
        variant="ghost"
      >
        Agregar Tarea
      </Button>

    </div>
  );
};
