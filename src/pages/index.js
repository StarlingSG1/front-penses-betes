/* eslint-disable react-hooks/exhaustive-deps */
import logo from '../logo.svg';
import '../App.css';
import { ActionPicker, Header, Template } from '../components/molecules';
import { useEffect, useState } from 'react';
import { Button, Card, Crayon, GradientButton, Input, LanguageButton, LineInput, ModalCard, Paragraph, Title } from '../components/atoms';
import { createWord, deleteWord, getWordsForUser, updateWord } from '../api/words/words';
import { getLanguages } from '../api/languages/languages';
import { toast } from 'react-toastify';
import { AddWord, WordDetail } from '../components/organims';
import { WordsList } from '../components/organims/WordsList';
import { useUserContext } from '../context';

export default function Home() {

    const { setHeadActive, open, setOpen } = useUserContext();
    const [selectedWord, setSelectedWord] = useState('');
    const [words, setWords] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState({});
    const [languagesList, setLanguagesList] = useState([]);
    const [selectedLanguageList, setSelectedLanguageList] = useState({})
    const [status, setStatus] = useState("list");
    const getWords = async () => {
        const token = localStorage.getItem("penses-betes-token");
        const response = await getWordsForUser({ token });
        setWords(response.data);
    }

    const getTheLanguages = async () => {
        const token = localStorage.getItem("penses-betes-token");
        const response = await getLanguages({ token });
        response.data.forEach((language) => (language.active = false));
        response.data[0].active = true;
        setLanguages(response.data);
        setLanguagesList(response.data);
        setSelectedLanguage(response.data[0]);
        setSelectedLanguageList(response.data[0]);
    }

    useEffect(() => {
        getWords();
        getTheLanguages();
        setHeadActive(1)
        setOpen(false)
    }, []);

    return (
        <Template>
            {status !== "edit" && <ActionPicker status={status} setStatus={setStatus} />}
            {status === "list" ?
                <WordsList setStatus={setStatus} selectedLanguageList={selectedLanguageList} setSelectedLanguageList={setSelectedLanguageList} setWords={setWords} words={words} languagesList={languagesList} setLanguagesList={setLanguagesList} selectedWord={selectedWord} setSelectedWord={setSelectedWord} />
                : status === "add" ?
                    <AddWord setLanguages={setLanguages} setWords={setWords} languages={languages} />
                    : status === "edit" && <WordDetail setWords={setWords} setLanguages={setLanguages} setStatus={setStatus} languages={languages} setSelectedWord={setSelectedWord} selectedWord={selectedWord} />
            }
        </Template>
    );
}