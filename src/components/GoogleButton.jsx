// hooks
import { useState, useEffect } from "react";
import { useGoogleLogin, hasGrantedAllScopesGoogle } from "@react-oauth/google";

// react-bootstrap
import { Button } from "react-bootstrap";

const GoogleButton = ({ onSuccess, scopes }) => {
  const [tokenResponse, setTokenResponse] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (tokenResponse) {
      const access = hasGrantedAllScopesGoogle(tokenResponse, ...scopes);
      setHasAccess(access);
    }
  }, [tokenResponse, scopes]);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setTokenResponse(response);
      if (onSuccess) {
        onSuccess(response);
      }
    },
    flow: "auth-code",
  });

  const handleClick = async (event) => {
    event.preventDefault()
    login();
  };

  return (
    <Button
      onClick={handleClick}
      type="submit"
      className={`btn-secondary border-0 w-100 px-3 ${hasAccess ? 'has-access' : ''}`}
      disabled={hasAccess}
    >
      {hasAccess ? (
        <span>
          <i className="bi bi-check-circle-fill mr-1"></i> Acceso concedido
        </span>
      ) : (
        <span>
          <i className="bi bi-google mr-1"></i> Tu cuenta de Google
        </span>
      )}
    </Button>
  );
};

export default GoogleButton;
