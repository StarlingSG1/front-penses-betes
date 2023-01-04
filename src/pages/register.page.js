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

   
    //     return (
    //         <>
    //             <Header />
    //             <main className="max-w-[800px] w-full mx-auto px-[2.5%]">
    //                 <h2 className="text-center text-3xl font-montserrat font-medium my-10">Inscription</h2>

    //                 <div className="w-full m-auto">
    //                     <form onSubmit={(e) => { registerTheUser(e) }}>
    //                         <div className=" gap-4 flex flex-col items-center relative bg-blue z-10">
    //                             <div className=" flex sm:flex-row flex-col items-center sm:justify-between sm:gap-0 gap-4 w-full">
    //                                 <Input
    //                                     type="text"
    //                                     className={"sm:w-[47.5%]"}
    //                                     placeholder={"Prénom"}
    //                                     onChange={(e) => { setUserCredentials({ ...userCredentials, firstName: e.target.value }) }}
    //                                 />
    //                                 <Input type="text" className={"sm:w-[47.5%]"} placeholder={"Nom"} onChange={(e) => { setUserCredentials({ ...userCredentials, lastName: e.target.value }) }} />
    //                             </div>
    //                             <Input type="email" placeholder={"Adresse mail"} onChange={(e) => { setUserCredentials({ ...userCredentials, email: e.target.value }) }} />
    //                             <Input type="password" placeholder={"Mot de passe"} onChange={(e) => { setUserCredentials({ ...userCredentials, password: e.target.value }) }} />
    //                             <Input type="password" placeholder={"Confirmer mot de passe"} onChange={(e) => { setUserCredentials({ ...userCredentials, confirmPassword: e.target.value }) }} />
    //                             <div className="flex items-center w-full gap-2">
    //                                 <input type="checkbox" className="w-[18px] aspect-square h-[18px] border border-gray-400 !text-red accent-red rounded-sm" onChange={(e) => { setUserCredentials({ ...userCredentials, conditions: e.target.checked }) }} />
    //                                 <Paragraph className="text-sm  text-gray-400  text-base">J'accepte les <Link to="/politique-de-confidentialite" className="!text-base">conditions générales d'utilisation</Link>.</Paragraph>
    //                             </div>
    //                         </div>

    //                         <div className="flex sm:flex-row flex-col-reverse justify-between items-center relative mt-[25px] z-10 pl-8 pr-[15px]">
    //                             <span className="absolute h-[50px] w-[50px] border-[5px] rounded-full sm:right-[4px] sm:-bottom-[10px] hidden sm:block border-white -z-10"></span>
    //                             <Link to="/login" className="font-montserrat px-5 py-1 border-2 border-primary rounded-lg text-primary font-medium">J'ai déjà un compte</Link>
    //                             <span className="sm:w-[1px] sm:h-[35px] h-[1px] w-[270px] sm:py-0 my-5 bg-white"></span>{" "}
    //                             <Button type="submit">{!loading ? "Créer mon compte" : "Création..."}</Button>
    //                         </div>
    //                     </form>
    //                 </div>
    //             </main>
    //         </>
    //     );
    // }
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