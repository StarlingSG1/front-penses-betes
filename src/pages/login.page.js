import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, GradientButton, Input, Paragraph, TextLink, Title } from "../components/atoms";
import { Header, Template } from "../components/molecules";
import { useUserContext } from "../context";
import { useNavigate } from "react-router-dom";
import { AuthInput } from "../components/atoms/Input/AuthInput";


export default function Login() {

    const { loading, loginTheUser = () => { }, setLoading, noLogged, setHeadActive } = useUserContext();
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleOnClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await loginTheUser(userCredentials)
        console.log(response);
        if (!response.error) {
            navigate("/")
        } else {
            toast.error(response.message)
        }
        setLoading(false);
    }

    useEffect(() => { setLoading(false); setHeadActive(2) }, [])

    return (
        <Template>
            <Title className="mb-10 sm:mb-[60px]">Connexion</Title>
            <form onSubmit={handleOnClick} className="flex flex-col w-full gap-[15px]">
                <AuthInput onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })} type="email" placeholder="Adresse email" />
                <AuthInput onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })} type="password" placeholder="Mot de passe" />
                <div className="flex sm:flex-row flex-col sm:justify-between gap-[15px]">
                    <div className="flex items-center gap-2.5">
                        <input type="checkbox" className="border bg-transparent" />
                        <Paragraph>Se souvenir de moi</Paragraph>
                    </div>
                    <TextLink>mot de passe oublié</TextLink>
                </div>
                <div className="flex flex-col items-center gap-[15px] mt-[15px]">
                    <GradientButton type="submit">Se connecter</GradientButton>
                    <Paragraph className="text-center">Pas de compte ? <TextLink href="/register">S'inscrire</TextLink></Paragraph>
                </div>
            </form>
        </Template>
    );
}