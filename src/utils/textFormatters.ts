// ============================================================
// utils/textFormatters.ts
// Funções utilitárias puras com tipagem explícita.
// Responsáveis por formatar texto para exibição no terminal.
// ============================================================

import { PokemonResumo } from "../models/Pokemon.js";

/**
 * Formata um PokemonResumo como string legível para o terminal.
 *
 * @param pokemon - Objeto PokemonResumo a formatar
 * @returns String formatada com os dados do Pokémon
 */
export function formatarPokemon(pokemon: PokemonResumo): string {
  const tipos: string = pokemon.tipos.join(", ");
  return `#${pokemon.id} - ${pokemon.nome} | Tipos: ${tipos} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso}`;
}

/**
 * Formata um separador visual para o terminal com título centralizado.
 *
 * @param titulo - Texto a exibir no separador
 * @param largura - Largura total do separador (padrão: 40)
 * @returns String do separador formatado
 */
export function formatarSeparador(titulo: string, largura: number = 40): string {
  const tracejado: string = "=".repeat(largura);
  const tituloFormatado: string = ` ${titulo.toUpperCase()} `;
  const preenchimento: number = Math.max(0, Math.floor((largura - tituloFormatado.length) / 2));
  const linha: string = "=".repeat(preenchimento) + tituloFormatado + "=".repeat(preenchimento);
  return `\n${tracejado}\n${linha}\n${tracejado}`;
}

/**
 * Capitaliza a primeira letra de uma string.
 *
 * @param texto - String a capitalizar
 * @returns String com primeira letra maiúscula
 */
export function capitalizar(texto: string): string {
  if (texto.length === 0) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Formata uma lista de Pokémon para exibição resumida (mapa de nomes).
 * Utiliza: map para transformar array de objetos em array de strings.
 *
 * @param pokemons - Array de PokemonResumo
 * @returns Array de strings formatadas
 */
export function formatarListaNomes(pokemons: PokemonResumo[]): string[] {
  return pokemons.map(
    (pokemon: PokemonResumo) => `${capitalizar(pokemon.nome)} (#${pokemon.id})`
  );
}
