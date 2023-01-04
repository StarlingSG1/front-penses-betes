import { Link } from "react-router-dom";
import { useUserContext } from "../../../context";
import { NavLink, Paragraph, TextLink } from "../../atoms";
import { PensesBetes } from "../../atoms/Text/PensesBetes";

export function Footer() {

    const { user } = useUserContext();

    return (
        <footer className="w-full sm:h-[60px] px-6 small:px-0 bg-black flex justify-center">
            <div className="h-full w-full max-w-[800px] flex sm:flex-row flex-col gap-2.5 mt-3 sm:mt-0 sm:mb-0 mb-5 sm:justify-between items-center">
                <p className="text-white font-indie text-subtitle">Penses-bêtes 2023</p>
                <div className="flex items-center gap-[15px] sm:flex-row flex-col">
                    <TextLink className="!text-white" href="/cgu">CGU</TextLink>
                    <span className="w-[1px] hidden sm:block h-5 bg-white"></span>
                    <Paragraph className="!text-white">Made by <TextLink className="!text-white">Jérémie Barrière</TextLink></Paragraph>
                </div>
            </div>
        </footer>
    );
}