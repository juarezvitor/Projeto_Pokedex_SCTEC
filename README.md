# Pokédex TypeScript Lite

## Sobre o projeto

O **Pokédex TypeScript Lite** é uma aplicação back-end em Node.js com TypeScript que consulta dados de Pokémon na [PokeAPI](https://pokeapi.co/) pública e organiza os resultados em um catálogo local durante a execução, com persistência opcional em arquivo JSON (`pc_box.json`).

O projeto é executado inteiramente pelo terminal, sem interface gráfica, sem banco de dados e sem frameworks externos.

---

## Objetivo

Praticar os principais conceitos do Módulo 01:

- Node.js como ambiente back-end
- TypeScript com tipagem forte (strict mode)
- Interfaces e types
- Funções tipadas com parâmetros e retorno
- Arrays e objetos
- JSON
- Métodos de array (`map`, `filter`, `find`, `some`, `every`, `reduce`, `forEach`)
- Classes com modificadores de acesso (`private`, `public`)
- `async/await` e `Promise`
- `fetch` nativo do Node.js
- `try/catch` para tratamento de erros
- Arquitetura em camadas (services, controllers, models, utils)
- GitHub e GitFlow
- Kanban

---

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| Node.js | Runtime JavaScript no back-end |
| TypeScript | Tipagem estática e compilação |
| TSX | Execução direta de arquivos `.ts` em dev |
| PokeAPI | Fonte de dados externa pública |
| Git / GitHub | Versionamento e repositório |

---

## Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/) versão 18 ou superior (suporte a `fetch` nativo)
- [npm](https://www.npmjs.com/) (já incluso com o Node.js)
- [Git](https://git-scm.com/)

Verifique as versões:

```bash
node --version
npm --version
```

---

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/pokedex-typescript-lite.git
```

Acesse a pasta do projeto:

```bash
cd pokedex-typescript-lite
```

Instale as dependências de desenvolvimento:

```bash
npm install
```

---

## Como executar

Execute em modo de desenvolvimento (com `tsx`):

```bash
npm run dev
```

Para compilar para JavaScript:

```bash
npm run build
```

---

## Estrutura do projeto

```
pokedex-typescript-lite/
│
├── src/
│   ├── main.ts                        # Ponto de entrada. Instancia serviços e executa o fluxo.
│   │
│   ├── controllers/
│   │   └── TerminalController.ts      # Camada de UI. Orquestra exibição e chamadas aos serviços.
│   │
│   ├── services/
│   │   ├── PokeApiService.ts          # Integração com a PokeAPI (fetch, async/await).
│   │   └── BoxService.ts              # Persistência local em pc_box.json (fs/promises).
│   │
│   ├── models/
│   │   ├── Pokemon.ts                 # Interfaces PokemonResumo e PokemonApiResponse + Classe CatalogoPokemon.
│   │   └── CustomErrors.ts            # Classes de erros customizados (APIError, PokemonNotFoundError).
│   │
│   └── utils/
│       └── textFormatters.ts          # Funções puras de formatação de texto para o terminal.
│
├── pc_box.json                        # Base de dados local (array JSON, inicializado com []).
├── package.json                       # Manifesto com scripts e dependências.
├── tsconfig.json                      # Configuração TypeScript em strict mode.
└── README.md                          # Este arquivo.
```

---

## Funcionalidades

- Buscar Pokémon por nome ou ID na PokeAPI
- Tratar erro de Pokémon inexistente (404) sem interromper o programa
- Transformar a resposta bruta da API em objeto simplificado (`PokemonResumo`)
- Adicionar Pokémon ao catálogo local em memória
- Impedir Pokémon duplicado (verificação por ID)
- Listar catálogo com informações completas
- Remover Pokémon do catálogo por ID
- Filtrar Pokémon por tipo no catálogo
- Calcular peso médio dos Pokémon no catálogo
- Exibir mensagens claras e amigáveis no terminal
- Persistência opcional em arquivo `pc_box.json` via `BoxService`

---

## Exemplos de execução

### Busca válida

**Entrada testada:**
```
pikachu
```

**Saída obtida:**
```
[INFO] Buscando Pokémon: "pikachu"...
[OK] Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
[OK] pikachu adicionado ao catálogo.
```

---

### Busca inválida

**Entrada testada:**
```
pokemon-inexistente
```

**Saída obtida:**
```
[INFO] Buscando Pokémon: "pokemon-inexistente"...
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

---

### Duplicidade

**Entrada testada:**
```
adicionar pikachu duas vezes
```

**Saída obtida:**
```
[OK] pikachu adicionado ao catálogo.
[AVISO] pikachu já está no catálogo.
```

---

### Listagem do catálogo

**Saída obtida:**
```
========================================
=============== CATÁLOGO ===============
========================================

--- Catálogo atual ---
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
#1 - bulbasaur | Tipos: grass, poison | Altura: 7 | Peso: 69
----------------------

[INFO] Total: 3 Pokémon | Peso médio: 71g
[INFO] Todos com nome válido: Sim
```

---

### Remoção

**Entrada testada:**
```
remover ID 25
```

**Saída obtida:**
```
[INFO] Removendo Pokémon com ID #25...
[OK] Pokémon removido do catálogo.
```

---

### Remoção com ID inexistente

**Entrada testada:**
```
remover ID 9999
```

**Saída obtida:**
```
[INFO] Removendo Pokémon com ID #9999...
[AVISO] Nenhum Pokémon encontrado com esse ID.
```

---

## Conceitos aplicados

### TypeScript

Todos os arquivos usam tipagem forte. Parâmetros de funções, retornos e atributos de classe possuem tipo explícito. O `tsconfig.json` está em **strict mode**, ativando `strictNullChecks`, `noImplicitAny` e `noImplicitReturns`.

### Interfaces

Duas interfaces principais definem a estrutura dos dados:

**`PokemonResumo`** (em `models/Pokemon.ts`): representa o objeto simplificado interno, com apenas os campos necessários para a aplicação (`id`, `nome`, `tipos`, `altura`, `peso`).

**`PokemonApiResponse`** (em `models/Pokemon.ts`): tipagem da resposta bruta da PokeAPI. Garante que o TypeScript valide os campos acessados durante o mapeamento.

### Fetch e async/await

O `PokeApiService` usa `fetch` nativo do Node.js (disponível a partir da versão 18). Toda busca é assíncrona: a função `buscarPokemon` retorna `Promise<PokemonResumo | null>` e é consumida com `await` no `main.ts`.

### Tratamento de erros

O bloco `try/catch` no `PokeApiService` captura:
- Status `404` → lança `PokemonNotFoundError` (classe customizada)
- Outros status de erro → lança `APIError`
- Erros de rede → capturados pelo `catch` genérico

As classes `APIError`, `PokemonNotFoundError` e `LocalBoxError` em `models/CustomErrors.ts` estendem `Error` e adicionam propriedades tipadas como `statusCode` e `nomeBuscado`.

### Métodos de array utilizados

| Método | Onde | Finalidade |
|---|---|---|
| `map` | `PokeApiService.ts` | Extrair nomes dos tipos da resposta da API |
| `map` | `textFormatters.ts` | Formatar lista de nomes de Pokémon |
| `some` | `CatalogoPokemon.adicionar()` | Verificar duplicidade por ID |
| `some` | `CatalogoPokemon.remover()` | Verificar existência antes de remover |
| `filter` | `CatalogoPokemon.remover()` | Criar nova lista sem o Pokémon removido |
| `filter` | `CatalogoPokemon.filtrarPorTipo()` | Filtrar por tipo |
| `find` | `CatalogoPokemon.buscarPorNome()` | Buscar Pokémon por nome |
| `forEach` | `CatalogoPokemon.listar()` | Exibir cada Pokémon no terminal |
| `every` | `CatalogoPokemon.todosComNome()` | Validar se todos têm nome |
| `reduce` | `CatalogoPokemon.pesoMedio()` | Somar pesos para calcular média |

### Classe CatalogoPokemon

Definida em `models/Pokemon.ts`:

- **Atributo privado** `pokemons: PokemonResumo[]` — armazena o catálogo em memória
- **`adicionar(pokemon)`** — verifica duplicidade com `some`, insere com `push`
- **`listar()`** — exibe todos com `forEach`
- **`remover(id)`** — verifica com `some`, filtra com `filter`
- **`buscarPorNome(nome)`** — localiza com `find`
- **`pesoMedio()`** — calcula com `reduce`
- **`todosComNome()`** — valida com `every`
- **`filtrarPorTipo(tipo)`** — filtra com `filter` + `includes`
- **`get total`** — getter para o tamanho do array

### Arquitetura em camadas

A aplicação segue separação de responsabilidades:

- **`models/`** — estruturas de dados (interfaces, classes de entidade, erros)
- **`services/`** — lógica de negócio (API externa, persistência local)
- **`controllers/`** — orquestração e exibição (camada de UI do terminal)
- **`utils/`** — funções puras reutilizáveis
- **`main.ts`** — composição root com injeção de dependências

---

## Organização do Kanban

Link do Kanban: **[COLE AQUI O LINK DO SEU TRELLO/NOTION/GITHUB PROJECTS]**

Tarefas organizadas em: **Backlog → A Fazer → Em Andamento → Concluído**

---

## Branches utilizadas

### Projeto individual

```
main
develop
feat/pokedex
docs/readme
```

### Projeto em squad

```
main
develop
feat/api-pokemon
feat/catalogo
docs/readme
```

---

## Commits semânticos (exemplos)

```
feat: configura projeto com typescript e tsx
feat: cria interfaces PokemonResumo e PokemonApiResponse
feat: implementa PokeApiService com fetch e async/await
feat: cria classe CatalogoPokemon com adicionar, listar e remover
feat: adiciona validacao de duplicidade por ID
feat: implementa BoxService com persistencia em pc_box.json
feat: cria TerminalController com injecao de dependencias
feat: implementa textFormatters com funcoes puras tipadas
feat: cria erros customizados APIError e PokemonNotFoundError
fix: trata pokemon inexistente com PokemonNotFoundError
docs: atualiza readme com instrucoes e exemplos de execucao
```

---

## Melhorias futuras

- Criar menu interativo no terminal com `readline`
- Salvar catálogo automaticamente em `pc_box.json` após cada operação
- Exibir HP, Ataque e Defesa extraídos do campo `stats` da API
- Criar filtros por tipo de Pokémon no menu
- Exportar catálogo em CSV
- Criar uma API REST própria com Express
- Adicionar testes automatizados com Vitest
