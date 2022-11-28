export function Button({className= "",children, type}){
    return (
        <button className={`font-montserrat px-5 py-1 bg-primary rounded-lg text-white font-bold ${className}`} type={type}>
            {children}
        </button>
    )
}