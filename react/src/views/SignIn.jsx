import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Link, Navigate} from "react-router-dom";
import axiosClient from "../axios.js";
import router from "../router.jsx";


export default function SignIn() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState({__html:''});
    const {setCurrentUser,setUserToken}=useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });

        axiosClient
            .post("/users/login", {
                email,
                password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
                window.location.href = '/';
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce(
                        (accum, next) => [...accum, ...next],
                        []
                    );
                    setError({ __html: finalErrors.join("<br>") });
                }
                console.error(error);
            });
    };

    // useEffect(())
    return (
        <Card className='absolute text-center left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to sign in.
            </Typography>
            <form onSubmit={onSubmit} method="POST" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input required type="email" autoComplete="email" value={email} onChange={ev=>setEmail(ev.target.value)} size="lg" label="Email" />
                    <Input required type="password" size="lg" autoComplete="current-password" value={password} onChange={ev=>setPassword(ev.target.value)}  label="Password" />

                </div>

                <Button type='submit' className="mt-6" fullWidth>
                    Sign In
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                   You do not have an account?{" "}
                    <Link to='/register'
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign Up
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}
