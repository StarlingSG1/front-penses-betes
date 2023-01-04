import { Link } from 'react-router-dom'
import joinClasses from '../../../helpers/joinClasses'

export function BurgerLink({children, className, href = "/"}){
    return (
        <Link to={href} className={joinClasses(className,`text-subtitle font-lobster text-black dark:text-white`)}>{children}</Link>
    )
}