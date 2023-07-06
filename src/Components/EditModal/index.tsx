import React, { useContext, useState, useEffect } from "react";
import * as S from "./styles";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType, CreateTaskProps } from "../../Contexts/taskType";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategorieContextType } from "../../Contexts/categoriesType";
import { EditContext } from "../../Contexts/editContext";
import { EditType } from "../../Contexts/editType";

const EditModal: React.FC = () => {
  const { editTask } = useContext(TaskListContext) as TaskListType;
  const { categList } = useContext(CategoriesContext) as CategorieContextType;
  const { id, showEdit, setShowEdit, todo } = useContext(
    EditContext
  ) as EditType;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskCat, setTaskCat] = useState(
    categList.findIndex((cat) => cat.name === "None")
  );

  useEffect(() => {
    if (showEdit === false) return;

    setTitle(todo.title);
    setDescription(todo.description);
    console.log("todo.categorie", todo.categorie);
    console.log(
      "categList: ",
      categList.find((cat) => cat.name === todo.categorie)?.id
    );
    setTaskCat(
      Number(categList.find((cat) => cat.name === todo.categorie)?.id) || 0
    );
  }, [showEdit, todo]);

  function handleCancel() {
    setShowEdit(false);
  }
  console.log("taskCat: ", taskCat);
  function handleEdit() {
    const updatedTask: CreateTaskProps = {
      title: title,
      description: description,
      categorie: categList[taskCat].name,
      color: categList[taskCat].color,
      completed: false,
    };

    setShowEdit(false);
    editTask(id, updatedTask);
  }

  function handleChange() {
    const e = document.getElementById("select") as HTMLSelectElement;
    console.log('first', Number(e.options[e.selectedIndex].value));

    setTaskCat(Number(e.options[e.selectedIndex].value));
  }

  return (
    <S.Background>
      <S.Container>
        <S.Text>Title</S.Text>
        <S.TitleInput
          placeholder="I can do it!"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <S.Text>Description</S.Text>
        <S.DescriptionInput
          placeholder="I will do it because..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <S.Text>Select a categorie</S.Text>
        <S.Select id="select" onChange={handleChange}>
          {categList.map((cat) => (
            <option style={{ backgroundColor: cat.color }} value={taskCat}>
              {cat.name}
            </option>
          ))}
        </S.Select>

        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton onClick={handleEdit}>Update</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default EditModal;
