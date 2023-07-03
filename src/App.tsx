import { Home } from "./layouts/Home"
import './index.css';
import { PokemonProvider } from "./context/PokemonContext";

function App() {

  const AppState = ({children}: any) => {
    return  (
        <PokemonProvider>
          {children}
        </PokemonProvider>
      );
  };
  return (
    <>
      <AppState>
        <Home/>
      </AppState>
    </>
  )
}

export default App
