export function Input({type, placeholder, onSubmit, defaultValue, onChange, name, error, onBlur, className}){
    return (
        <input type={type} onSubmit={onSubmit} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} className={`border-primary border rounded-md outline-none w-full h-12 pl-3 ${className}`}/>
    )
}