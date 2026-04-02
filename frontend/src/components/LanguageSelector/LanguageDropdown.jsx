import { Select } from "@kobalte/core/select";

const LanguageDropdown = (props) => {

  // function to render select options
  const renderItem = (props) => (
    <Select.Item item={props?.item} class="select-item">
      <Select.ItemLabel>{props.item.rawValue.label}</Select.ItemLabel>
      <Select.ItemIndicator>✓</Select.ItemIndicator>
    </Select.Item>
  );

  return (
    <Select
      options={props.languageOptions()}
      optionValue='value'
      optionTextValue='label'
      value={props.value()}
      onChange={props.onChange}
      itemComponent={renderItem}
      disallowEmptySelection
      placeholder='Select Language'
      disabled={props.languagesList()?.length === 0}
    >
      {/* select trigger -> button which is used to to open dropdown popover options */}
      <Select.Trigger class='select-trigger' aria-label={props.label}>
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
  );
}

export default LanguageDropdown;