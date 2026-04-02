import { Select } from "@kobalte/core/select";
import { ArrowRightLeft } from 'lucide-solid';
import { createEffect, createSignal, on, onMount, createMemo } from "solid-js";
import toast from "solid-toast";
import { API_GET_LANGUAGES } from "../../apiConfig/api-url";
import { convertLanguagesResponse } from "../../utils/utils";
import './styles.scss';
import LanguageDropdown from "./LanguageDropdown";

const LanguageSelector = (props) => {
  const { fromLang, setFromLang, toLang, setToLang } = props;

  const [languagesList, setLanguagesList] = createSignal([]);

  // memoized options for better performance
  const languageOptions = createMemo(() =>
    convertLanguagesResponse(languagesList)
  );

  // to set the default languages as soon as api response is received
  createEffect(on(languagesList, () => {
    if (languagesList()) {
      setFromLang({ label: 'English', value: 'en' });
      setToLang({ label: 'Hindi', value: 'hi' });
    }
  }))

  // function to fetch languages list from api
  const fetchLanguages = async () => {
    try {
      const response = await fetch(API_GET_LANGUAGES);
      if (!response.ok) {
        toast.error('Failed to fetch languages');
        throw new Error("Failed to fetch languages");
      }

      const json = await response.json();
      setLanguagesList(json.languages);
    } catch (err) {
      setError(err.message);
      toast.error("Unable to load languages");
    }
  };

  // onMount will run only once, when the component is mounted
  onMount(fetchLanguages);

  // function to swap languages
  const handleSwap = () => {
    const prevFrom = fromLang();
    setFromLang(toLang());
    setToLang(prevFrom);
  };

  // function to render select options
  const renderItem = (props) => (
    <Select.Item item={props?.item} class="select-item">
      <Select.ItemLabel>{props.item.rawValue.label}</Select.ItemLabel>
      <Select.ItemIndicator>✓</Select.ItemIndicator>
    </Select.Item>
  );

  return (
    <div class='language-selector-container'>

      <div class='from-selector'>
        <label class='label'>From</label>
        <LanguageDropdown
          languageOptions={languageOptions}
          value={fromLang}
          onChange={setFromLang}
          label="From Language"
          languagesList={languagesList}
        />
      </div>

      <div
        class='swap-lang-icon cursor-pointer'
        title='Swap Language'
        onClick={handleSwap}
      >
        <ArrowRightLeft size={18} style={{ color: 'var(--color-dark-teal)' }} />
      </div>

      <div class='to-selector'>
        <label class='label'>To</label>
        <LanguageDropdown
          languageOptions={languageOptions}
          value={toLang}
          onChange={setToLang}
          label="To Language"
          languagesList={languagesList}
        />
      </div>
    </div>
  );
};

export default LanguageSelector;