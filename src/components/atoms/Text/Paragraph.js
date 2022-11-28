export function Paragraph({className= "",children}){
    return (
        <p className={`font-montserrat ${className}`}>{children}</p>
    )
}