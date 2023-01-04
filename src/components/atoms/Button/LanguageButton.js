import joinClasses from "../../../helpers/joinClasses";

export function LanguageButton({className="", children, onClick, item}){
    return (
        <button className={joinClasses(className, `${item.active ? "bg-gradient-to-r from-blue to-pink" : "bg-black dark:bg-white hover:bg-gradient-to-r hover:from-blue hover:to-pink dark:text-black hover:text-white"}  text-white rounded-lg w-full py-2`)} onClick={onClick}>{children}</button>
    )
}