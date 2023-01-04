import { useEffect } from "react";
import { toast } from "react-toastify";
import { getLanguages } from "../../api/languages/languages";
import { updateWord } from "../../api/words/words";
import joinClasses from "../../helpers/joinClasses";
import { GradientButton, LanguageButton, LineInput, TextArea, Title } from "../atoms";

export function WordDetail({ setWords, languages, setLanguages, selectedWord, setStatus, setSelectedWord }) {

  const setActiveLanguage = (item, index) => {
    if (item.active === false) {
      const newLanguages = languages.map((item) => {
        return { ...item, active: false };
      });
      newLanguages[index].active = true;
      setLanguages(newLanguages);
      setSelectedWord({ ...selectedWord, languageId: item.id })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const newLanguages = languages.map((item) => {
      return { ...item, active: false };
    }
    );
    const activeLanguage = newLanguages.find((item) => item.id === selectedWord.languageId);
    activeLanguage.active = true;
    setLanguages(newLanguages);
  }, [])

  const editWord = async (e, word) => {
    e.preventDefault();
    const response = await updateWord(word);
    if (response.error === false) {
      toast.success(response.message);
      setStatus("list");
      setSelectedWord({});
      setWords(response.data);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <>
      <Title className="my-[30px] sm:my-[45px]">Modifier votre mot</Title>
      <div className='w-full mb-[30px] sm:mb-[45px] flex justify-between gap-5'>
        {languages?.map((item, index) => (
          <LanguageButton item={item} onClick={() => setActiveLanguage(item, index)}>{item.name}</LanguageButton>
        ))}
      </div>
      <form onSubmit={(e) => editWord(e, selectedWord)} className='flex flex-col w-full gap-[15px]'>
        <LineInput onChange={(e) => setSelectedWord({ ...selectedWord, name: e.target.value })} defaultValue={selectedWord.name} placeholder={`Mot ${selectedWord?.language.traduction.toLowerCase()} `} />
        <LineInput onChange={(e) => setSelectedWord({ ...selectedWord, traduction: e.target.value })} defaultValue={selectedWord.traduction} placeholder="Traduction française" />
        <TextArea onChange={(e) => setSelectedWord({ ...selectedWord, definition: e.target.value })} defaultValue={selectedWord.definition} placeholder="Donnez une définition, un mémo, n’importe quoi" title="Définition/Mémo/Autre (optionnel)" />
        <GradientButton type="submit" className='mt-[15px]'>Ajouter le mot</GradientButton>
      </form>

      <div
        className="block absolute top-0 right-[24px] cursor-pointer"
        onClick={() => { setStatus("list"); setSelectedWord({}) }}
      >
        <span
          className={joinClasses(
            "mb-2 block h-[3px] w-[30px] rounded-full bg-black dark:bg-white transition duration-300 ease-in-out translate-y-[11px] rotate-45 transform"
          )}
        />
        <span
          className={joinClasses(
            "mb-2 block h-[3px] translate-x-[7px] w-[23px] rounded-full bg-black dark:bg-white transition duration-300 ease-in-out opacity-0"
          )}
        />
        <span
          className={joinClasses(
            "block h-[3px] w-[30px] rounded-full bg-black dark:bg-white transition duration-300 ease-in-out -translate-y-[11px] -rotate-45 transform"
          )}
        />
      </div>
    </>
  )
}