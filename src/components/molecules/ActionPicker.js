import { Paragraph } from "../atoms";

export function ActionPicker({className="", children, onClick, status, setStatus}){
    return (
        <div className='w-full h-[45px] bg-black rounded relative flex items-center'>
                <span className={` ${status === "list" ? "translate-x-full rounded-br-lg" : status === "add" && "translate-x-0 rounded-bl-lg"} duration-100 w-1/2 h-1 bg-gradient-to-r absolute bottom-0 from-blue to-pink`}></span>
                <div onClick={() => setStatus("add")} className='w-1/2 h-full rounded-l flex items-center justify-center cursor-pointer'><Paragraph className='!text-white'>Ajouter un mot</Paragraph></div>
                <span className='w-[1px] h-1/2 bg-white'></span>
                <div onClick={() => setStatus("list")} className='w-1/2 h-full rounded-r flex items-center justify-center cursor-pointer'><Paragraph className='!text-white'>Liste de mots</Paragraph></div>
            </div>
    )
}