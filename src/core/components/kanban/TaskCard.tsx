import { Task } from "@/interfaces";
import { useTaskStore } from "@/store/task.store";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ModalContent,
  ModalFooter,
  Modal,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import clsx from "clsx";
import { IoTrashBinOutline } from "react-icons/io5";

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);
  const removeDraggingTaskId = useTaskStore(
    (state) => state.removeDraggingTaskId
  );

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleDeleteTask = (cb: () => void) => {
    deleteTask(task.id);
    cb();
  };

  return (
    <Card
      draggable
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={removeDraggingTaskId}
      className={clsx([
        "my-4 cursor-grab",
        // task.status == 'pending' && "bg-warning-800",
        // task.status == 'in-progress' && "bg-primary-800",
        // task.status == 'done' && "bg-success-800",
      ])}
    >
      <CardHeader
        className={clsx([
          "pb-0 pt-2 px-4 flex-col items-start",
          // "text-black"
        ])}
      >
        <small className="text-default-500">
          {task.assigned_to_user.username}
        </small>
        <h4 className="font-bold text-large">{task.name}</h4>
      </CardHeader>
      <CardBody className="text-small text-default-400">
        <p>{task.description}</p>
      </CardBody>
      {task.status == "done" && (
        <CardFooter className="flex justify-end items-center">
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            placement="center"
            className="dark text-foreground bg-background"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Eliminar tarea {task.name}?
                  </ModalHeader>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" onPress={() => handleDeleteTask(onClose)}>
                      Confirmar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Button
            className="p-0 m-0"
            size="sm"
            isIconOnly
            variant="light"
            color="danger"
            aria-label="Like"
            onClick={onOpen}
          >
            <IoTrashBinOutline size={24} />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
