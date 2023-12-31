import { useState, useEffect, useContext } from 'react';
import Autosuggest, { SuggestionSelectedEventData, SuggestionsFetchRequestedParams } from 'react-autosuggest'
import { Pokemon } from '../interface/reqRes';
import '../styles/SearchPokemon.css'
import { usePokemons } from '../hooks/usePokemons';
import { PokemonContext } from '../context/PokemonContext';

export const SearchPokemon = () => {
    const [value, setValue] = useState('')
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    const [suggestions, setSuggestions] = useState<Pokemon[]>([])

    const { updateCurrentlyPokemon } = useContext(PokemonContext)

    const {
        pokemons
    } = usePokemons({
        limitDefault: 1281
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setPokemonList(pokemons?.results ?? [])
    },)
    
    // Método para obtener las sugerencias de autocompletado
    const getSuggestions = (value: string): Array<Pokemon> => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
  
      return inputLength === 0
      ? []
      : pokemonList.filter((pokemon) =>
          pokemon.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };
  
    // Método para renderizar las sugerencias de autocompletado
    const renderSuggestion = (suggestion: Pokemon) => (
      <div>{suggestion.name}</div>
    );
  
    // Método para manejar los cambios en el valor del input
    const onChange = (
        _: React.FormEvent<unknown>,
        { newValue }: Autosuggest.ChangeEvent
      ): void => {
        setValue(newValue);
      };
  
    // Método para manejar la selección de una sugerencia de autocompletado
    const onSuggestionSelected = (
        _: React.FormEvent<unknown>,
        { suggestion }: SuggestionSelectedEventData<Pokemon>
      ): void => {
        setValue(suggestion.name);
        updateCurrentlyPokemon(suggestion)
      };
  
    // Método para actualizar las sugerencias de autocompletado
    const onSuggestionsFetchRequested = (
        { value }: SuggestionsFetchRequestedParams
      ): void => {
        setSuggestions(getSuggestions(value));
      };
  
    // Método para limpiar las sugerencias de autocompletado
    const onSuggestionsClearRequested = () => {
      setSuggestions([]);
    };
  
    // Configuración de Autosuggest
    const inputProps = {
      placeholder: 'Buscar Pokémon',
      value,
      onChange: onChange
    };
  
    return (
        <Autosuggest
            suggestions={suggestions ?? []}
            onSuggestionSelected={onSuggestionSelected}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={{
                container: 'searchbar-container',
                input: 'searchbar-input',
                suggestionsContainer: 'suggestions-container',
                suggestionHighlighted: 'suggestion-highlighted',
            }}
        />
    );
};
  