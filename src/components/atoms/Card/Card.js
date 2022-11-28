export function Card({ isOpen, setIsOpen = () => { }, item }) {
    return (
        <div className={`top-0 left-0  w-full h-full fixed ${isOpen ? "block" : "hidden"} `}>
            <div className='relative h-full w-full flex items-center justify-center'>
                <div className='bg-black/[0.30] w-full h-full absolute' onClick={() => setIsOpen(false)}>
                </div>
                <div className='w-[90%] max-w-[600px] z-20 px-3 py-2  bg-white relative rounded-md flex flex-col'>
                        <svg onClick={() => {setIsOpen(false)}} className="text-primary absolute right-2.5" width="32" height="32" viewBox="0 0 15 15"><path fill="currentColor" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27Z" /></svg>
                    <div className={`pl-2.5 w-full border-b border-primary pb-1 flex items-center gap-4`}>
                        <p className="font-montserrat font-bold text-2xl capitalize">{item?.name}</p>{" "}<p className="font-montserrat text-gray-500">({item?.language?.name})</p>
                    </div>
                    {item?.traduction && <p className="font-montserrat mt-2 pl-2.5">Traduction : <strong>{item?.traduction}</strong></p>}
                    {item?.definition && <p className="font-montserrat mt-3 pl-2.5">{item?.definition}</p>}
                </div>
            </div>
        </div>
    )
}