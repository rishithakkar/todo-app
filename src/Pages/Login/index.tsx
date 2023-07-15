import React, { useState, useContext } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import { SERVER_URL } from "../../Contexts/taskListContext";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const { setUserData, handleLoading } = useContext(AuthContext) as AuthType;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // Validate username and password
    if (username.trim() === "" || password.trim() === "") {
      toast.error("Username and Password are required");
      return;
    }
    // Call API for login
    handleLoading(true);
    fetch(`${SERVER_URL}/login`, {
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
        handleLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        handleLoading(false);
      });
  }

  function handleUserName(event: React.ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <S.Page>
      <S.LeftSide>
        <S.Img src={Logo}></S.Img>
      </S.LeftSide>
      <S.RightSide>
        <S.Title>Welcome to Tasker</S.Title>
        <S.Subtitle>
          Please, insert your informations to access your tasks.
        </S.Subtitle>
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
        {/* <S.KeepSigned>
          <S.Checkbox />
          <S.Subtitle>Remember me</S.Subtitle>
        </S.KeepSigned> */}
        {/* <Link to="/">
          <S.SignIn onClick={handleLogin}>Sign In</S.SignIn>
        </Link> */}
        <S.SignIn onClick={handleLogin}>Sign In</S.SignIn>
        <S.Subtitle>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </S.Subtitle>
      </S.RightSide>
    </S.Page>
  );
};

export default Login;
