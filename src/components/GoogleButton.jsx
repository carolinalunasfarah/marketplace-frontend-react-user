// hooks
import { useState, useEffect } from "react";
import { useGoogleLogin, hasGrantedAllScopesGoogle } from "@react-oauth/google";

// react-bootstrap
import { Button } from "react-bootstrap";

const GoogleButton = ({ onSuccess, scopes }) => {
    const [tokenResponse, setTokenResponse] = useState(null);

    useEffect(() => {
        if (tokenResponse) {
            const access = hasGrantedAllScopesGoogle(tokenResponse, ...scopes);
            console.log("Access granted:", access);
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

    const handleClick = () => {
        login();
    };

    return (
        <Button
            onClick={handleClick}
            type="submit"
            className="btn-secondary border-0 w-100 px-3">
            <i class="bi bi-google"></i> Tu cuenta de Google
        </Button>
    );
};

export default GoogleButton;
