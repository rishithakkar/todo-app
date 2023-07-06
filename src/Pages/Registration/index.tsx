import React, { useState, useContext } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link, useNavigate  } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import { SERVER_URL } from "../../Contexts/taskListContext";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const navigate = useNavigate ();
  const { setUserData } = useContext(AuthContext) as AuthType;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleRegistration() {
    // validate username
    if (username.trim().length < 3) {
      toast.error("Username must have at least 3 characters");
      return;
    }
    // validate password
    if (password.trim().length < 6) {
      toast.error("Password must have at least 6 characters");
      return;
    }

    // validate password and confirmPassword
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    // Call API for register
    fetch(`${SERVER_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Something went wrong");
          });
        }
      })
      .then((data) => {
        toast.success(data.message);
        setUserData({ userId: data.user_id });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function handleUserName(event: React.ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }

  return (
    <S.Page>
      <S.LeftSide>
        <S.Img src={Logo}></S.Img>
      </S.LeftSide>
      <S.RightSide>
        <S.Title>Registration to Tasker</S.Title>
        <S.Subtitle>Please, register yourself to access your tasks.</S.Subtitle>
        <S.FieldName>Username</S.FieldName>
        <S.InputField
          value={username}
          id="email"
          onChange={handleUserName}
          placeholder="Insert your email"
        />
        <S.FieldName>Password</S.FieldName>
        <S.InputField
          placeholder="Insert your password"
          type="password"
          onChange={handlePassword}
        />
        <S.FieldName>Confirm Password</S.FieldName>
        <S.InputField
          placeholder="Insert your password"
          type="password"
          onChange={handleConfirmPassword}
        />

        <S.SignIn onClick={handleRegistration}>Sign Up</S.SignIn>

        <S.Subtitle>
          Already have an account? <Link to="/login">Sign In</Link>
        </S.Subtitle>
      </S.RightSide>
    </S.Page>
  );
};

export default Signup;
