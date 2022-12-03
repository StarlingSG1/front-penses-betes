export function ModalCard({children, isOpen, setIsOpen = () => { }}) {
    return (
        <div className={`top-0 left-0 z-10 w-full h-full fixed ${isOpen ? "block" : "hidden"} `}>
        <div className='relative h-full w-full flex items-center justify-center'>
            <div className='bg-black/[0.30] w-full h-full absolute' onClick={() => setIsOpen(false)}>
            </div>
            <div className='w-[90%] max-w-[600px] z-50 px-3 py-2  bg-white relative rounded-md flex flex-col'>
                   {children}
            </div>
        </div>
    </div>
    )
}