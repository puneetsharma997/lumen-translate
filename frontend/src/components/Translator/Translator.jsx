import { createSignal } from 'solid-js';
import { API_TRANSLATE } from '../../apiConfig/api-url';
import InputArea from '../InputArea/InputArea';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import TranslateButton from '../TranslateButton/TranslateButton';
import './styles.scss';

const Translator = () => {

  const [fromLang, setFromLang] = createSignal(null);
  const [toLang, setToLang] = createSignal(null);

  const [isLoading, setIsLoading] = createSignal(false);

  const [inputText, setInputText] = createSignal('');
  const [translatedText, setTranslatedText] = createSignal('');

  // function to translate the text (call api)
  const handleBtnClick = async () => {
    setIsLoading(true);

    try {
      const payload = {
        source: fromLang()?.value,
        target: toLang()?.value,
        text: inputText(),
      }

      const response = await fetch(API_TRANSLATE, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      setTranslatedText(json.translated_text);
    }
    catch (error) {
      console.error('API error -', error);
      toast.error(error.message || 'Unexpected error occurred');
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div class='translator-container'>
      <LanguageSelector
        fromLang={fromLang} setFromLang={setFromLang}
        toLang={toLang} setToLang={setToLang}
      />

      <InputArea
        translatedText={translatedText} setTranslatedText={setTranslatedText}
        inputText={inputText} setInputText={setInputText}
        fromLang={fromLang} toLang={toLang}
      />

      <TranslateButton handleBtnClick={handleBtnClick} isLoading={isLoading} />
    </div>
  )
}

export default Translator;
