// ============================================================
// controllers/TerminalController.ts
// Camada de Interface do Usuário (UI).
// Orquestra as chamadas aos serviços e exibe resultados no terminal.
// ============================================================

import { CatalogoPokemon, PokemonResumo } from "../models/Pokemon.js";
import { PokeApiService } from "../services/PokeApiService.js";
import { formatarPokemon, formatarSeparador } from "../utils/textFormatters.js";

/**
 * Controlador principal da aplicação de terminal.
 * Recebe dependências injetadas (PokeApiService e CatalogoPokemon)
 * e coordena o fluxo de exibição e interação.
 */
export class TerminalController {
  private readonly pokeApiService: PokeApiService;
  private readonly catalogo: CatalogoPokemon;

  constructor(pokeApiService: PokeApiService, catalogo: CatalogoPokemon) {
    this.pokeApiService = pokeApiService;
    this.catalogo = catalogo;
  }

  /**
   * Busca um Pokémon na API e exibe o resultado formatado no terminal.
   * Se encontrado, retorna o objeto para uso posterior (ex: adicionar ao catálogo).
   *
   * @param nomeOuId - Nome ou ID do Pokémon a buscar
   * @returns PokemonResumo ou null
   */
  public async buscarEExibir(
    nomeOuId: string
  ): Promise<PokemonResumo | null> {
    console.log(`\n[INFO] Buscando Pokémon: "${nomeOuId}"...`);

    const pokemon = await this.pokeApiService.buscarPokemon(nomeOuId);

    if (pokemon !== null) {
      console.log(`[OK] Pokémon encontrado: ${pokemon.nome}`);
      console.log(formatarPokemon(pokemon));
    }

    return pokemon;
  }

  /**
   * Adiciona um Pokémon ao catálogo em memória.
   *
   * @param pokemon - PokemonResumo a adicionar
   */
  public adicionarAoCatalogo(pokemon: PokemonResumo): void {
    this.catalogo.adicionar(pokemon);
  }

  /**
   * Lista todos os Pokémon do catálogo com separadores visuais.
   */
  public listarCatalogo(): void {
    console.log(formatarSeparador("CATÁLOGO"));
    this.catalogo.listar();

    if (this.catalogo.total > 0) {
      console.log(
        `[INFO] Total: ${this.catalogo.total} Pokémon | Peso médio: ${this.catalogo.pesoMedio()}g`
      );
      console.log(
        `[INFO] Todos com nome válido: ${this.catalogo.todosComNome() ? "Sim" : "Não"}`
      );
    }
  }

  /**
   * Remove um Pokémon do catálogo pelo ID.
   *
   * @param id - ID numérico do Pokémon
   */
  public removerDoCatalogo(id: number): void {
    console.log(`\n[INFO] Removendo Pokémon com ID #${id}...`);
    this.catalogo.remover(id);
  }

  /**
   * Demonstra filtro por tipo no catálogo.
   *
   * @param tipo - Tipo de Pokémon (ex: "electric", "fire")
   */
  public filtrarPorTipo(tipo: string): void {
    const resultado = this.catalogo.filtrarPorTipo(tipo);
    console.log(`\n[INFO] Pokémon do tipo "${tipo}" no catálogo:`);

    if (resultado.length === 0) {
      console.log(`[AVISO] Nenhum Pokémon do tipo "${tipo}" encontrado.`);
      return;
    }

    resultado.forEach((p: PokemonResumo) => {
      console.log(`  → ${formatarPokemon(p)}`);
    });
  }
}
