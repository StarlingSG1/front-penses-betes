import joinClasses from '../../../helpers/joinClasses'

export function Title({children, className}){
    return (
        <h1 className={joinClasses(className,`text-title font-lobster text-black dark:text-white`)}>{children}</h1>
    )
}