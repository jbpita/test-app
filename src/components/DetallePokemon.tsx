/* eslint-disable react-hooks/exhaustive-deps */
import { PokemonContext } from '../context/PokemonContext';
import { useContext, useEffect, useState } from 'react';
import { PokemonDetails } from '../interface/reqRes';
import { reqResApi } from '../api/reqRes';


export const DetallePokemon = () => {

  const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
  const [imageUrl, setImageUrl] = useState("")
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>({} as PokemonDetails)


  const { currentlyPokemon } = useContext(PokemonContext)

  const getDetailPokemon = async (numberPokemon: number | string) => {
    const res = await reqResApi().get<PokemonDetails>(`/pokemon/${numberPokemon}/`)
    if ( res.status === 200 || res.status === 201 ) {
      setPokemonDetails(res.data)
    }
  }

  useEffect(() => {
    const numberPokemon = currentlyPokemon?.url.split("/").filter(Boolean).pop();
    setImageUrl(url+numberPokemon+".png")
    getDetailPokemon(Number(numberPokemon))
    console.log(pokemonDetails)
  }, [currentlyPokemon])
  
  return (
    <div className="flex flex-col items-center justify-center container md:mx-5 mt-20 border bg-sky-700 border-sky-950 rounded">
      <div className="mb-5">
        <img
          src={imageUrl}
          alt={currentlyPokemon?.name}
          width={200}
          height={200}
          className="rounded-full border border-sky-950 bg-slate-50 mt-2"
        />
      </div>
      <div className="mb-5">
        <div className="card-body text-cyan-5">
          <h1 className="card-body-title text-center text-xl font-semibold text-cyan-5">
            {currentlyPokemon?.name}
          </h1>
          <p className="card-body-text text-center text-cyan-5">Nombre</p>
        </div>
        <div className="card-footer flex justify-around">
          <div className="card-footer-social mx-2 text-cyan-50">
            <h3 className="text-xl font-semibold text-center">
              {pokemonDetails.stats && pokemonDetails.stats[1]?.base_stat}
            </h3>
            <p>Ataque</p>
          </div>
          <div className="card-footer-social mx-2 text-cyan-50">
            <h3 className="text-xl font-semibold text-center">
              {pokemonDetails.stats && pokemonDetails.stats[3]?.base_stat}
            </h3>
            <p>Ataque Especial</p>
          </div>
          <div className="card-footer-social mx-2 text-cyan-50">
            <h3 className="text-xl font-semibold text-center">
              {pokemonDetails.stats && pokemonDetails.stats[2]?.base_stat}
            </h3>
            <p>Defensa</p>
          </div>
        </div>
      </div>
    </div>  
  )
}
