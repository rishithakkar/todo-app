import React, { useContext, useState } from "react";
import * as S from "./styles";
import { AddContext } from "../../Contexts/addContext";
import { AddType } from "../../Contexts/addType";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType, CreateTaskProps } from "../../Contexts/taskType";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategorieContextType } from "../../Contexts/categoriesType";

const AddModal: React.FC = () => {
  const { addTask } = useContext(TaskListContext) as TaskListType;
  const { categList } = useContext(CategoriesContext) as CategorieContextType;
  const { setShowAdd } = useContext(AddContext) as AddType;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskCat, setTaskCat] = useState(
    categList.findIndex((cat) => cat.name === "None")
  );

  function handleCancel() {
    setShowAdd(false);
  }

  function handleAdd() {
    const newTask: CreateTaskProps = {
      title: title,
      description: description,
      categorie: categList[taskCat].name,
      color: categList[taskCat].color,
      completed: false,
    };

    setShowAdd(false);
    addTask(newTask);
  }

  var e = document.getElementById("select") as HTMLSelectElement;

  function handleChange() {
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
            <option
              key={cat.id}
              style={{ backgroundColor: cat.color }}
              value={cat.id}>
              {cat.name}
            </option>
          ))}
        </S.Select>

        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton onClick={handleAdd}>Add</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddModal;
