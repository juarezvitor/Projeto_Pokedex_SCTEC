// ============================================================
// services/BoxService.ts
// Camada de persistência local usando node:fs/promises.
// Lê e escreve o catálogo no arquivo pc_box.json.
// ============================================================

import { promises as fs } from "node:fs";
import path from "node:path";
import { PokemonResumo } from "../models/Pokemon.js";
import { LocalBoxError } from "../models/CustomErrors.js";

const PC_BOX_PATH = path.resolve(process.cwd(), "pc_box.json");

/*
  Serviço responsável pela persistência do catálogo em arquivo JSON local.
  Utiliza fs/promises para operações assíncronas de leitura e escrita.
 */
export class BoxService {
  /*
    Lê o arquivo pc_box.json e retorna o array de Pokémon salvos.
    Se o arquivo não existir, retorna um array vazio e cria o arquivo.
   */
  public async lerBox(): Promise<PokemonResumo[]> {
    try {
      const conteudo = await fs.readFile(PC_BOX_PATH, "utf-8");
      const dados = JSON.parse(conteudo) as PokemonResumo[];
      return dados;
    } catch (erro: unknown) {
      // Arquivo não existe ainda: inicializa com array vazio
      if (
        erro instanceof Error &&
        "code" in erro &&
        (erro as NodeJS.ErrnoException).code === "ENOENT"
      ) {
        await this.salvarBox([]);
        return [];
      }

      throw new LocalBoxError(
        `Falha ao ler o arquivo pc_box.json: ${erro instanceof Error ? erro.message : String(erro)}`,
      );
    }
  }

  /**
   * Salva o array de Pokémon no arquivo pc_box.json com formatação legível.
   *
   * @param pokemons - Array de PokemonResumo a ser persistido
   */
  public async salvarBox(pokemons: PokemonResumo[]): Promise<void> {
    try {
      const conteudo = JSON.stringify(pokemons, null, 2);
      await fs.writeFile(PC_BOX_PATH, conteudo, "utf-8");
    } catch (erro: unknown) {
      throw new LocalBoxError(
        `Falha ao salvar o arquivo pc_box.json: ${erro instanceof Error ? erro.message : String(erro)}`,
      );
    }
  }

  /**
   * Adiciona um Pokémon ao arquivo pc_box.json se não existir duplicata.
   *
   * @param pokemon - PokemonResumo a ser adicionado
   * @returns true se adicionado, false se já existia
   */
  public async adicionarNaBox(pokemon: PokemonResumo): Promise<boolean> {
    const lista = await this.lerBox();

    const jaExiste = lista.some((p: PokemonResumo) => p.id === pokemon.id);
    if (jaExiste) return false;

    lista.push(pokemon);
    await this.salvarBox(lista);
    return true;
  }

  /**
   * Remove um Pokémon do arquivo pc_box.json pelo ID.
   * Utiliza: filter para criar nova lista sem o Pokémon removido.
   *
   * @param id - ID do Pokémon a ser removido
   * @returns true se removido, false se não encontrado
   */
  public async removerDaBox(id: number): Promise<boolean> {
    const lista = await this.lerBox();

    const existe = lista.some((p: PokemonResumo) => p.id === id);
    if (!existe) return false;

    const novaLista = lista.filter((p: PokemonResumo) => p.id !== id);
    await this.salvarBox(novaLista);
    return true;
  }
}
