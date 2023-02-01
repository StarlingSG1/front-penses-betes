import { useState } from "react";
import { toast } from "react-toastify";
import { createWord } from "../../api/words/words";
import { GradientButton, LanguageButton, LineInput, TextArea, Title } from "../atoms";

export function AddWord({ languages, setLanguages, setWords }) {

    const [word, setWord] = useState({
        name: "",
        traduction: "",
        definition: "",
        languageId: languages[0].id,
    });

    const setActiveLanguage = (item, index) => {
        if (item.active === false) {
            const newLanguages = languages.map((item) => {
                return { ...item, active: false };
            });
            newLanguages[index].active = true;
            setLanguages(newLanguages);
            setWord({ ...word, languageId: item.id })
        }
    }

    const searchActiveLanguage = () => {
        const activeLanguage = languages.find((item) => item.active === true);
        // return activelanguage.name to lowercase
        return activeLanguage.traduction.toLowerCase();
    }

    const addANewWord = async (e) => {
        e.preventDefault();
        const response = await createWord(word);
        if (response.error === false) {
            setWord({
                name: "",
                traduction: "",
                definition: "",
                languageId: word.languageId
            });
            e.target[0].value = "";
            e.target[1].value = "";
            e.target[2].value = "";
            toast.success(response.message);
            setWords(response.data);
        } else {
            toast.error(response.message);
        }
    }

    return (
        <>
            <Title className="my-[30px] sm:my-[45px]">Choisir la langue</Title>
            <div className='w-full mb-[30px] sm:mb-[45px] flex justify-between gap-5'>
                {languages?.map((item, index) => (
                    <LanguageButton item={item} onClick={() => setActiveLanguage(item, index)}>{item.name}</LanguageButton>
                ))}
            </div>
            <form onSubmit={addANewWord} className='flex flex-col w-full gap-[15px]'>
                <LineInput onChange={(e) => setWord({ ...word, name: e.target.value })} placeholder={`Mot ${searchActiveLanguage()}`} />
                <LineInput onChange={(e) => setWord({ ...word, traduction: e.target.value })} placeholder="Traduction française" />
                <TextArea  onChange={(e) => setWord({ ...word, definition: e.target.value })} placeholder="Donnez une définition, un mémo, n’importe quoi" title="Définition/Mémo/Autre (optionnel)" />
                <GradientButton type="submit" className='mt-[15px]'>Ajouter le mot</GradientButton>
            </form>
        </>
    )
}