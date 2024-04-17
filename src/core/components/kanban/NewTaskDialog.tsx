import { TaskDto, TaskStatus, User } from "@/interfaces";
import { useTaskStore, useUsersStore } from "@/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  AutocompleteItem,
  Autocomplete,
} from "@nextui-org/react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  newTaskStatus: TaskStatus;
}

export interface TaskForm {
  id: number;
  name: string;
  description: string;
  "assigned_to": number | string;
  status: TaskStatus;
}

export const NewTaskModal = ({
  isOpen,
  onOpenChange,
  newTaskStatus,
}: Props) => {

  const users = useUsersStore((state) => state.users);
  const isLoading = useUsersStore((state) => state.isLoading);
  const getUsers = useUsersStore(state => state.getUsers);

  const isSaving = useTaskStore((state) => state.isSaving);
  const addTask = useTaskStore(state => state.addTask);

  const {
    register,
    handleSubmit,
    setValue,
    watch,

  } = useForm<TaskForm>();

  const onSubmit: SubmitHandler<TaskForm> = (data) => {

    const taskDto: TaskDto = {
      name: data.name,
      description: data.description,
      assigned_to: users.find(user => user.username === (data.assigned_to as string))!.id,
      status: data.status,
    };

    addTask(taskDto);
    onOpenChange(false);
  }

  useEffect(() => {
    getUsers()
  }, [getUsers]);

  return (
    <Modal
      backdrop="blur"
      className="dark text-foreground bg-background"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      isDismissable={false}
      
    >
      <form onSubmit={handleSubmit(onSubmit)}>  
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nueva Tarea
              </ModalHeader>

              <ModalBody>
                  <Input
                    isRequired
                    autoFocus
                    label="Titulo"
                    placeholder="Ingresa el nombre de la tarea"
                    variant="bordered"
                    {...register('name')}
                    value={watch('name') || ''}
                    onChange={() => {}} // avoid warning
                    onValueChange={value => setValue('name', value)}
                    
                  />

                  <Textarea
                    isRequired
                    label="Descripción"
                    placeholder="Describe a detalle la tarea"
                    variant="bordered"
                    {...register('description')}
                    value={watch('description') || ''}
                    onChange={() => {}} // avoid warning
                    onValueChange={value => setValue('description', value)}
                  />

                  <Select
                    isRequired
                    variant="bordered"
                    label="Estado"
                    defaultSelectedKeys={[newTaskStatus]}
                    {...register('status')}
                    value={watch('status') || ''}
                    onChange={() => {}} // avoid warning
                    onSelectionChange={value => 
                      setValue('status',((value.valueOf() as any).currentKey))
                    }
                  >
                    <SelectItem key="pending" value={"pending"}>
                      Pendiente
                    </SelectItem>

                    <SelectItem key="in-progress" value={"in-progress"}>
                      En progreso
                    </SelectItem>

                    <SelectItem key="done" value={"done"}>
                      Finalizado
                    </SelectItem>
                  </Select>

                  <Autocomplete
                    className="dark text-foreground bg-background"
                    isRequired
                    isLoading={isLoading}
                    variant="bordered"
                    defaultItems={users}
                    label="Asignar a"
                    placeholder="A quien se asigna esta tarea?"
                    {...register('assigned_to')}
                    value={watch('assigned_to') || ''}
                    onChange={() => {}} // avoid warning
                    onSelectionChange={key => {
                      setValue('assigned_to', Number(key.valueOf()))
                    }}
                  >
                    {(users: User) => (
                      <AutocompleteItem
                        key={users.id} 
                        value={users.id}
                      >
                        {users.username}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>

                
              </ModalBody>

              <ModalFooter>
                <Button 
                  disabled={isSaving} 
                  color="danger" 
                  variant="flat" 
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button 
                  isLoading={isSaving}
                  disabled={isSaving} 
                  type="submit" 
                  color="primary" 
                  onPress={() => handleSubmit(onSubmit)}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
};
