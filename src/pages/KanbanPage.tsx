import { PageContainer } from "@/core/components";
import { Board, NewTaskModal } from "@/core/components/kanban";
import { useNewTaskModal } from "@/hooks";

export const KanbanPage = () => {

  const { 
    isOpen, 
    onOpen,
    onOpenChange, 
    newTaskStatus, 
    handleOpenNewTaskModal 
  } = useNewTaskModal();

  return (
    <PageContainer center>
      <NewTaskModal
        newTaskStatus={newTaskStatus}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <Board openNewTaskModal={handleOpenNewTaskModal} status="pending" />
      <Board openNewTaskModal={handleOpenNewTaskModal} status="in-progress" />
      <Board openNewTaskModal={handleOpenNewTaskModal} status="done" />
    </PageContainer>
  );
};
