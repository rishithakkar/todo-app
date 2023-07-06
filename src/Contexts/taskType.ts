export interface TaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  categorie: string;
  color: string;
}

export interface CreateTaskProps {
  title: string;
  description: string;
  completed: boolean;
  categorie: string;
  color: string;
}

export type TaskListType = {
  taskList: TaskProps[];
  doneTasks: TaskProps[];
  notDoneTasks: TaskProps[];
  addTask: (task: CreateTaskProps) => void;
  editTask: (id: string, task: CreateTaskProps) => void;
  checkTask: (id: string, isCompleted: boolean) => void;
  deleteTask: (id: string) => void;
};
