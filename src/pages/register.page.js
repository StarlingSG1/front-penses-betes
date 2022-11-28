import { Button, Input, Paragraph } from "../components/atoms";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { registerUser } from "../api/auth/auth";
import { useUserContext } from "../context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Header } from "../components/molecules";

export default function Register() {

    const { user } = useUserContext();

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
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
                ;
                if (passwordRegex.test(userCredentials?.password)) {
                    const response = await registerUser(userCredentials);
                    if (response) {
                        toast.success("Votre compte a bien été créé");
                        navigate("/login");
                    } else {
                        toast.error("Cette adresse mail est déjà utilisée");
                    }
                } else {
                    toast.error("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
                }
            } else {
                toast.error("Les mots de passe ne correspondent pas");
            }
        } else {
            toast.error("Tous les champs doivent être renseignés");
        }
        setLoading(false);
    }

    if (user) {
        navigate.push("/");
        return (<div></div>)
    } else {
        return (
            <>
            <Header/>
            <main className="max-w-[800px] w-full mx-auto px-[2.5%]">
            <h2 className="text-center text-3xl font-montserrat font-medium my-10">Inscription</h2>

                <div className="w-full m-auto">
                    <form onSubmit={(e) => { registerTheUser(e) }}>
                        <div className=" gap-4 flex flex-col items-center relative bg-blue z-10">
                            <div className=" flex sm:flex-row flex-col items-center sm:justify-between sm:gap-0 gap-4 w-full">
                                <Input
                                    type="text"
                                    className={"sm:w-[47.5%]"}
                                    placeholder={"Prénom"}
                                    onChange={(e) => { setUserCredentials({ ...userCredentials, firstName: e.target.value }) }}
                                    />
                                <Input type="text" className={"sm:w-[47.5%]"} placeholder={"Nom"} onChange={(e) => { setUserCredentials({ ...userCredentials, lastName: e.target.value }) }} />
                            </div>
                            <Input type="email" placeholder={"Adresse mail"} onChange={(e) => { setUserCredentials({ ...userCredentials, email: e.target.value }) }} />
                            <Input type="password" placeholder={"Mot de passe"} onChange={(e) => { setUserCredentials({ ...userCredentials, password: e.target.value }) }} />
                            <Input type="password" placeholder={"Confirmer mot de passe"} onChange={(e) => { setUserCredentials({ ...userCredentials, confirmPassword: e.target.value }) }} />
                            <div className="flex items-center w-full gap-2">
                                <input type="checkbox" className="w-[18px] aspect-square h-[18px] border border-gray-400 !text-red accent-red rounded-sm" onChange={(e) => { setUserCredentials({ ...userCredentials, conditions: e.target.checked }) }} />
                                <Paragraph className="text-sm  text-gray-400  text-base">J'accepte les <Link to="/politique-de-confidentialite" className="!text-base">conditions générales d'utilisation</Link>.</Paragraph>
                            </div>
                        </div>

                        <div className="flex sm:flex-row flex-col-reverse justify-between items-center relative mt-[25px] z-10 pl-8 pr-[15px]">
                            <span className="absolute h-[50px] w-[50px] border-[5px] rounded-full sm:right-[4px] sm:-bottom-[10px] hidden sm:block border-white -z-10"></span>
                            <Link to="/login" className="font-montserrat px-5 py-1 border-2 border-primary rounded-lg text-primary font-medium">J'ai déjà un compte</Link>
                            <span className="sm:w-[1px] sm:h-[35px] h-[1px] w-[270px] sm:py-0 my-5 bg-white"></span>{" "}
                            <Button type="submit">{!loading ? "Créer mon compte" : "Création..."}</Button>
                        </div>
                    </form>
                </div>
            </main>
                                    </>
        );
    }
}
