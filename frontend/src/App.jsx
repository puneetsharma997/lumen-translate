import { Toaster } from 'solid-toast';
import Main from './components/Main';
import './globalStyles.scss';

const App = () => {
  return (
    <>
      <Main />
      <Toaster />
    </>
  );
};

export default App;
