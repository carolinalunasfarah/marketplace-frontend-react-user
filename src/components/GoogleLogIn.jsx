import { GoogleLogin } from "@react-oauth/google";

export function LoginGoogle() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    return <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />;
}
