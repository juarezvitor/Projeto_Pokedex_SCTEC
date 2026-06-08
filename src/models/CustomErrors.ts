// ============================================================
// models/CustomErrors.ts
// Classes de exceções customizadas que estendem Error.
// ============================================================

/**
 * Erro lançado quando a PokeAPI retorna um status de falha.
 */
export class APIError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;

    // Necessário para herança correta de Error no TypeScript
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

/**
 * Erro lançado quando ocorre uma inconsistência no catálogo local (BoxService).
 */
export class LocalBoxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocalBoxError";

    Object.setPrototypeOf(this, LocalBoxError.prototype);
  }
}

/**
 * Erro lançado quando o Pokémon buscado não é encontrado na API.
 */
export class PokemonNotFoundError extends APIError {
  public readonly nomeBuscado: string;

  constructor(nomeBuscado: string) {
    super(`Pokémon não encontrado: ${nomeBuscado}`, 404);
    this.name = "PokemonNotFoundError";
    this.nomeBuscado = nomeBuscado;

    Object.setPrototypeOf(this, PokemonNotFoundError.prototype);
  }
}
