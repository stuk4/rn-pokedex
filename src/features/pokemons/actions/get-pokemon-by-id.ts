import { pokeApi } from "../../../config/api/pokeApi";
import { Pokemon } from "../domain/entities/pokemon";
import { PokeAPIPokemon } from "../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../infrastructure/mappers/pokemon.mapper";

export const getPokemonById = async (id: string): Promise<Pokemon> => {
  try {
    console.log("PETICION ", id);
    const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);
    const pokemon = await PokemonMapper.pokeApiPokemontToEntity(data);
    return pokemon;
  } catch (error) {
    throw new Error("Error getting pokemon by id");
  }
};
