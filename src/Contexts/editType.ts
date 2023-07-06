import { CreateTaskProps } from "./taskType";

export type EditType = {
  showEdit: boolean;
  setShowEdit: Function;
  id: string;
  setEditId: Function;
  todo: CreateTaskProps;
  setTodo: Function;
};
