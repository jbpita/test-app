import { useContext } from "react";
import { usePokemons } from "../hooks/usePokemons"
import { PokemonContext } from "../context/PokemonContext";
import { Pokemon } from "../interface/reqRes";
import { SearchPokemon } from "./SearchPokemon";

export const TablePokemon = () => {
    const {
        nextsPage,
        previousPage,
        pokemons,
        offset,
        setOffset,
        limit,
        currentPage
    } = usePokemons({
        limitDefault: 10
    })

    const goToPage = (pageNumber: number) => {
        const newOffset = (pageNumber - 1) * limit;
        setOffset(newOffset);
    };

    const { updateCurrentlyPokemon } = useContext(PokemonContext)

    const selectPokemon = (pokemon: Pokemon) => {
        updateCurrentlyPokemon(pokemon)
    }

    const handleSearch = (pokemonName: string) => {
        // Aquí puedes implementar la lógica para buscar y mostrar el Pokémon seleccionado
        console.log(`Buscar Pokémon: ${pokemonName}`);
    }

    const renderPageNumbers = () => {
        if (!pokemons) {
            return null;
        }
        const totalPageCount = Math.ceil(pokemons.count / limit);
        const visiblePages = 5; // Ajusta este valor según tus preferencias

        if (totalPageCount <= visiblePages) {
            return (
            <>
                {Array.from({ length: totalPageCount }, (_, i) => (
                <li key={i}>
                    <button
                    onClick={() => goToPage(i + 1)}
                    className={`btn px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 ${
                        i + 1 === currentPage
                        ? 'bg-blue-400 text-white'
                        : 'hover:bg-blue-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                    >
                    {i + 1}
                    </button>
                </li>
                ))}
            </>
            );
        }

        let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
        let endPage = startPage + visiblePages - 1;

        if (endPage > totalPageCount) {
            endPage = totalPageCount;
            startPage = Math.max(endPage - visiblePages + 1, 1);
        }

        const pageNumbers = Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );


        return (
            <>
            {startPage > 1 && <li>...</li>}
            {pageNumbers.map((pageNumber) => (
                <li key={pageNumber}>
                <button
                    onClick={() => goToPage(pageNumber)}
                    className={`btn px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 ${
                    pageNumber === currentPage
                    ? 'bg-blue-400 text-white'
                    : 'hover:bg-blue-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                >
                    {pageNumber}
                </button>
                </li>
            ))}
            {endPage < totalPageCount && <li>...</li>}
            </>
        );
    };

    return (
        <div className="flex flex-col justify-center">
        <h1 className="text-center text-xl font-bold mt-2">Lista de Pokemons</h1>
        <SearchPokemon onSearch={handleSearch} />
        <table className="table-fixed">
            <thead>
            <tr>
                <div className="grid grid-cols-2 gap-2">
                <th>#</th>
                <th>name</th>
                </div>
            </tr>
            </thead>
            <tbody>
            {pokemons?.results.map((value, index) => (
                <tr key={index}>
                <div
                 className="grid grid-cols-2 gap-2 text-center border border-sky-950 rounded  divide-x mt-2 mx-2 py-2 hover:bg-sky-700 active:bg-sky-800 focus:outline-none focus:ring focus:bg-sky-300"
                 onClick={() => selectPokemon(value)} 
                >
                    <td>{ index + offset + 1 }</td>
                    <td>{ value.name }</td>
                </div>
                </tr>
            ))}
            </tbody>
        </table>

        <nav aria-label="Page navigation example" className="mt-4 mx-2">
            <ul className="inline-flex">
            <li>
                <button
                onClick={previousPage}
                className="btn px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                Previous
                </button>
            </li>
            {renderPageNumbers()}
            <li>
                <button
                onClick={nextsPage}
                className="btn px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                Next
                </button>
            </li>
            </ul>
        </nav>
        </div>
    );
};
