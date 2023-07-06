import React from "react";
import { DeleteContextProvider } from "./Contexts/deleteContext";
import { TaskListContextProvider } from "./Contexts/taskListContext";
import { ChildrenProps } from "./Contexts/deleteContext";
import { CategoriesContextProvider } from "./Contexts/categoriesContext";
import { AddContextProvider } from "./Contexts/addContext";
import { AuthProvider } from "./Contexts/authContext";
import { EditContextProvider } from "./Contexts/editContext";

const ContextProviders: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <AuthProvider>
      <TaskListContextProvider>
        <DeleteContextProvider>
          <AddContextProvider>
            <EditContextProvider>
              <CategoriesContextProvider>{children}</CategoriesContextProvider>
            </EditContextProvider>
          </AddContextProvider>
        </DeleteContextProvider>
      </TaskListContextProvider>
    </AuthProvider>
  );
};

export default ContextProviders;
