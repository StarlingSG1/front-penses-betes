import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input } from "../components/atoms";
import { Header } from "../components/molecules";
import { useUserContext } from "../context";
import { useNavigate } from "react-router-dom";


export default function Login() {

    // import context 
    const { loading, loginTheUser = () => { }, setLoading, noLogged } = useUserContext();
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

    useEffect(() => {setLoading(false)}, [])


    return (
        <>
            <Header />
            <div className="max-w-[800px] w-full m-auto px-[2.5%]">
                <h2 className="text-center text-3xl font-montserrat font-medium my-10">Connexion</h2>
                <form onSubmit={(e) => { userCredentials.email !== "" && userCredentials.password !== "" ? handleOnClick(e) : toast.error("Tous les champs doivent être renseignés"); }}>

                    <div className=" gap-4 flex flex-col items-center relative bg-blue z-10">
                        <Input type="email" placeholder={"Adresse mail"} onChange={(e) => { setUserCredentials({ ...userCredentials, email: e.target.value }) }} />
                        <Input type="password" placeholder={"Mot de passe"} onChange={(e) => { setUserCredentials({ ...userCredentials, password: e.target.value }) }} />
                    </div>
                    <div className="flex justify-end mt-1">
                        <Link to="/password/reset">mot de passe oublié</Link>
                    </div>
                    <div className="flex sm:flex-row flex-col-reverse justify-between items-center relative mt-[25px] z-10 pl-8 pr-[15px]">
                        <span className="absolute h-[50px] w-[50px] border-[5px] rounded-full sm:right-[4px] sm:-bottom-[10px] hidden sm:block border-white -z-10"></span>
                        <Link to="/register" className="font-montserrat px-5 py-1 border-2 border-primary rounded-lg text-primary font-medium">Je n'ai pas de compte</Link>
                        <span className="sm:w-[1px] sm:h-[35px] h-[1px] w-[270px] sm:py-0 my-5 bg-white"></span>{" "}
                        <Button type="submit">{loading ? "Connexion..." : "Se connecter"}</Button>
                    </div>
                </form>
            </div>

        </>
    );
}
