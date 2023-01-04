import { Link } from "react-router-dom";
import { useUserContext } from "../../../context";
import joinClasses from "../../../helpers/joinClasses";

export function NavLink({ className = "", children, href = "/", activeId, onClick}) {

    const { headActive, } = useUserContext();

    return (
        <ul onClick={onClick} className="h-[60px] cursor-pointer group relative cursor-pointer">
            <Link to={href} className={joinClasses(className, "py-[18px] z-10 group text-white  font-bold text-center h-full  inline-block font-lobster")}>
                {children}
            </Link>
            <div className={` bg-gradient-to-r from-blue to-pink w-full absolute bottom-0 duration-200 ${headActive === activeId ? "h-1.5" : "group-hover:h-[5px] h-0"}`}></div>
        </ul>
    )
}