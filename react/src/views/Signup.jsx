import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import {useState} from "react";
import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import router from "../router.jsx";
import {Link} from "react-router-dom";

export default function Signup() {
    const {setCurrentUser,setUserToken}=useStateContext();
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [passwordConfirmation,setPasswordConfirmation]=useState('');
    const [error,setError]=useState({__html:''});
    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });


        axiosClient
            .post("/users/register", {
                name: fullName,
                email,
                password,
                password_confirmation: passwordConfirmation,
            })
            .then(({ data }) => {
                setCurrentUser(data.user)
                setUserToken(data.token)
                console.log(data)
                window.location.href = '/';
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
                    console.log(finalErrors)
                    setError({__html: finalErrors.join('<br>')})
                }
                console.error(error)
            });
    };
    return (
        <Card className='absolute text-center left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form onSubmit={onSubmit} method="POST" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input required value={fullName} onChange={ev=>setFullName(ev.target.value)} size="lg" label="Name" />
                    <Input required type="email" autoComplete="email" value={email} onChange={ev=>setEmail(ev.target.value)} size="lg" label="Email" />
                    <Input required type="password" size="lg" autoComplete="current-password" value={password} onChange={ev=>setPassword(ev.target.value)}  label="Password" />
                    <Input required type="password" size="lg" value={passwordConfirmation} onChange={ev=>setPasswordConfirmation(ev.target.value)} label="Confirm Password" />
                </div>
                <Checkbox
                    label={
                        (
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-blue-500"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        )
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button type="submit" className="mt-6" fullWidth>
                    Register
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <Link to='/login'
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign In
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}
