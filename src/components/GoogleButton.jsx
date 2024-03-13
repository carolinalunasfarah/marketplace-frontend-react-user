import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const GoogleButton = () => {
    const { loginWithGoogle, registerWithGoogle } = useContext(AuthContext);

    const handleSuccess = (response) => {
        // Aquí decides si es un inicio de sesión o un registro
        // Puedes usar algún estado o prop para determinarlo
        const isLogin = true; // Por ejemplo, aquí asumimos que es un inicio de sesión
        if (isLogin) {
            loginWithGoogle(response.tokenId);
        } else {
            registerWithGoogle(response.tokenId);
        }
    };

    const handleFailure = (error) => {
        console.error("Error logging in with Google:", error);
    };

    const signIn = useGoogleLogin({
        onSuccess: handleSuccess,
        onFailure: handleFailure,
        flow: "redirect",
    });

    return (
        <Button onClick={signIn} className="btn-secondary border-0 w-100 px-3">
            <i className="bi bi-google mr-1"></i> Tu cuenta de Google
        </Button>
    );
};

export default GoogleButton;
