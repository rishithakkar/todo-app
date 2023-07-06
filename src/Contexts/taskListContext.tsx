import React, { useState, createContext, useEffect, useContext } from "react";
import { TaskProps, TaskListType, CreateTaskProps } from "./taskType";
import { toast } from "react-toastify";
import AuthContext, { AuthType } from "./authContext";

interface ChildrenProps {
  children: React.ReactNode;
}

export const SERVER_URL = "https://todo-list-flask-ga9f.onrender.com";

export const TaskListContext = createContext<TaskListType | null>(null);

export const TaskListContextProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const { userData } = useContext(AuthContext) as AuthType;
  const [taskList, setTaskList] = useState<TaskProps[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskProps[]>([]);
  const [notDoneTasks, setNotDoneTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    // Fetch todos from server and set state
    if (!userData.userId) return;
    fetch(`${SERVER_URL}/todos`, {
      method: "GET",
      headers: {
        Userid: userData.userId as string,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        }
      })
      .then((data) => {
        const todos = data?.todos;
        if (todos && todos.length > 0) {
          setTaskList(todos);
          setDoneTasks(
            todos.filter((task: TaskProps) => task.completed === true)
          );
          setNotDoneTasks(
            todos.filter((task: TaskProps) => task.completed === false)
          );
        } else {
          setTaskList([]);
          setDoneTasks([]);
          setNotDoneTasks([]);
          toast.info("No tasks found");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [userData.userId]);

  const addTask = (task: CreateTaskProps) => {
    fetch(`${SERVER_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Userid: userData.userId as string,
      },
      body: JSON.stringify(task),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        }
      })
      .then((data) => {
        const newTask = data?.todo;
        if (newTask) {
          setTaskList([...taskList, newTask]);
          setNotDoneTasks([...notDoneTasks, newTask]);
          toast.success("Task added");
        } else {
          toast.error("Task not added");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const editTask = (id: string, task: CreateTaskProps) => {
    fetch(`${SERVER_URL}/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Userid: userData.userId as string,
      },
      body: JSON.stringify(task),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        }
      })
      .then((data) => {
        const updatedTask = data?.todo;
        if (updatedTask) {
          taskList.map((task: TaskProps) => {
            if (task.id === id) {
              task.title = updatedTask.title;
              task.description = updatedTask.description;
              task.completed = updatedTask.completed;
              task.categorie = updatedTask.categorie;
              task.color = updatedTask.color;
            }
          });
          setTaskList([...taskList]);
          setDoneTasks(
            taskList.filter((task: TaskProps) => task.completed === true)
          );
          setNotDoneTasks(
            taskList.filter((task: TaskProps) => task.completed !== true)
          );
          toast.success("Task edited");
        } else {
          toast.error("Task not edited");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const checkTask = (id: string, isCompleted: boolean) => {
    // update completed status
    fetch(`${SERVER_URL}/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Userid: userData.userId as string,
      },
      body: JSON.stringify({ completed: isCompleted }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        }
      })
      .then((data) => {
        const updatedTask = data?.todo;
        if (updatedTask) {
          taskList.map((task: TaskProps) => {
            if (task.id === id) {
              task.completed = !task.completed;
            }
          });
          setTaskList([...taskList]);
          setDoneTasks(
            taskList.filter((task: TaskProps) => task.completed === true)
          );
          setNotDoneTasks(
            taskList.filter((task: TaskProps) => task.completed !== true)
          );
          toast.success(`Task ${isCompleted ? "completed" : "not completed"}`);
        } else {
          toast.error("Task not updated");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const deleteTask = (id: string) => {
    fetch(`${SERVER_URL}/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Userid: userData.userId as string,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        }
      })
      .then((data) => {
        const index = taskList.findIndex((task: TaskProps) => task.id === id);
        taskList.splice(index, 1);
        setTaskList([...taskList]);
        setDoneTasks(
          taskList.filter((task: TaskProps) => task.completed === true)
        );
        setNotDoneTasks(
          taskList.filter((task: TaskProps) => task.completed !== true)
        );
        toast.success("Task deleted");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <TaskListContext.Provider
      value={{
        taskList,
        doneTasks,
        notDoneTasks,
        addTask,
        editTask,
        checkTask,
        deleteTask,
      }}>
      {children}
    </TaskListContext.Provider>
  );
};
