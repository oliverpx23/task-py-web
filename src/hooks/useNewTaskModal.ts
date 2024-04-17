import { TaskStatus } from "@/interfaces";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

export const useNewTaskModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newTaskStatus, setnewTaskStatus] = useState<TaskStatus>("pending");

  const handleOpenNewTaskModal = (status: TaskStatus = "pending") => {
    setnewTaskStatus(status);
    onOpen();
  };

  return {
    isOpen,
    onOpen,
    onOpenChange,
    newTaskStatus,
    handleOpenNewTaskModal,
  };
};
