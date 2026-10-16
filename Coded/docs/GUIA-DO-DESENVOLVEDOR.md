# GUIA-DO-DESENVOLVEDOR.md

## Pré-requisitos
* Node.js 18+
* npm

## Instalação e Execução
```bash
npm install
npm run dev
```

## Scripts do Projeto
| Comando | Ação |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com Vite |
| `npm run typecheck` | Executa a verificação de tipos do TypeScript sem emitir arquivos (`tsc --noEmit`) |
| `npm run format` | Aplica a formatação do Prettier nos arquivos da pasta `src` |
| `npm run build` | Valida os tipos e gera a compilação de produção na pasta `dist/` |
| `npm run preview` | Executa um servidor local para testar a pasta `dist/` |
| `npm run smoke` | Executa o teste automatizado fim-a-fim simulado via esbuild e jsdom |

## Diretrizes de Código
* TypeScript Estrito: Proibido uso de `any` implícito; variáveis sem uso interrompem o build (`noUnusedLocals`).
* Componentização: Um componente por arquivo, utilizando exportações nomeadas (`export function`).
* Path Alias: Utilize o prefixo `@/` para referenciar a pasta `src/`.
* Estilização: Utilize apenas utility classes do Tailwind com os tokens definidos.
* Nomenclatura: Código técnico em inglês (`handleLogin`, `isLoading`); termos de negócio em português (`Descarte`, `Usuario`, `ECOPONTOS`).
* Formatação: Regras centralizadas em `.prettierrc` (aspas simples, 100 colunas, vírgulas finais).
* Comentários: Apenas quando necessários para explicar decisões não óbvias.

## Como Adicionar Recursos

### Nova Tela do Cidadão
1. Adicione o identificador no tipo `Screen` (`src/types.ts`) e o rótulo em `SCREEN_LABELS` (`src/data.ts`).
2. Crie o componente em `src/screens/citizen/NovaTelaScreen.tsx` utilizando o hook `useApp()`.
3. Registre a tela no array `CITIZEN_SCREENS` (`src/routes/screens.tsx`) informando o componente, título, rota de retorno, passo do fluxo e menu.
4. Utilize `navigate('novaTela')` para realizar a transição.

### Nova Regra no Estado Global
1. Adicione a variável ou função em `src/context/useAppState.ts`.
2. Exporte a nova propriedade no objeto retornado pelo hook.
3. Consuma nas telas via `const { novaPropriedade } = useApp()`.

### Novo Componente de Interface
1. Crie o arquivo em `src/components/ui/`.
2. Defina as propriedades via `interface` estrita sem dependências diretas de estado global ou telas.

### Nova Aba no Painel Admin
1. Crie o componente em `src/screens/admin/`.
2. Adicione a aba correspondente em `AdminTabs.tsx` e trate a renderização condicional em `AdminPanel.tsx`.

### Integração com API Backend
Para conectar a uma API real, substitua as implementações das ações em `src/context/useAppState.ts` (`handleLogin`, `handleRegister`, `approveDiscard`, etc.) por chamadas HTTP, mantendo as assinaturas do estado. As telas continuarão funcionando sem alterações.

## Testes

### Teste Automatizado (Smoke Test)
```bash
npm run smoke
```
O script executa a aplicação dentro de um ambiente jsdom, simulando o fluxo completo:
1. Autenticação
2. Consulta do Dashboard
3. Validação de exceções de mídia
4. Envio de fotos
5. Validação de localização e código
6. Envio de descarte
7. Emissão de extrato
8. Ações administrativas (homologação e moderação)

### Validação Manual
| Etapa | Teste | Resultado Esperado |
| --- | --- | --- |
| 1 | Login com usuário demo | Dashboard carrega com 500 pontos e R$ 240,00 |
| 2 | Cadastro com CPF `111.444.777-35` | Exibe erro de CPF existente |
| 3 | Envio sem fotos na Tela 4 | Abre o modal 4c |
| 4 | Validação com "A 42 m" e código `7589` na Tela 5 | Abre o modal 5a |
| 5 | Validação com "A 8 m" e código `1234` na Tela 5 | Abre o modal 5b |
| 6 | Validação com "A 8 m" e código `7589` na Tela 5 | Avança para a Tela 6 |
| 7 | Envio de resíduo reciclável com 5 estrelas | Atualiza saldo para 550 pontos |
| 8 | Homologação no Painel | Status do descarte altera para Homologado |
| 9 | Rejeição de descarte do usuário atual | Estorna os pontos acumulados |
| 10 | Banimento de usuário | Bloqueia novas tentativas de login |

## Compilação e Deploy
```bash
npm run build
```
A compilação gera arquivos estáticos na pasta `dist/` com caminhos relativos (`base: './'`), prontos para hospedagem em serviços estáticos como Vercel, Netlify ou GitHub Pages.

## Solução de Problemas
| Problema | Causa | Solução |
| --- | --- | --- |
| Estilos não aplicados | Componente fora do padrão do Tailwind | Verifique a propriedade `content` em `tailwind.config.js` |
| Erro de import com `@/` | Servidor TS desatualizado | Reinicie o TS Server no editor; o alias está configurado em `tsconfig.json` e `vite.config.ts` |
| Build reprovado por variável não usada | Flag `noUnusedLocals` ativa | Remova o código ou import sem uso |
| Dados resetados ao atualizar a página | Estado mantido apenas em memória | Comportamento esperado em ambiente sem backend |