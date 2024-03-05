import { useGoogleLogin, hasGrantedAllScopesGoogle } from "@react-oauth/google";

// hooks
import { useContext, useState, useEffect } from "react";

// react-bootstrap
import { Button } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";

const GoogleButton = ({ scopes }) => {
    const [tokenResponse, setTokenResponse] = useState(null);
    const [hasAccess, setHasAccess] = useState(false);
    const { loginWithGoogle } = useContext(AuthContext);

    useEffect(() => {
        if (tokenResponse) {
            const access = hasGrantedAllScopesGoogle(tokenResponse, ...scopes);
            setHasAccess(access);
        }
    }, [tokenResponse, scopes]);

    const handleSuccess = (response) => {
        setTokenResponse(response);
        loginWithGoogle(response.tokenId);
    };

    const handleFailure = (error) => {
        console.error("Error logging in with Google:", error);
    };

    const signIn = useGoogleLogin({
        onSuccess: handleSuccess,
        onFailure: handleFailure,
        flow: "redirect",
    });

    const handleClick = (event) => {
        event.preventDefault();
        signIn();
    };

    return (
        <Button
            onClick={handleClick}
            type="submit"
            className={`btn-secondary border-0 w-100 px-3 ${
                hasAccess ? "has-access" : ""
            }`}
            disabled={hasAccess}>
            {hasAccess ? (
                <span>
                    <i className="bi bi-check-circle-fill mr-1"></i> Acceso
                    concedido
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
