import React, { useState, useContext } from "react";
import * as S from "./styles";
import Edit from "../../Img/edit.svg";
import Erase from "../../Img/erase.svg";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";
import { EditContext } from "../../Contexts/editContext";
import { EditType } from "../../Contexts/editType";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  list: string;
  categorie: string;
  color: string;
  completed: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  categorie,
  list,
  color,
  completed,
}) => {
  const { setShowDelete, setId } = useContext(DeleteContext) as DeleteType;
  const { checkTask } = useContext(TaskListContext) as TaskListType;
  const { setEditId, setTodo, setShowEdit } = useContext(
    EditContext
  ) as EditType;

  function handleCheck() {
    checkTask(id, !completed);
  }

  function handleDelete() {
    setShowDelete(true);
    setId(id);
  }

  function handleEdit() {
    setShowEdit(true);
    setEditId(id);
    setTodo({
      title: title,
      categorie: categorie,
      description: description,
      color: color,
      completed: completed,
    });
  }

  return (
    <S.Container>
      <S.CheckField>
        <S.CheckboxRing onClick={handleCheck}>
          <S.CheckFill done={completed} />
        </S.CheckboxRing>
      </S.CheckField>
      <S.Description>
        <S.Name done={completed}>{title}</S.Name>
        <S.DescriptionText>{description}</S.DescriptionText>
        <S.ListBelong>
          <S.ColorTag color={color} />
          <S.ListName>{list}</S.ListName>
        </S.ListBelong>
      </S.Description>

      <S.Icon src={Edit} onClick={handleEdit} />
      <S.Icon src={Erase} onClick={handleDelete} />
    </S.Container>
  );
};

export default TaskCard;
