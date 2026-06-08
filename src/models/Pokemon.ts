// ============================================================
// models/Pokemon.ts
// Define interfaces de tipagem e a classe de catálogo local.
// ============================================================

/**
 * Representa o objeto simplificado de um Pokémon usado internamente.
 */
export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
}

/**
 * Representa a estrutura relevante do retorno da PokeAPI.
 * Apenas os campos necessários são mapeados.
 */
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

/**
 * Classe responsável por gerenciar o catálogo local de Pokémon em memória.
 * Utiliza modificadores de acesso, métodos de array e tipagem forte.
 */
export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];

  /**
   * Adiciona um Pokémon ao catálogo se ele ainda não existir (verifica por ID).
   * Utiliza: some (verificar duplicidade), push (inserção).
   */
  public adicionar(pokemon: PokemonResumo): void {
    const jaExiste: boolean = this.pokemons.some(
      (item: PokemonResumo) => item.id === pokemon.id
    );

    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
  }

  /**
   * Lista todos os Pokémon do catálogo.
   * Utiliza: forEach (iteração).
   */
  public listar(): void {
    if (this.pokemons.length === 0) {
      console.log("[AVISO] Catálogo vazio.");
      return;
    }

    console.log("\n--- Catálogo atual ---");
    this.pokemons.forEach((pokemon: PokemonResumo) => {
      console.log(
        `#${pokemon.id} - ${pokemon.nome} | Tipos: ${pokemon.tipos.join(", ")} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso}`
      );
    });
    console.log("----------------------\n");
  }

  /**
   * Remove um Pokémon do catálogo pelo ID.
   * Utiliza: some (verificar existência), filter (remoção).
   */
  public remover(id: number): void {
    const existe: boolean = this.pokemons.some(
      (pokemon: PokemonResumo) => pokemon.id === id
    );

    if (!existe) {
      console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
      return;
    }

    this.pokemons = this.pokemons.filter(
      (pokemon: PokemonResumo) => pokemon.id !== id
    );
    console.log("[OK] Pokémon removido do catálogo.");
  }

  /**
   * Busca um Pokémon no catálogo pelo nome.
   * Utiliza: find.
   */
  public buscarPorNome(nome: string): PokemonResumo | undefined {
    return this.pokemons.find(
      (pokemon: PokemonResumo) => pokemon.nome === nome.toLowerCase()
    );
  }

  /**
   * Retorna o total de Pokémon no catálogo.
   */
  public get total(): number {
    return this.pokemons.length;
  }

  /**
   * Retorna o peso médio de todos os Pokémon no catálogo.
   * Utiliza: reduce.
   */
  public pesoMedio(): number {
    if (this.pokemons.length === 0) return 0;

    const totalPeso: number = this.pokemons.reduce(
      (acumulador: number, pokemon: PokemonResumo) => acumulador + pokemon.peso,
      0
    );

    return Math.round(totalPeso / this.pokemons.length);
  }

  /**
   * Verifica se todos os Pokémon do catálogo têm nome definido.
   * Utiliza: every.
   */
  public todosComNome(): boolean {
    return this.pokemons.every(
      (pokemon: PokemonResumo) => pokemon.nome.trim().length > 0
    );
  }

  /**
   * Retorna todos os Pokémon de um determinado tipo.
   * Utiliza: filter, includes.
   */
  public filtrarPorTipo(tipo: string): PokemonResumo[] {
    return this.pokemons.filter((pokemon: PokemonResumo) =>
      pokemon.tipos.includes(tipo.toLowerCase())
    );
  }

  /**
   * Retorna a lista interna (somente leitura) para uso externo.
   */
  public obterTodos(): PokemonResumo[] {
    return [...this.pokemons];
  }
}
