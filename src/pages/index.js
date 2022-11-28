/* eslint-disable react-hooks/exhaustive-deps */
import logo from '../logo.svg';
import '../App.css';
import { Header } from '../components/molecules';
import { useEffect, useState } from 'react';
import { Button, Card, Input, Paragraph } from '../components/atoms';
import { createWord, getWordsForUser } from '../api/words/words';
import { getLanguages } from '../api/languages/languages';
import { toast } from 'react-toastify';

export default function Home() {

    const [letters, setLetters] = useState(
        // a table with all uppercase alphabetic letters
        Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65))
    );

    const [isOpen, setIsOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState('');

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
                                        (<div key={index} onClick={() => { setSelectedWord(word); setIsOpen(true) }} className='w-full h-10 flex items-center cursor-pointer odd:bg-slate-200 px-[2.5%]'>
                                            <p className='font-montserrat capitalize' >
                                                {word.name}</p>
                                        </div>) :
                                        (word?.traduction[0] === letter && word?.language?.id === wordsLanguage?.id && wordsLanguage?.french && <div key={index} onClick={() => { setSelectedWord(word); setIsOpen(true) }} className='w-full h-10 flex items-center cursor-pointer odd:bg-slate-200 px-[2.5%]'>
                                            <p className='font-montserrat capitalize' >
                                                {word?.traduction}</p>
                                        </div>
                                        )
                                ))}
                            </div>
                        </>
                    ))}
                </div>
                <Card item={selectedWord} isOpen={isOpen} setIsOpen={setIsOpen} />
            </main>
        </>
    );
}