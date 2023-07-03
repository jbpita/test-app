import { useEffect, useState } from 'react';
import { Pokemon } from '../interface/reqRes';
import { usePokemons } from '../hooks/usePokemons';


const PokemonTable: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [letterCounts, setLetterCounts] = useState<{ [letter: string]: number }>({});
  const { pokemons } = usePokemons({ limitDefault: 1281 })

  useEffect(() => {
    setPokemonList(pokemons?.results ?? [])
    const counts: { [letter: string]: number } = {};

    for (const pokemon of pokemonList) {
      const firstLetter = pokemon.name.charAt(0).toUpperCase();
      counts[firstLetter] = (counts[firstLetter] || 0) + 1;
    }

    setLetterCounts(counts);
  }, [pokemonList,pokemons]);


    const columns = Object.entries(letterCounts)
    .sort(([letterA], [letterB]) => letterA.localeCompare(letterB))
    .reduce((acc: Array<Array<[string, number]>>, [letter, count], index) => {
        const columnIndex = index % 4;
        if (!acc[columnIndex]) {
        acc[columnIndex] = [];
        }
        acc[columnIndex].push([letter, count]);
        return acc;
    }, []);

    return (
        <div className='flex flex-col items-center justify-center container md:mx-10'>
            <h1>Resumen</h1>
            <div className="grid grid-cols-4 gap-4">
                {columns.map((column, index) => (
                    <div key={index}>
                    {column.map(([letter, count]) => (
                        <div key={letter}>
                            <p>{letter}: {count}</p>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonTable;
