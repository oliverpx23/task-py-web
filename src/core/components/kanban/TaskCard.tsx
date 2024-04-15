import { Task } from "@/interfaces";
import { useTaskStore } from "@/store/task.store";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {

  const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);
  const removeDraggingTaskId = useTaskStore((state) => state.removeDraggingTaskId);

  return (
    <Card 
      draggable
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={removeDraggingTaskId}
      className="my-4 cursor-grab">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <small className="text-default-500">{task.assignedTo.username}</small>
        <h4 className="font-bold text-large">{task.name}</h4>
      </CardHeader>
      <CardBody className="text-small text-default-400">
        <p>{task.description}</p>
      </CardBody>
    </Card>
  );
};
