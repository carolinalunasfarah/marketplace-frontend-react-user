import { useGoogleLogin, hasGrantedAnyScopeGoogle } from "@react-oauth/google";
import { useContext } from "react";

// react-bootstrap
import { Button } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";

const GoogleButton = ({ isLogin }) => {
    const { accessWithGoogle } = useContext(AuthContext);

    const handleSuccess = async (response) => {
        const hasAccess = hasGrantedAnyScopeGoogle(
            response.tokenId,
            'profile',
            'email'
        );

        if (hasAccess) {
            await accessWithGoogle(response.tokenId, isLogin);
        } else {
            console.error("No tienes acceso a los alcances necesarios de Google.");
        }
    };

    const handleFailure = (error) => {
        console.error("Error logging in with Google:", error);
    };

    const signIn = useGoogleLogin({
        onSuccess: handleSuccess,
        onFailure: handleFailure,
        flow: "auth-code",
        scopes: ["profile", "email"] 
    });

    return (
        <Button onClick={signIn} className="btn-secondary border-0 w-100 px-3">
            <i className="bi bi-google mr-1"></i> Tu cuenta de Google
        </Button>
    );
};

export default GoogleButton;
