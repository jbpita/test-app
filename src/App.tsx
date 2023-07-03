import { Home } from "./layouts/Home";
import './index.css';
import { PokemonProvider } from "./context/PokemonContext";

function App() {
  return (
    <PokemonProvider>
      <Home/>
    </PokemonProvider>
  );
}

export default App;
