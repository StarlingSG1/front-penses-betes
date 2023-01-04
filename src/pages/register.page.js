import { Button, GradientButton, Input, Paragraph, TextLink, Title } from "../components/atoms";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { registerUser } from "../api/auth/auth";
import { useUserContext } from "../context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Header, Template } from "../components/molecules";
import { AuthInput } from "../components/atoms/Input/AuthInput";

export default function Register() {

    const { user, setHeadActive } = useUserContext();

    const [userCredentials, setUserCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        conditions: false,
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const registerTheUser = async (e) => {
        e.preventDefault()
        setLoading(true);
        if (userCredentials?.firstName !== "" && userCredentials?.lastName !== "" && userCredentials?.phone !== "" && userCredentials?.email !== "" && userCredentials?.password !== "" && userCredentials?.confirmPassword !== "" && userCredentials?.conditions) {
            if (userCredentials?.password === userCredentials?.confirmPassword) {

                const response = await registerUser(userCredentials);
                if (response) {
                    toast.success("Votre compte a bien été créé");
                    navigate("/login");
                } else {
                    toast.error("Cette adresse mail est déjà utilisée");
                }

            } else {
                toast.error("Les mots de passe ne correspondent pas");
            }
        } else {
            toast.error("Tous les champs doivent être renseignés");
        }
        setLoading(false);
    }

    useEffect(() => {
        setHeadActive(3)
    }, [])

    
    return (
        <Template>
            <Title className="mb-10 sm:mb-[60px]">Inscription</Title>
            <form onSubmit={registerTheUser} className="flex flex-col w-full gap-[15px]">
                <div className="flex sm:flex-row flex-col gap-[15px] sm:gap-5">
                    <AuthInput onChange={(e) => setUserCredentials({ ...userCredentials, firstName: e.target.value })} placeholder={"Prénom"} />
                    <AuthInput onChange={(e) => setUserCredentials({ ...userCredentials, lastName: e.target.value })} placeholder={"Nom"} />
                </div>
                <AuthInput onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })} type="email" placeholder={"Adresse email"} />
                <AuthInput onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })} type="password" placeholder={"Mot de passe"} />
                <AuthInput onChange={(e) => setUserCredentials({ ...userCredentials, confirmPassword: e.target.value })} type="password" placeholder={"Confirmer mot de passe"} />
                <div className="flex items-start gap-2.5">
                    <input type="checkbox" onChange={(e) => { setUserCredentials({ ...userCredentials, conditions: e.target.checked }) }} className="mt-[5px] border bg-transparent" />
                    <Paragraph>J’accepte les conditions générales d’utilisations de Comptheures.fr. De ce fait, je permet à l’application d’utiliser mes informations personnelles uniquement dans le cas de la gestion de mon compte.</Paragraph>
                </div>
                <div className="flex flex-col items-center gap-[15px] mt-[15px]">
                    <GradientButton type="submit">S'inscrire</GradientButton>
                    <Paragraph className="text-center">Déjà un compte ? <TextLink href="/login">Se connecter</TextLink></Paragraph>
                </div>
            </form>
        </Template>
    )
}