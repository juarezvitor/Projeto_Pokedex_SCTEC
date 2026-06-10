// ============================================================
// src/main.ts
// Ponto de entrada da aplicação
// Instancia os serviços, injeta dependências e demonstra o fluxo completo.
// ============================================================

import { CatalogoPokemon } from "./models/Pokemon.js";
import { PokeApiService } from "./services/PokeApiService.js";
import { TerminalController } from "./controllers/TerminalController.js";
import { formatarSeparador } from "./utils/textFormatters.js";

async function main(): Promise<void> {
  console.log(formatarSeparador("Pokédex TypeScript Lite"));
  console.log("\nIniciando aplicação...\n");

  // --- Injeção de Dependências ---
  const pokeApiService = new PokeApiService();
  const catalogo = new CatalogoPokemon();
  const controller = new TerminalController(pokeApiService, catalogo);

  // -------------------------------------------------------
  // PASSO 1: Buscar e adicionar Pikachu
  // -------------------------------------------------------
  const pikachu = await controller.buscarEExibir("pikachu");
  if (pikachu !== null) {
    controller.adicionarAoCatalogo(pikachu);
  }

  // -------------------------------------------------------
  // PASSO 2: Buscar e adicionar Charmander
  // -------------------------------------------------------
  const charmander = await controller.buscarEExibir("charmander");
  if (charmander !== null) {
    controller.adicionarAoCatalogo(charmander);
  }

  // -------------------------------------------------------
  // PASSO 3: Buscar e adicionar Bulbasaur
  // -------------------------------------------------------
  const bulbasaur = await controller.buscarEExibir("bulbasaur");
  if (bulbasaur !== null) {
    controller.adicionarAoCatalogo(bulbasaur);
  }

  // -------------------------------------------------------
  // PASSO 4: Tentar adicionar Pikachu novamente (duplicidade)
  // -------------------------------------------------------
  console.log(
    "\n[INFO] Tentando adicionar Pikachu novamente (teste de duplicidade)...",
  );
  const pikachuDuplicado = await controller.buscarEExibir("pikachu");
  if (pikachuDuplicado !== null) {
    controller.adicionarAoCatalogo(pikachuDuplicado);
  }

  // -------------------------------------------------------
  // PASSO 5: Buscar Pokémon inexistente (teste de erro)
  // -------------------------------------------------------
  await controller.buscarEExibir("pokemon-inexistente");

  // -------------------------------------------------------
  // PASSO 6: Listar catálogo completo
  // -------------------------------------------------------
  controller.listarCatalogo();

  // -------------------------------------------------------
  // PASSO 7: Demonstrar filtro por tipo
  // -------------------------------------------------------
  controller.filtrarPorTipo("fire");

  // -------------------------------------------------------
  // PASSO 8: Remover Pikachu (ID 25)
  // -------------------------------------------------------
  controller.removerDoCatalogo(25);

  // -------------------------------------------------------
  // PASSO 9: Listar catálogo após remoção
  // -------------------------------------------------------
  controller.listarCatalogo();

  // -------------------------------------------------------
  // PASSO 10: Tentar remover ID inexistente
  // -------------------------------------------------------
  controller.removerDoCatalogo(9999);

  console.log(formatarSeparador("Fim da demonstração"));
}

main().catch((erro: unknown) => {
  console.error("[FATAL] Erro inesperado na aplicação:", erro);
  process.exit(1);
});
