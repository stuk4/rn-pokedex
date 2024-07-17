import { pokeApi } from "../../../config/api/pokeApi";
import { Pokemon } from "../domain/entities/pokemon";

import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from "../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../infrastructure/mappers/pokemon.mapper";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getPokemons = async (
  page: number,
  limit: number = 20
): Promise<Pokemon[]> => {
  try {
    const url = "pokemon";

    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url, {
      params: {
        offset: page * 20,
        limit,
      },
    });
    const pokemonPromises = data.results.map((info) => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemonsPromises = pokeApiPokemons.map((pokeApiPokemon) =>
      PokemonMapper.pokeApiPokemontToEntity(pokeApiPokemon.data)
    );
    const pokemons = await Promise.all(pokemonsPromises);

    return pokemons;
  } catch (error) {
    throw new Error("Error getting pokemons");
  }
};
