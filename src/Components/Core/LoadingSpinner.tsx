import React, { useContext } from "react";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import { SpinnerContainer, StyledSpinner } from "./styles";

const LoadingSpinnerComponent: React.FC = () => {
  const { loading } = useContext(AuthContext) as AuthType;

  return loading ? (
    <SpinnerContainer>
      <StyledSpinner viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="2"
        />
      </StyledSpinner>
      Please wait for a moment... Server is responding...
    </SpinnerContainer>
  ) : (
    <></>
  );
};

export default LoadingSpinnerComponent;
