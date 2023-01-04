import joinClasses from "../../../helpers/joinClasses";

export function Paragraph({className= "",children}){
    return (
        <p className={joinClasses(className, "text-black dark:text-white")}>{children}</p>
    )
}