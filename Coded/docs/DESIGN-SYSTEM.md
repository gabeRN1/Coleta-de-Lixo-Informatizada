# DESIGN-SYSTEM.md

## Identidade Visual
A interface segue o Padrão Digital do Governo Federal (gov.br), com barra institucional, botões em pílula, alertas em caixa destacada, indicador amarelo de foco e tipografia sem serifa.

## Paleta de Cores
Configurada em `tailwind.config.js`:

| Token | Hex | Aplicação |
| --- | --- | --- |
| `pri` | `#1351B4` | Botões primários, links, cabeçalhos |
| `pri-l` | `#DBE8FB` | Fundos informativos e seleção |
| `pri-d` | `#0C326F` | Estado hover de elementos primários |
| `nav` | `#071D41` | Moldura da aplicação mobile e botão do painel |
| `ok` / `ok-l` | `#168821` / `#E3F5E1` | Sucesso, pontuações e confirmações |
| `err` / `err-l` | `#E52207` / `#FDE0DB` | Mensagens de erro e ações destrutivas |
| `warn` / `warn-l` | `#FFCD07` / `#FFF5C2` | Alertas, estados pendentes e anéis de foco |
| `ink` | `#333333` | Cor principal de texto |
| `mut` | `#636363` | Texto secundário |

## Tipografia
Fonte principal: **Raleway** (com fallbacks para Rawline, Arial e sans-serif).
* Pesos utilizados: 400, 600, 700 e 800.
* Unidades em `rem`, permitindo redimensionamento dinâmico via controles A- e A+ (de 13px a 20px).

## Componentes Reutilizáveis (`src/components/ui/`)
* `Button`: Suporta variantes (`primary`, `secondary`, `danger`, `success`, `link`), estado de carregamento e desabilitação. Altura mínima de 44px.
* `TextField`: Campo de entrada com rótulo fixo, ícones e mensagem de erro estruturada.
* `Alert`: Caixa de aviso contextualizada por tom (`info`, `ok`, `err`, `warn`) com suporte a ARIA.
* `Badge`: Marcador de status (`g`, `ok`, `err`, `warn`, `pri`).
* `CheckboxCard`: Seleção expansiva com grande área de clique e acessibilidade (`role="checkbox"`).
* `Modal`: Diálogo com suporte a acessibilidade (`role="dialog"`, `aria-modal`).
* `Stepper`: Barra de progresso do fluxo em 3 etapas.
* `PointsChart`: Gráfico de barras SVG renderizando histórico financeiro.
* `PhotoThumb` / `SamplePhoto`: Exibição de miniaturas de imagens do descarte.
* `GovHeader`: Barra institucional superior com controles de acessibilidade.

## Acessibilidade (eMAG / WCAG)
* Ajuste de Fonte: Controles A- e A+ no cabeçalho alteram o tamanho base do documento.
* Alto Contraste: Alternador ◐ aplica a classe `.hc` globalmente.
* Foco Visível: Borda amarela de 3px em elementos focáveis (`index.css`).
* Atalho de Conteúdo: Link de salto "Ir para o conteúdo" acessível via tecla Tab.
* Semântica HTML: Uso de `role="dialog"`, `role="alert"`, `role="status"`, `role="checkbox"`, `role="radiogroup"`, `role="tab"` e `aria-selected`.
* Área de Toque: Todos os botões e interações mantêm dimensão mínima de 44px.
* Indicadores Duplos: Status do sistema não dependem exclusivamente da cor (ex: textos indicativos junto aos status).

## Estrutura Visual
* App Cidadão: Layout mobile responsivo (`max-w-md`) com sombra e rolagem interna.
* Painel Admin: Layout web expandido (`max-w-6xl`) com grid adaptável para métricas e tabelas.
* Animações: Transições suaves e curtas de entrada em telas e modais (`.up`).

## Substituição de Identidade Visual
O cabeçalho exibe a identidade textual do gov.br para alinhamento pedagógico com a disciplina. Para implantação em produção, substitua o componente `components/ui/GovHeader.tsx` pelos ativos oficiais do município.