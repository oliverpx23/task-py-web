import { PageContainer } from "@/core/components";
import { useTaskStore } from "@/store/task.store";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";



export const TaskListPage = () => {

  const tasks = useTaskStore(state => state.tasks);

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
    </PageContainer>
  );
};