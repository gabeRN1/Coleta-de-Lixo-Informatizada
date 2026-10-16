# REQUISITOS.md

## Rastreabilidade de Requisitos Funcionais

| ID | Descrição Resumida | Implementação | Status |
| --- | --- | --- | --- |
| RF01 | Cadastro de usuário com validação de CPF único | `screens/citizen/RegisterScreen.tsx`, `handleRegister` em `useAppState.ts`, `validCpf` em `utils.ts` | Atendido |
| RF02 | Autenticação via CPF/E-mail e senha | `screens/citizen/LoginScreen.tsx`, `handleLogin` | Atendido |
| RF03 | Dashboard com saldo, métricas e gráfico | `screens/citizen/DashboardScreen.tsx`, `components/ui/PointsChart.tsx` | Atendido |
| RF04 | Envio obrigatório de duas fotos para liberação de código | `screens/citizen/PhotoUploadScreen.tsx`, `handleSubmitPhotos`, `MediaErrorModal.tsx` | Atendido |
| RF05 | Validação de GPS (raio max 15m) e código do contêiner | `screens/citizen/GpsValidationScreen.tsx`, `handleGetLocation`, `handleValidateLocation` | Simulado |
| RF06 | Formulário de tipo de resíduo e avaliação de limpeza | `screens/citizen/PostDischargeScreen.tsx`, `handleCompleteDiscard` | Atendido |
| RF07 | Extrato de desconto do IPTU e emissão de declaração | `screens/citizen/IptuStatementScreen.tsx`, `DeclarationModal.tsx` | Atendido |
| RF08 | Abertura de chamados de suporte | `screens/citizen/ReportProblemScreen.tsx`, `handleSendAlert` | Atendido |
| RF09 | Gestão e triagem de chamados pelo Painel Admin | `screens/admin/TicketsTab.tsx` | Atendido |
| RF10 | Aplicação de advertências e banimento de contas | `screens/admin/UsersTab.tsx`, `AdminModals.tsx`, `rejectDiscard`, `moderateUser` | Atendido |

## Requisitos Não Funcionais

| ID | Descrição | Atendimento no Protótipo | Status |
| --- | --- | --- | --- |
| RNF01 | Interface responsiva mobile-first com linguagem simples | Layout mobile (`max-w-md`), botões com área mínima de 44px e opções de acessibilidade | Atendido |
| RNF02 | Validação de GPS em até 3 segundos | Delay simulado em 1,4s com indicador de carregamento | Simulado |
| RNF03 | Atualização das informações em tempo real | Estado compartilhado em memória refletido instantaneamente nas interfaces | Atendido (sem persistência) |
| RNF04 | Criptografia de senhas e unicidade de CPF | Unicidade de CPF validada no cadastro; senhas armazenadas em texto simples devido à ausência de banco de dados | Parcial |

## Mapeamento de Casos de Uso
* UC01 - Cadastrar e Autenticar Usuário: Telas 1 e 2.
* UC02 - Consultar Dashboard: Tela 3.
* UC03 - Registrar Fotos do Descarte: Tela 4 e Modal 4c.
* UC04 - Validar Localização e Contêiner: Tela 5, Modal 5a e Modal 5b.
* UC05 - Confirmar Informações do Descarte: Tela 6.
* UC06 - Emitir Extrato do IPTU: Tela 7 e Modal de Declaração.
* UC07 - Auditar Descartes e Aplicar Moderação: Painel Administrativo.

## Cobertura de Mídias e Telas
* Tela 1 (Login): `screens/citizen/LoginScreen.tsx`
* Tela 2 (Cadastro): `screens/citizen/RegisterScreen.tsx`
* Tela 3 (Dashboard): `screens/citizen/DashboardScreen.tsx`
* Tela 4 (Fotos): `screens/citizen/PhotoUploadScreen.tsx`
* Tela 4c (Erro de Mídia): `components/modals/MediaErrorModal.tsx`
* Tela 5 (Validação Local): `screens/citizen/GpsValidationScreen.tsx`
* Tela 5a (Erro Distância): `components/modals/LocationErrorModal.tsx`
* Tela 5b (Erro Código): `components/modals/InvalidCodeModal.tsx`
* Tela 6 (Formulário Pós-Descarte): `screens/citizen/PostDischargeScreen.tsx`
* Tela 7 (Extrato IPTU): `screens/citizen/IptuStatementScreen.tsx`
* Tela 8 (Reportar Problema): `screens/citizen/ReportProblemScreen.tsx`
* Painel Admin: `screens/admin/AdminPanel.tsx`

## Diferenciais Implementados Além da Especificação
* Categorização detalhada de recicláveis (vidro, papel, plástico, metal).
* Mapeamento de ecopontos mais próximos.
* Indicador de progresso em relação à meta de acúmulo anual.
* Validador visual de força de senha.
* Ferramentas de acessibilidade no cabeçalho (redimensionamento de fonte e alto contraste).

## Resolução de Ambiguidades da Especificação Original
* Código na Tela 5: A especificação cita o recebimento de código e o uso do código do contêiner. O protótipo exibe o código temporário gerado e solicita a digitação do código do contêiner (`7589`).
* Fluxo de Confirmação de Fotos: A transição direta exibe um banner de confirmação no topo da Tela 5, simplificando a navegação.