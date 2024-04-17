import { PageContainer } from "@/core/components";
import { useTaskStore } from "@/store/task.store";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, CircularProgress } from "@nextui-org/react";



export const TaskListPage = () => {

  const tasks = useTaskStore(state => state.tasks);
  const isLoading = useTaskStore(state => state.isLoading);

  if (isLoading || tasks.length === 0) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-full w-full">
          <CircularProgress size="lg" aria-label="cargando..." />
        </div>
      </PageContainer>
    );
  }

  const columns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'NAME'
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
    },
    {
      key: 'status',
      label: 'STATUS',
    }
  ];
  



  return (
    <PageContainer>
      <div className="mx-auto">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={tasks}>
            {(item) => (
              <TableRow key={`task-${item.id}`}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PageContainer>
  );
};