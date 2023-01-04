import { useUserContext } from "../../../context";
import { NavLink, Paragraph, TextLink } from "../../atoms";

export function MobileHeader() {
    const { open, setOpen, user } = useUserContext();
    return (
        <div className={`${open ? "translate-x-0" : "translate-x-full"}  w-screen h-screen dark:bg-purple duration-200 fixed top-0 z-20 bg-white flex flex-col justify-between`}>
            <div className="w-full h-[60px]"></div>
            <div className="flex flex-col items-center gap-[50px] w-full">
                <NavLink className="!font-normal !text-black dark:!text-white !text-subtitle" href="/" activeId={1}>Accueil</NavLink>
                {!user ? <><NavLink className="!font-normal !text-black dark:!text-white !text-subtitle" href="/login" activeId={2}>Connexion</NavLink>
                    <NavLink className="!font-normal !text-black dark:!text-white !text-subtitle" href="/register" activeId={3}>Inscription</NavLink></> :
                    <>
                        {/* <NavLink className="!font-normal !text-black dark:!text-white !text-subtitle" href="/account" activeId={2}>Account</NavLink> */}
                        <NavLink className="!font-normal !text-black dark:!text-white !text-subtitle" href="/logout">Deconnexion</NavLink></>}
            </div>
            <div className="flex items-center justify-between min-h-[60px] gap-5 px-6 flex-row ">
                <Paragraph className="text-center dark:!text-white">Made by <TextLink className="!text-white">Jérémie Barrière</TextLink></Paragraph>
                <span className="w-[1px] h-5 dark:bg-white bg-black"></span>
                <TextLink href="/cgu" className="dark:!text-white">CGU</TextLink>
            </div>
        </div>
    )
}