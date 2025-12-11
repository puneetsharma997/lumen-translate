import { Button } from "@kobalte/core/button";
import { Match, Switch } from "solid-js";
import './styles.scss';

const TranslateButton = (props) => {
  const { handleBtnClick, isLoading } = props;

  return (
    <div class='button-container'>
      <Button
        onClick={handleBtnClick}
        class={`btn`}
        style={{
          cursor: isLoading() ? 'not-allowed' : 'pointer',
          'background-color': isLoading() ? '#60D5D4' : 'var(--color-primary-teal)'
        }}
      >
        {/* "Switch" and "Match" component here is used to conditionally render the button text */}
        <Switch>
          <Match when={isLoading()}>
            Translating...
          </Match>

          <Match when={!isLoading()}>
            Translate
          </Match>
        </Switch>
      </Button>
    </div>
  )
}

export default TranslateButton;
