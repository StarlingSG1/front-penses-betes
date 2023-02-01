import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteWord } from "../../api/words/words";
import { LanguageButton, Paragraph, Title, TradButton } from "../atoms";

export function WordsList({ words, setStatus, selectedWord, setSelectedWord, selectedLanguageList, setSelectedLanguageList, setWords, languagesList, setLanguagesList }) {

    const [letters, setLetters] = useState(
        // a table with all uppercase alphabetic letters
        Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65))
    );

    const [deleteConfirm, setDeleteConfirm] = useState(0);


    const makeActive = (item, index) => {
        if (item.active === false) {
            const newLanguages = languagesList.map((item) => {
                return { ...item, active: false };
            });
            newLanguages[index].active = true;
            setLanguagesList(newLanguages);
            setSelectedLanguageList(newLanguages[index]);
        } else {
            const newLanguages = languagesList.map((item) => {
                return item;
            });
            newLanguages[index].reverse = !newLanguages[index].reverse;
            setLanguagesList(newLanguages);
            setSelectedLanguageList(newLanguages[index])
        }
    }

    const deleteTheWord = async (id) => {
        const response = await deleteWord({ id });
        if (response.error === false) {
            setWords(response.data);
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
        setDeleteConfirm(0);
        setWords(response.data);
    }

    const selectWord = (word) => {
        setSelectedWord(word);
        setStatus("edit");
    }

    return (
        <>
            <h3 className="my-[30px] sm:my-[45px] text-title font-lobster text-black dark:text-white">Langues</h3>
            <div className='w-full mb-[30px] sm:mb-[45px] grid grid-cols-1 smallest:grid-cols-2 gap-4 sm:gap-5'>
                {languagesList?.map((item, index) => (
                    <TradButton key={index} onClick={() => {
                        makeActive(item, index)
                    }} active={item.active} reverse={item.reverse}>
                        {item.name}</TradButton>
                ))}
            </div>
            <Title className="mb-[30px] sm:mb-[45px]">Vos mots</Title>
            {/* WORDS CONTAINER */}
            <div className="w-screen max-w-[800px] mb-20 flex flex-col">
                {/* LETTER CONTAINER */}
                {letters.map((letter, index) => (
                    <div key={index} className="flex flex-col w-full">
                        {/* LETTER ITEM */}
                        <div className="w-full h-8 bg-black relative flex justify-center items-center">
                            <span className="w-full h-[1px] bg-gradient-to-r absolute bottom-0 from-blue to-pink"></span>
                            <div className="h-8 flex w-3/4 items-center">
                                <Paragraph className="!text-white uppercase">{letter}</Paragraph>
                            </div>
                        </div>
                        {/* LETTER ITEM */}

                        {/* WORD ITEM */}
                        {words?.map((word, index) => (
                            selectedLanguageList?.reverse ?
                                word?.traduction[0] === letter && selectedLanguageList?.id === word.languageId &&
                                <div key={index} className="w-full h-8 odd:bg-gray-light even:bg-transparent  odd:dark:bg-gray flex justify-center items-center">
                                    <div className="h-8 flex w-3/4 items-center justify-between">
                                        <div onClick={() => selectWord(word)} className={`flex items-center cursor-pointer ${deleteConfirm ? "w-auto" : "w-[85%]"} `}>
                                            <Paragraph className={` capitalize`}>{word.traduction}</Paragraph>
                                        </div>
                                        {deleteConfirm !== word.id ? <div className="flex items-center gap-[15px] ">
                                            <svg width="18" height="18" onClick={() => setDeleteConfirm(word.id)} className="dark:fill-white cursor-pointer fill-black" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.375 1.6875V2.8125H16.3125C16.4617 2.8125 16.6048 2.87176 16.7102 2.97725C16.8157 3.08274 16.875 3.22582 16.875 3.375C16.875 3.52418 16.8157 3.66726 16.7102 3.77275C16.6048 3.87824 16.4617 3.9375 16.3125 3.9375H15.7072L14.7476 15.93C14.7024 16.4938 14.4464 17.02 14.0307 17.4036C13.615 17.7872 13.07 18.0001 12.5044 18H5.49563C4.92997 18.0001 4.38502 17.7872 3.96931 17.4036C3.5536 17.02 3.29763 16.4938 3.25238 15.93L2.29275 3.9375H1.6875C1.53832 3.9375 1.39524 3.87824 1.28975 3.77275C1.18426 3.66726 1.125 3.52418 1.125 3.375C1.125 3.22582 1.18426 3.08274 1.28975 2.97725C1.39524 2.87176 1.53832 2.8125 1.6875 2.8125H5.625V1.6875C5.625 1.23995 5.80279 0.810725 6.11926 0.494257C6.43572 0.17779 6.86495 0 7.3125 0L10.6875 0C11.1351 0 11.5643 0.17779 11.8807 0.494257C12.1972 0.810725 12.375 1.23995 12.375 1.6875ZM6.75 1.6875V2.8125H11.25V1.6875C11.25 1.53832 11.1907 1.39524 11.0852 1.28975C10.9798 1.18426 10.8367 1.125 10.6875 1.125H7.3125C7.16332 1.125 7.02024 1.18426 6.91475 1.28975C6.80926 1.39524 6.75 1.53832 6.75 1.6875ZM5.0625 5.65762L5.625 15.2201C5.628 15.2949 5.64589 15.3683 5.6776 15.436C5.70932 15.5038 5.75423 15.5645 5.80972 15.6147C5.8652 15.6649 5.93013 15.7035 6.00072 15.7283C6.07131 15.7531 6.14613 15.7635 6.2208 15.759C6.29548 15.7545 6.36851 15.7352 6.43562 15.7021C6.50273 15.6691 6.56257 15.623 6.61164 15.5665C6.66071 15.51 6.69802 15.4443 6.72139 15.3733C6.74476 15.3022 6.75373 15.2272 6.74775 15.1526L6.18525 5.59013C6.18225 5.51537 6.16436 5.44197 6.13265 5.37422C6.10093 5.30647 6.05602 5.24572 6.00053 5.19554C5.94505 5.14535 5.88012 5.10674 5.80953 5.08196C5.73894 5.05718 5.66412 5.04673 5.58945 5.05122C5.51477 5.05571 5.44174 5.07505 5.37463 5.1081C5.30752 5.14116 5.24768 5.18728 5.19861 5.24375C5.14954 5.30022 5.11223 5.36591 5.08886 5.43697C5.06549 5.50804 5.05653 5.58305 5.0625 5.65762ZM12.4087 5.06362C12.2599 5.05502 12.1137 5.10588 12.0023 5.20503C11.8909 5.30418 11.8234 5.44351 11.8147 5.59238L11.2522 15.1549C11.2474 15.3015 11.3001 15.4443 11.399 15.5526C11.498 15.661 11.6353 15.7264 11.7818 15.7349C11.9283 15.7434 12.0723 15.6944 12.1831 15.5982C12.294 15.502 12.3628 15.3664 12.375 15.2201L12.9375 5.65762C12.9461 5.50875 12.8952 5.36255 12.7961 5.25117C12.6969 5.13978 12.5576 5.07232 12.4087 5.06362ZM9 5.0625C8.85082 5.0625 8.70774 5.12176 8.60225 5.22725C8.49676 5.33274 8.4375 5.47582 8.4375 5.625V15.1875C8.4375 15.3367 8.49676 15.4798 8.60225 15.5852C8.70774 15.6907 8.85082 15.75 9 15.75C9.14918 15.75 9.29226 15.6907 9.39775 15.5852C9.50324 15.4798 9.5625 15.3367 9.5625 15.1875V5.625C9.5625 5.47582 9.50324 5.33274 9.39775 5.22725C9.29226 5.12176 9.14918 5.0625 9 5.0625Z" />
                                            </svg>
                                        </div> : <div className="flex items-center gap-2.5 ">
                                            <Paragraph>supprimer ?</Paragraph>
                                            <svg width="27" height="27" viewBox="0 0 27 27" onClick={() => deleteTheWord(word.id)} className="fill-black dark:fill-white cursor-pointer" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.2504 15.3004L17.8879 8.66289C18.0941 8.45664 18.3566 8.35352 18.6754 8.35352C18.9941 8.35352 19.2566 8.45664 19.4629 8.66289C19.6691 8.86914 19.7723 9.13164 19.7723 9.45039C19.7723 9.76914 19.6691 10.0316 19.4629 10.2379L12.0379 17.6629C11.8129 17.8879 11.5504 18.0004 11.2504 18.0004C10.9504 18.0004 10.6879 17.8879 10.4629 17.6629L7.53789 14.7379C7.33164 14.5316 7.22852 14.2691 7.22852 13.9504C7.22852 13.6316 7.33164 13.3691 7.53789 13.1629C7.74414 12.9566 8.00664 12.8535 8.32539 12.8535C8.64414 12.8535 8.90664 12.9566 9.11289 13.1629L11.2504 15.3004Z" />
                                            </svg>
                                            <svg width="20" height="20" onClick={() => setDeleteConfirm(0)} className="stroke-black dark:stroke-white cursor-pointer" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.0625 5.9375L5.9375 14.0625M5.9375 5.9375L14.0625 14.0625" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>}
                                    </div>
                                </div>
                                : word?.name[0] === letter && selectedLanguageList?.id === word.languageId &&
                                <div key={index} className="w-full h-8 odd:bg-gray-light even:bg-transparent  odd:dark:bg-gray flex justify-center items-center">
                                    <div className="h-8 flex w-3/4 items-center justify-between">
                                        <div onClick={() => selectWord(word)} className={`flex items-center cursor-pointer ${deleteConfirm ? "w-auto" : "w-[85%]"} `}>
                                            <Paragraph className={` capitalize`}>{word.name}</Paragraph>
                                        </div>                                        {deleteConfirm !== word.id ?
                                            <svg width="18" height="18" onClick={() => setDeleteConfirm(word.id)} className="dark:fill-white cursor-pointer fill-black" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.375 1.6875V2.8125H16.3125C16.4617 2.8125 16.6048 2.87176 16.7102 2.97725C16.8157 3.08274 16.875 3.22582 16.875 3.375C16.875 3.52418 16.8157 3.66726 16.7102 3.77275C16.6048 3.87824 16.4617 3.9375 16.3125 3.9375H15.7072L14.7476 15.93C14.7024 16.4938 14.4464 17.02 14.0307 17.4036C13.615 17.7872 13.07 18.0001 12.5044 18H5.49563C4.92997 18.0001 4.38502 17.7872 3.96931 17.4036C3.5536 17.02 3.29763 16.4938 3.25238 15.93L2.29275 3.9375H1.6875C1.53832 3.9375 1.39524 3.87824 1.28975 3.77275C1.18426 3.66726 1.125 3.52418 1.125 3.375C1.125 3.22582 1.18426 3.08274 1.28975 2.97725C1.39524 2.87176 1.53832 2.8125 1.6875 2.8125H5.625V1.6875C5.625 1.23995 5.80279 0.810725 6.11926 0.494257C6.43572 0.17779 6.86495 0 7.3125 0L10.6875 0C11.1351 0 11.5643 0.17779 11.8807 0.494257C12.1972 0.810725 12.375 1.23995 12.375 1.6875ZM6.75 1.6875V2.8125H11.25V1.6875C11.25 1.53832 11.1907 1.39524 11.0852 1.28975C10.9798 1.18426 10.8367 1.125 10.6875 1.125H7.3125C7.16332 1.125 7.02024 1.18426 6.91475 1.28975C6.80926 1.39524 6.75 1.53832 6.75 1.6875ZM5.0625 5.65762L5.625 15.2201C5.628 15.2949 5.64589 15.3683 5.6776 15.436C5.70932 15.5038 5.75423 15.5645 5.80972 15.6147C5.8652 15.6649 5.93013 15.7035 6.00072 15.7283C6.07131 15.7531 6.14613 15.7635 6.2208 15.759C6.29548 15.7545 6.36851 15.7352 6.43562 15.7021C6.50273 15.6691 6.56257 15.623 6.61164 15.5665C6.66071 15.51 6.69802 15.4443 6.72139 15.3733C6.74476 15.3022 6.75373 15.2272 6.74775 15.1526L6.18525 5.59013C6.18225 5.51537 6.16436 5.44197 6.13265 5.37422C6.10093 5.30647 6.05602 5.24572 6.00053 5.19554C5.94505 5.14535 5.88012 5.10674 5.80953 5.08196C5.73894 5.05718 5.66412 5.04673 5.58945 5.05122C5.51477 5.05571 5.44174 5.07505 5.37463 5.1081C5.30752 5.14116 5.24768 5.18728 5.19861 5.24375C5.14954 5.30022 5.11223 5.36591 5.08886 5.43697C5.06549 5.50804 5.05653 5.58305 5.0625 5.65762ZM12.4087 5.06362C12.2599 5.05502 12.1137 5.10588 12.0023 5.20503C11.8909 5.30418 11.8234 5.44351 11.8147 5.59238L11.2522 15.1549C11.2474 15.3015 11.3001 15.4443 11.399 15.5526C11.498 15.661 11.6353 15.7264 11.7818 15.7349C11.9283 15.7434 12.0723 15.6944 12.1831 15.5982C12.294 15.502 12.3628 15.3664 12.375 15.2201L12.9375 5.65762C12.9461 5.50875 12.8952 5.36255 12.7961 5.25117C12.6969 5.13978 12.5576 5.07232 12.4087 5.06362ZM9 5.0625C8.85082 5.0625 8.70774 5.12176 8.60225 5.22725C8.49676 5.33274 8.4375 5.47582 8.4375 5.625V15.1875C8.4375 15.3367 8.49676 15.4798 8.60225 15.5852C8.70774 15.6907 8.85082 15.75 9 15.75C9.14918 15.75 9.29226 15.6907 9.39775 15.5852C9.50324 15.4798 9.5625 15.3367 9.5625 15.1875V5.625C9.5625 5.47582 9.50324 5.33274 9.39775 5.22725C9.29226 5.12176 9.14918 5.0625 9 5.0625Z" />
                                            </svg>
                                            : <div className="flex items-center gap-2.5 ">
                                                <Paragraph>supprimer ?</Paragraph>
                                                <svg width="27" height="27" viewBox="0 0 27 27" onClick={() => deleteTheWord(word.id)} className="fill-black dark:fill-white cursor-pointer" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.2504 15.3004L17.8879 8.66289C18.0941 8.45664 18.3566 8.35352 18.6754 8.35352C18.9941 8.35352 19.2566 8.45664 19.4629 8.66289C19.6691 8.86914 19.7723 9.13164 19.7723 9.45039C19.7723 9.76914 19.6691 10.0316 19.4629 10.2379L12.0379 17.6629C11.8129 17.8879 11.5504 18.0004 11.2504 18.0004C10.9504 18.0004 10.6879 17.8879 10.4629 17.6629L7.53789 14.7379C7.33164 14.5316 7.22852 14.2691 7.22852 13.9504C7.22852 13.6316 7.33164 13.3691 7.53789 13.1629C7.74414 12.9566 8.00664 12.8535 8.32539 12.8535C8.64414 12.8535 8.90664 12.9566 9.11289 13.1629L11.2504 15.3004Z" />
                                                </svg>
                                                <svg width="20" height="20" onClick={() => setDeleteConfirm(0)} className="stroke-black dark:stroke-white cursor-pointer" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.0625 5.9375L5.9375 14.0625M5.9375 5.9375L14.0625 14.0625" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>}
                                    </div>
                                </div>
                        ))}
                        {/* WORD ITEM */}
                    </div>
                ))}
                {/* LETTER CONTAINER */}
            </div>
            {/* WORDS CONTAINER */}
        </>
    )
}