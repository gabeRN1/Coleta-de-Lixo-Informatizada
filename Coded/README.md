# Palmas Recicla +

Protótipo de alta fidelidade do aplicativo do cidadão e do Painel da Prefeitura (AP2),
construído com React, TypeScript, Vite, Tailwind CSS e lucide-react, seguindo o Design System gov.br
e o fluxo definido na AP1.

## Como rodar

```bash
npm install
npm run dev        # desenvolvimento
npm run typecheck  # verificação de tipos
npm run format     # Prettier
npm run build      # checa tipos e gera /dist
```

Dados de demonstração: CPF `111.444.777-35`, senha `palmas2026`, código do contêiner `7589`.

## Arquitetura

```
src/
  App.tsx                    composição: provider + layout
  main.tsx                   ponto de entrada
  types.ts                   tipos do domínio (Screen, Usuario, Descarte, Ticket...)
  data.ts                    dados de demonstração e constantes do IPTU
  utils.ts                   máscara/validação de CPF, moeda, data
  context/
    useAppState.ts           estado global e regras de negócio (hook)
    AppContext.tsx           provider e hook useApp()
  routes/
    screens.tsx              mapa tela -> componente, título, etapa e menu inferior
  components/
    ui/                      componentes de interface reutilizáveis (Button, TextField, Alert...)
    layout/                  AppToolbar, PhoneFrame, BottomNav, Toast, ModalsHost
    modals/                  modais 4c, 5a, 5b e declaração de IPTU
  screens/
    citizen/                 telas 1 a 8 do app do cidadão
    admin/                   Painel da Prefeitura (abas, KPIs e modais de confirmação)
```

A navegação é controlada por um único estado (`screen`) no contexto:
`login | register | dashboard | photoUpload | gpsValidation | postDescarte | iptuExtrato | reportProblem | adminPanel`.
