/* eslint-disable react-hooks/exhaustive-deps */
import logo from '../logo.svg';
import '../App.css';
import { Header } from '../components/molecules';
import { useEffect, useState } from 'react';
import { Button, Card, Input, ModalCard, Paragraph } from '../components/atoms';
import { createWord, deleteWord, getWordsForUser, updateWord } from '../api/words/words';
import { getLanguages } from '../api/languages/languages';
import { toast } from 'react-toastify';

export default function Home() {

    const [letters, setLetters] = useState(
        // a table with all uppercase alphabetic letters
        Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65))
    );

    const [isOpen, setIsOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);

    const [words, setWords] = useState([]);
    const [languages, setLanguages] = useState([]);

    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [wordsLanguage, setWordsLanguage] = useState([]);

    const [searchedWord, setSearchedWord] = useState("");
    const [searchedDefinition, setSearchedDefinition] = useState("");
    const [searchedTraduction, setSearchedTraduction] = useState("");

    const addWord = async (e, word, definition, traduction) => {
        e.preventDefault();

        const token = localStorage.getItem("penses-betes-token");
        const language = languages.find((language) => language.status === true);
        const response = await createWord({
            word: word.trim(),
            definition,
            traduction,
            language: language.id,
            token,
        });
        if (response.error === false) {
            e.target[0].value = "";
            e.target[1].value = "";
            e.target[2].value = "";
            setWords(response.data);
            languages.forEach((language) => (language.status = false));
            const langue = languages
            const english = langue.find((language) => language.name === "English");
            english.status = true;
            const myValue = []
            langue.forEach((language) => myValue.push(language))
            setLanguages(myValue);
        } else {
            toast.error(response.message)
        }
    }

    const handleLanguage = (item) => {
        languages.forEach((language) => (language.status = false));
        const langue = languages
        const english = langue.find((language) => language.name === item.name);
        english.status = true;
        const myValue = []
        // foreach in langue, push in myValue
        langue.forEach((language) => myValue.push(language))
        setLanguages(myValue);
    }

    const getWords = async () => {
        const token = localStorage.getItem("penses-betes-token");
        const response = await getWordsForUser({ token });
        setWords(response.data);
    }

    const getTheLanguages = async () => {
        const token = localStorage.getItem("penses-betes-token");
        const response = await getLanguages({ token });
        setLanguages(response.data);
        const english = response.data.find((language) => language.name === "English");
        english.status = true;
        setLanguages(response.data);
        const data = response.data
        // add a traduction property to each language
        data.forEach((language) => (language.french = false));
        // add a active property to each language
        data.forEach((language) => (language.active = false));
        // data where name === english, set active to true
        const active = data.find((language) => language.name === "English");
        active.active = true;
        setSelectedLanguage(data);
        const myLanguage = data.find((language) => language.active === true);
        setWordsLanguage(myLanguage);

    }


    useEffect(() => {
        getWords();
        getTheLanguages();
    }, []);

    const setFrenchToTrue = (item) => {
        const langue = selectedLanguage
        langue.forEach((language) => (language.french = false));
        langue.forEach((language) => (language.active = false));
        const language = langue.find((language) => language.name === item.name);
        language.active = true;
        language.french = true;
        const myValue = []
        langue.forEach((language) => myValue.push(language))
        setSelectedLanguage(myValue);
        setWordsLanguage(language)
        console.log(language)


    }

    const setActiveToTrue = (item) => {
        const langue = selectedLanguage
        // set traduction and active to false for all languages
        langue.forEach((language) => (language.french = false));
        langue.forEach((language) => (language.active = false));
        const language = langue.find((language) => language.name === item.name);
        language.active = true;
        const myValue = []
        langue.forEach((language) => myValue.push(language))
        setSelectedLanguage(myValue);
        setWordsLanguage(language)
        console.log(language)
    }

    const deleteTheWord = async (id) => {
        const token = localStorage.getItem("penses-betes-token");
        const response = await deleteWord({ id, token });
        if (response.error === false) {
            setWords(response.data);
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
        setDeleteModal(false);
        setWords(response.data);
    }

    const updateTheWord = async (id, word, definition, traduction) => {
        const token = localStorage.getItem("penses-betes-token");
        const response = await updateWord({ id, word, definition, traduction, token });
        if (response.error === false) {
            setWords(response.data);
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
        setWords(response.data);
    }




    return (
        <>
            <Header />
            <main className=' pt-10 max-w-[800px] mx-auto'>
                <h2 className='text-center text-3xl font-bold mb-10'>Ajouter un mot</h2>
                <form onSubmit={(e) => { addWord(e, searchedWord, searchedDefinition, searchedTraduction) }} className='w-full px-[2.5%]'>
                    <div className="group w-full">
                        <Input required onChange={(e) => setSearchedWord(e.target.value)} type="text" placeholder='Ajoutez un mot' />
                    </div>
                    <div className="group w-full mt-3">
                        <Input onChange={(e) => setSearchedTraduction(e.target.value)} type="text" placeholder='Ajoutez sa traduction' />
                    </div>
                    <textarea onChange={(e) => setSearchedDefinition(e.target.value)} placeholder="Donnez une définition, un mémo, n'importe quoi... (optionnel)" className='w-full mt-3 h-28 border border-primary resize-none outline-none rounded-md pl-3 pt-1.5' />
                    <fieldset className='w-full flex items-center flex-wrap justify-between'>
                        <div className='flex gap-2'>
                            {languages?.map((item, index) => (
                                <div key={index} onClick={() => { handleLanguage(item) }} className={`${item.status && "bg-primary"} cursor-pointer border border-primary px-5 py-1 rounded-lg mt-3`}>
                                    <p className={`font-montserrat ${item.status && "text-white"}`}>{item.name}</p>
                                </div>
                            ))}
                        </div>
                        <Button type="submit" className='mt-3'>Ajouter</Button>
                    </fieldset>
                    <div className='flex justify-end w-full'>
                    </div>
                </form>
                <h3 className='text-center text-3xl font-bold mt-10'>Ma liste de mots</h3>
                <div className=' w-full mt-5 flex items-center gap-5 flex-wrap'>
                    {selectedLanguage?.map((item, index) => (
                        <div className={` flex justify-between- m-auto relative bg-transparent h-[60px] border-2 ${item.active && "border-primary"} rounded-full`}>
                            <button
                                className="px-[30px] px-4 z-10 bg-transparent rounded-full "
                                onClick={() => {
                                    setActiveToTrue(item);
                                }}
                            >
                                <Paragraph className={` min-w-max ${!item.french && item.active && "text-white"}`}>{item.traduction}</Paragraph>
                            </button>
                            <button
                                className="px-[30px] px-4 z-10 bg-transparent rounded-full"
                                onClick={() => {
                                    setFrenchToTrue(item)
                                }}
                            >
                                <Paragraph className={` min-w-max ${item.french && item.active && "text-white"}`}>Français</Paragraph>
                            </button>
                            {item.active && <span
                                className={`absolute h-full rounded-full bg-primary duration-200 w-1/2 ${item.french ? "right-0" : "left-0"}`}
                            ></span>}
                        </div>
                    ))}
                </div>
                <div className='w-full mt-5 flex flex-col '>
                    {letters.map((letter, index) => (
                        <>
                            <div key={index} className='w-full flex flex-col items-center'>
                                <div className='bg-blue-200 h-8 flex items-center px-[2.5%] border-b border-black w-full'>
                                    <p className='font-montserrat text-xl uppercase'>{letter}</p>
                                </div>
                                {words?.map((word, index) => (
                                    word?.name[0] === letter && word?.language?.id === wordsLanguage?.id && !wordsLanguage?.french ?
                                        (<div key={index}  className='w-full h-10 flex items-center odd:bg-slate-200 px-[2.5%] justify-between'>
                                            <p className=' truncate font-montserrat capitalize w-3/4 sm:w-4/5 cursor-pointer' onClick={() => { setSelectedWord(word); setIsOpen(true) }} >
                                                {word.name}</p>
                                            <svg onClick={() => {setDeleteModal(true)}} className='text-primary z-20' width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1l-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" /></svg>
                                        </div>) :
                                        (word?.traduction[0] === letter && word?.language?.id === wordsLanguage?.id && wordsLanguage?.french && <div key={index}  className='w-full h-10 flex items-center odd:bg-slate-200 px-[2.5%] justify-between'>
                                            <p className=' truncate font-montserrat capitalize w-3/4 sm:w-4/5 cursor-pointer'  onClick={() => { setSelectedWord(word); setIsOpen(true) }} >
                                                {word?.traduction}</p>
                                            <svg onClick={() => {setDeleteModal(true)}} className='text-primary z-20' width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1l-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" /></svg>
                                        </div>
                                        )
                                ))}
                            </div>
                        </>
                    ))}
                </div>
                <Card item={selectedWord} isOpen={isOpen} setIsOpen={setIsOpen} />
                <ModalCard  isOpen={deleteModal} setIsOpen={setDeleteModal}>
                    <div className='w-full border-b border-primary pb-1'>
                        <p className='font-montserrat'>Supprimer : <strong>{selectedWord?.name} ?</strong></p>
                    </div>
                    <div className='flex items-center justify-around mt-4 '>
                        <button onClick={() => {setDeleteModal(false); setSelectedWord("")}} className='cursor-pointer px-5 py-1 rounded-lg underline'>Non</button>
                        <Button onClick={() => {deleteTheWord(selectedWord?.id)}}>Oui</Button>
                    </div>
                </ModalCard>
            </main>
        </>
    );
}