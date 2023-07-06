import React, { useState, createContext } from "react";
import { EditType } from "./editType";
import { CreateTaskProps } from "./taskType";

export interface ChildrenProps {
  children: React.ReactNode;
}

export const EditContext = createContext<EditType | null>(null);

export const EditContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [id, setEditId] = useState("");
  const [todo, setTodo] = useState<CreateTaskProps>({} as CreateTaskProps);

  return (
    <EditContext.Provider
      value={{ showEdit, setShowEdit, todo, setTodo, id, setEditId }}>
      {children}
    </EditContext.Provider>
  );
};
