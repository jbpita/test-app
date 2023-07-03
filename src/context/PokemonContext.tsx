import { createContext, useState } from 'react';
import { Pokemon } from '../interface/reqRes';

interface ContextProps {
    currentlyPokemon: Pokemon | undefined
    updateCurrentlyPokemon: (pokemon: Pokemon) => void
}

export const PokemonContext = createContext<ContextProps>({} as ContextProps);

export const PokemonProvider = ({children}: any) => {

    const [currentlyPokemon, setCurrentlyPokemon] = useState<Pokemon | undefined>( undefined);

    const updateCurrentlyPokemon = (pokemon: Pokemon) => {
        setCurrentlyPokemon(pokemon)
    }


    return (
        <PokemonContext.Provider 
            value={{ 
                currentlyPokemon,
                updateCurrentlyPokemon 
            }}>
            {children}
        </PokemonContext.Provider>
    );
};
