export function AuthInput({type, placeholder, onSubmit, defaultValue, onChange, name, error, onBlur, className}){
    return (
        <div className="w-full">
            <label htmlFor={name} className="font-bold pl-[5px] text-black dark:text-white">{placeholder}</label>
            <div className="bg-gradient-to-r from-blue to-pink w-full h-12 mt-[5px] relative rounded-lg">
                <input type={type} onSubmit={onSubmit} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} className={`bg-transparent z-20 absolute  placeholder-gray w-full rounded-md outline-none w-full h-12 text-black dark:text-white pl-[15px]`}/>
                <div className="rounded-md dark:bg-purple bg-white z-10 absolute top-0.5 bottom-0.5 left-0.5 right-0.5"/>
            </div>
        </div>
    )
}