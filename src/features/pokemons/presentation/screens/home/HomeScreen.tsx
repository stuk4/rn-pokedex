import React from "react";

import { FlatList, StyleSheet, View } from "react-native";
import { getPokemons } from "../../../actions";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { ActivityIndicator, Text } from "react-native-paper";
import { globalTheme } from "../../../../../config/theme/global-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PokeballBg } from "../../components/PokeballBg";
import { PokemonCard } from "../../components/PokemonCard";

export const HomeScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  const queryClient = useQueryClient();
  const { isFetching, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons", "infinite"],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 60 minutes
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach((pokemon) => {
        queryClient.setQueryData(["pokemon", pokemon.id.toString()], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (_, pages) => pages.length,
  });

  return (
    <View>
      <PokeballBg style={style.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        style={{
          paddingTop: top + 20,
        }}
        contentContainerStyle={[
          {
            paddingBottom: bottom + 50,
          },
          globalTheme.globalMargin,
        ]}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={() => (
          <Text
            style={[
              {
                marginBottom: 20,
              },
            ]}
            variant="displayMedium"
          >
            Pokédex
          </Text>
        )}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <>{isFetching && <ActivityIndicator size="large" />}</>
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  imgPosition: {
    position: "absolute",
    top: -100,
    right: -100,
  },
});
