import joinClasses from "../../../helpers/joinClasses";

export function GradientButton({className="", children, onClick}){
    return (
        <button className={joinClasses(className, "bg-gradient-to-r from-blue to-pink hover:from-blue-hover hover:to-pink-hover text-white rounded-lg w-full py-2")} onClick={onClick}>{children}</button>
    )
}