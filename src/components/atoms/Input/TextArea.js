export function TextArea({type, placeholder, onSubmit, defaultValue, onChange, name, error, onBlur, className, title = placeholder}){
    return (
        <div className="w-full">
            <label htmlFor={name} className="font-bold pl-[5px] text-black dark:text-white">{title}</label>
            <div className="bg-gradient-to-r from-blue to-pink w-full min-h-14 h-24 mt-0.5 relative">
                <textarea type={type} onSubmit={onSubmit} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} className={`bg-transparent z-20 absolute resize-none pt-2 placeholder-gray pb-3 rounded-md outline-none w-full h-full text-black dark:text-white pl-[15px]`}/>
                <div className="dark:bg-purple bg-white z-10 absolute top-0 bottom-0.5 left-0 right-0"/>
            </div>
        </div>
    )
}