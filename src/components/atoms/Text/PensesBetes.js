import { Link } from 'react-router-dom'
import joinClasses from '../../../helpers/joinClasses'

export function PensesBetes({children, className}){
    return (
        <Link to="/">
            <h2 className={joinClasses(className,`text-title font-indie text-white`)}>Penses Bêtes</h2>
        </Link>
    )
}