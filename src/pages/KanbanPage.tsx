import { PageContainer } from "@/core/components";
import { Board } from "@/core/components/kanban";

export const KanbanPage = () => {


  return (
    <PageContainer center>
      <Board status="pending" />
      <Board status="in-progress" />
      <Board status="done"/>
    </PageContainer>
  );
};
