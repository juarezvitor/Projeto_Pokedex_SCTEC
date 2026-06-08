// ============================================================
// services/PokeApiService.ts
// Camada de integração com a PokeAPI externa.
// Utiliza fetch nativo do Node.js com async/await e try/catch.
// ============================================================

import { PokemonResumo, PokemonApiResponse } from "../models/Pokemon.js";
import { APIError, PokemonNotFoundError } from "../models/CustomErrors.js";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

/**
 * Serviço responsável por toda comunicação com a PokeAPI.
 * Retorna objetos tipados via Interfaces definidas em models/Pokemon.ts.
 */
export class PokeApiService {
  /**
   * Busca um Pokémon por nome ou ID na PokeAPI.
   * Trata erros de rede, status 404 e falhas genéricas.
   *
   * @param nomeOuId - Nome (string) ou ID (number como string) do Pokémon
   * @returns Promise com PokemonResumo ou null em caso de falha
   */
  public async buscarPokemon(
    nomeOuId: string
  ): Promise<PokemonResumo | null> {
    const url = `${BASE_URL}/${nomeOuId.toLowerCase().trim()}`;

    try {
      const resposta = await fetch(url);

      if (resposta.status === 404) {
        throw new PokemonNotFoundError(nomeOuId);
      }

      if (!resposta.ok) {
        throw new APIError(
          `Erro ao acessar a PokeAPI: ${resposta.statusText}`,
          resposta.status
        );
      }

      const dados = (await resposta.json()) as PokemonApiResponse;

      return this.mapearParaResumo(dados);
    } catch (erro: unknown) {
      if (erro instanceof PokemonNotFoundError) {
        console.log(`[ERRO] Pokémon não encontrado: ${erro.nomeBuscado}`);
        return null;
      }

      if (erro instanceof APIError) {
        console.log(`[ERRO] Falha na API (${erro.statusCode}): ${erro.message}`);
        return null;
      }

      console.log("[ERRO] Não foi possível buscar o Pokémon. Verifique sua conexão.");
      return null;
    }
  }

  /**
   * Mapeia o objeto bruto da PokeAPI para a interface PokemonResumo.
   * Utiliza map para extrair os tipos do array retornado pela API.
   *
   * @param dados - Resposta bruta da PokeAPI tipada com PokemonApiResponse
   * @returns Objeto simplificado PokemonResumo
   */
  private mapearParaResumo(dados: PokemonApiResponse): PokemonResumo {
    const tipos: string[] = dados.types.map(
      (item) => item.type.name
    );

    return {
      id: dados.id,
      nome: dados.name,
      tipos,
      altura: dados.height,
      peso: dados.weight,
    };
  }
}
