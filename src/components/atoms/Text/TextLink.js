import { Link } from "react-router-dom";
import joinClasses from "../../../helpers/joinClasses";

export function TextLink({className= "",children, href = "/"}){
    return (
        <Link to={href} className={joinClasses(className, "text-black dark:text-white font-medium underline")}>{children}</Link>
    )
}