import { useEffect, useState } from "react"
import { reqResApi } from "../api/reqRes"
import { ReqResListado } from "../interface/reqRes"

interface UsePokemonProps {
    limitDefault: number
}

export const usePokemons = ({ limitDefault }: UsePokemonProps) => {
    const [pokemons, setPokemons] = useState<ReqResListado>()
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(limitDefault);
    const [currentPage, setCurrentPage] = useState<number>(1);    

    useEffect(() => {
        const loadPokemoms = async () => {
            const res = await reqResApi().get<ReqResListado>(`/pokemon`, {
                params: {
                    offset,
                    limit
                }
            })
            
            if (res.status === 200 || res.status === 201){
                setPokemons(res.data)
                const currentPageAux = Math.floor(offset / limit) + 1;
                setCurrentPage(currentPageAux);
            }
        }
        loadPokemoms()
    }, [offset, limit])
    
   
    const updateState = (url: string) => {
        const urlParse = new URL(url)
        const searchParams = urlParse.searchParams;
        const offset = Number(searchParams.get('offset'));
        const limit = Number(searchParams.get('limit'));
        setOffset(offset)
        setLimit(limit)
    }

    const previousPage = () => {
        const url = pokemons?.previous
        if (!url){
            return
        }
        updateState(url)
    }

    const nextsPage = () => {
        const url = pokemons?.next
        if (!url){
            return
        }
        updateState(url)
    }
  
    return {
        pokemons,
        previousPage,
        nextsPage,
        offset,
        currentPage,
        setOffset,
        limit
    }
}
