import { Select } from "@kobalte/core/select";
import { ArrowRightLeft } from 'lucide-solid';
import { createEffect, createSignal, on, onMount } from "solid-js";
import toast from "solid-toast";
import { API_GET_LANGUAGES } from "../../apiConfig/api-url";
import { convertLanguagesResponse } from "../../utils/utils";
import './styles.scss';


const LanguageSelector = (props) => {
  const { fromLang, setFromLang, toLang, setToLang } = props;

  const [languagesList, setLanguagesList] = createSignal([]);

  // to set the default languages as soon as api response is received
  createEffect(on(languagesList, () => {
    if (languagesList()) {
      setFromLang({ label: 'English', value: 'en' });
      setToLang({ label: 'Hindi', value: 'hi' });
    }
  }))

  // onMount will run only once, when the component is mounted
  // calling get languages api to fetch list of languages
  onMount(async () => {
    const response = await fetch(API_GET_LANGUAGES, { method: 'GET' });
    if (!response.ok) {
      toast.error('Failed to fetch languages');
      throw new Error('Failed to fetch languages');
    }

    const json = await response.json();
    setLanguagesList(json.languages);
  })

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
        <Select
          options={convertLanguagesResponse(languagesList)}
          optionValue='value'
          optionTextValue='label'
          value={fromLang()}
          onChange={setFromLang}
          itemComponent={renderItem}
          disallowEmptySelection={true}
          placeholder='Select Language'
        >
          {/* select trigger -> button which is used to to open dropdown popover options */}
          <Select.Trigger class='select-trigger' aria-label='From Language'>
            <Select.Value class='select-value'>
              {(state) => state.selectedOption()?.label || "Loading languages..."}
            </Select.Value>
            <Select.Icon class='select-icon'>▼</Select.Icon>
          </Select.Trigger>

          {/* container for dropdown popover options list */}
          <Select.Portal>
            <Select.Content class='select-content'>
              <Select.Listbox class='select-listbox' />
            </Select.Content>
          </Select.Portal>
        </Select>
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
        <Select
          options={convertLanguagesResponse(languagesList)}
          optionValue='value'
          optionTextValue='label'
          value={toLang()}
          onChange={setToLang}
          itemComponent={renderItem}
          disallowEmptySelection={true}
          placeholder='Select Language'
        >
          {/* select trigger -> button which is used to to open dropdown popover options */}
          <Select.Trigger class='select-trigger' aria-label='From Language'>
            <Select.Value class='select-value'>
              {(state) => state.selectedOption()?.label || "Loading languages..."}
            </Select.Value>
            <Select.Icon class='select-icon'>▼</Select.Icon>
          </Select.Trigger>

          {/* container for dropdown popover options list */}
          <Select.Portal>
            <Select.Content class='select-content'>
              <Select.Listbox class='select-listbox' />
            </Select.Content>
          </Select.Portal>
        </Select>
      </div>

    </div>
  );
};

export default LanguageSelector;