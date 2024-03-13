import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const GoogleButton = ({ isLogin }) => {
    const { accessWithGoogle } = useContext(AuthContext);

    const handleSuccess = (response) => {
        accessWithGoogle(response.tokenId, isLogin);
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
