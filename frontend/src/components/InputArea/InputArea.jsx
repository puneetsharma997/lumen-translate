import { TextField } from '@kobalte/core/text-field';
import { Copy, Volume2, X } from 'lucide-solid';
import { createEffect, on, Show } from 'solid-js';
import toast from 'solid-toast';
import { speakText } from '../../utils/utils';
import './styles.scss';

const InputArea = (props) => {

  const { translatedText, setTranslatedText, inputText, setInputText, fromLang, toLang } = props;

  const totalCharacters = 5000;

  createEffect(on(inputText, () => {
    if (inputText()?.length === 0) {
      setTranslatedText('');
    }
  }))

  // function to copy translated text to clipboard
  const handleCopyToClipboard = () => {
    if (translatedText()) {
      navigator.clipboard.writeText(translatedText());
      toast.success('Copied successfully.');
    }
  }

  // function to remove input text from text area
  const handleRemoveInputText = () => {
    if (inputText()) {
      setTranslatedText('');
      setInputText('');
    }
  }

  // onclick function to speak text
  const handleOnSpeakClick = (type) => {
    console.log('clicked')
    if (type === 'source') {
      speakText(inputText(), fromLang()?.value);
    }
    else if (type === 'target') {
      speakText(translatedText(), toLang()?.value);
    }
  }

  return (
    <div class='input-area-container'>
      <div class='input-text'>
        <div class='heading'>
          <p>Source Text</p>
          <div class='cross-icon' onClick={handleRemoveInputText} title='Clear'>
            <X size={18} style={{ color: 'var(--color-dark-teal)' }} />
          </div>
        </div>

        <div class='content'>
          <TextField value={inputText()} onChange={setInputText} style={{ 'margin-top': '1.5rem' }}>
            <TextField.TextArea class='text-area-field' maxlength={totalCharacters}
              placeholder='Type or paste text here to translate...'
            />
          </TextField>

          <div style={{ display: 'flex', 'align-items': 'center', 'justify-content': 'space-between' }}>
            <div
              class='speak-icon' title='Listen'
              style={{ visibility: inputText() ? 'visible' : 'hidden' }}
              onClick={() => handleOnSpeakClick('source')}>
              <Volume2 size={18} style={{ color: 'var(--color-dark-teal)' }} />
            </div>
            <div class='total-characters'>
              <p>{inputText().length} / {totalCharacters}</p>
            </div>
          </div>
        </div>
      </div>

      <div class='translated-text'>
        <div class='heading'>
          <p>Translation</p>
          <div class='copy-icon' onClick={handleCopyToClipboard} title='Copy'>
            <Copy size={18} style={{ color: 'var(--color-dark-teal)' }} />
          </div>
        </div>

        <div class='content'>
          {/* "Show" component act as ternary operator */}
          <Show when={!translatedText()}>
            <p>Your translation will appear here.</p>
          </Show>

          <Show when={translatedText()}><p>{translatedText()}</p></Show>
        </div>

        <Show when={translatedText()}>
          <div style={{}} class='speak-icon' title='Listen' onClick={() => handleOnSpeakClick('target')}>
            <Volume2 size={18} style={{ color: 'var(--color-dark-teal)' }} />
          </div>
        </Show>
      </div>
    </div>
  )
}

export default InputArea
