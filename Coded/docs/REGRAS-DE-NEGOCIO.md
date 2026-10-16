# REGRAS-DE-NEGOCIO.md

## Autenticação e Gestão de Usuários
* O cadastro exige nome completo (nome e sobrenome), e-mail válido, CPF válido e senha.
* O CPF é validado através do cálculo dos dígitos verificadores e impede sequências repetidas.
* Cada CPF pode estar vinculado a apenas uma conta; tentativas duplicadas são recusadas.
* Senhas devem ter comprimento mínimo de 6 caracteres.
* O login aceita CPF (com máscara automática) ou e-mail registrado.
* Usuários com status "banido" têm o login bloqueado.
* Novos usuários iniciam com saldo 0; o usuário de demonstração inicia com 500 pontos.

## Pontuação e Benefício de IPTU
* Descarte de material Reciclável: +50 pontos.
* Descarte de material Orgânico: +20 pontos.
* Taxa de conversão: R$ 0,48 por ponto acumulado (`REAIS_POR_PONTO`).
* Valor base do IPTU estimado: R$ 1.800,00 (`IPTU_ESTIMADO`).
* Meta de acúmulo anual: 1.000 pontos (`META_ANUAL_PONTOS`).

Fórmulas:
* $desconto\_reais = \min(pontos \times 0{,}48, 1800{,}00)$
* $desconto\_pct = \frac{desconto\_reais}{1800{,}00} \times 100$
* $valor\_liquido = 1800{,}00 - desconto\_reais$

Se o usuário declarar resíduos Recicláveis e Orgânicos no mesmo descarte, recebe 70 pontos. A marcação dos subtipos (papel, plástico, vidro, metal) é meramente informativa e não adiciona pontos.

## Validação de Descartes
1. Registro de Fotos: O envio das duas fotos (lixo separado e embalagem lacrada) é obrigatório. A ausência de imagem ou envio de arquivo inválido ativa o Modal 4c.
2. Código de Liberação: Após o envio das fotos, é gerado um código de 6 dígitos válido por 10 minutos. Ao expirar, a sessão de descarte é cancelada.
3. Validação Geográfica: A localização do dispositivo deve estar em um raio de até 15 metros do ecoponto. Distâncias superiores ativam o Modal 5a.
4. Código do Contêiner: Deve-se informar o código numérico do contêiner (4 dígitos). O valor padrão correto no protótipo é `7589`; valores incorretos ativam o Modal 5b.
5. Confirmação do Descarte: Exige seleção de ao menos um tipo de resíduo e avaliação de 1 a 5 estrelas.
6. Crédito dos Pontos: Os pontos são adicionados imediatamente ao saldo do usuário com o status "Pendente", aguardando auditoria.

## Auditoria e Moderação Administrativa
* Homologar Créditos: Altera o status do descarte para "Homologado" e confirma os pontos.
* Rejeitar Descarte: Altera o status para "Rejeitado" registrando a justificativa ("Imagem falsa ou manipulada", "Foto repetida", "Material diferente do declarado"). Se o descarte rejeitado pertencer ao usuário ativo, os pontos correspondentes são estornados.
* Advertir Usuário: Incrementa o contador de advertências do usuário.
* Banir Usuário: Desativa o acesso do usuário ao aplicativo.
* Reativar Usuário: Restaura o acesso de contas suspensas.

## Chamados de Suporte
* Exige identificação do contêiner (4 dígitos) e seleção de categoria (Contêiner cheio, Estrutura danificada, Mau cheiro).
* Campo opcional de observações de até 300 caracteres.
* Gera protocolo no formato `PR-2026-NNNN`.
* Status controlados pela prefeitura: Aberto, Em triagem, Em atendimento, Resolvido.

## Declaração do IPTU
* Exibe nome, CPF, endereço do imóvel, pontos acumulados, valor de desconto e valor líquido.
* Gera código de autenticidade no formato `PR-<6 primeiros dígitos do CPF>-<pontos>`.
* Disponibiliza layout otimizado para impressão/PDF via estilos CSS dedicados.

## Mocks e Dados Iniciais
* Usuários: Dona Lurdes Maria (500 pts), Seu Raimundo Barbosa, Dona Francisca Alves e Marcos Vinícius Teles (2 advertências).
* Ecopontos registrados: 7589 (Q. 104 Sul), 7612 (Q. 306 Norte) e 7640 (Q. 1005 Sul).
* Imóvel de Teste: Quadra 1005 Sul, Alameda 2, Lote 12 (Inscrição: 1.05.1005.0012.000).