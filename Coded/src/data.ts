import type { Usuario, Descarte, Ticket, Ecoponto, Screen } from './types';

export const IPTU_ESTIMADO = 1800;
export const REAIS_POR_PONTO = 0.48;
export const META_ANUAL_PONTOS = 1000;
export const USUARIOS_INICIAIS: Usuario[] = [
  {
    nome: 'Dona Lurdes Maria da Silva',
    email: 'lurdes.silva@email.com',
    cpf: '111.444.777-35',
    senha: 'palmas2026',
    adv: 0,
    ban: false,
    pts: 500,
  },
  {
    nome: 'Seu Raimundo Barbosa',
    email: 'raimundo.b@email.com',
    cpf: '529.982.247-25',
    senha: 'x',
    adv: 1,
    ban: false,
    pts: 120,
  },
  {
    nome: 'Dona Francisca Alves',
    email: 'francisca.alves@email.com',
    cpf: '168.995.350-09',
    senha: 'x',
    adv: 0,
    ban: false,
    pts: 310,
  },
  {
    nome: 'Marcos Vinícius Teles',
    email: 'marcos.teles@email.com',
    cpf: '390.533.447-05',
    senha: 'x',
    adv: 2,
    ban: false,
    pts: 90,
  },
];
export const DESCARTES_INICIAIS: Descarte[] = [
  {
    id: 'D-0412',
    cpf: '529.982.247-25',
    nome: 'Seu Raimundo Barbosa',
    eco: '7612',
    quando: '11/10/2026 08:42',
    tipos: ['Reciclável'],
    pts: 50,
    status: 'Pendente',
  },
  {
    id: 'D-0413',
    cpf: '168.995.350-09',
    nome: 'Dona Francisca Alves',
    eco: '7640',
    quando: '11/10/2026 09:15',
    tipos: ['Reciclável', 'Orgânico'],
    pts: 70,
    status: 'Pendente',
  },
  {
    id: 'D-0414',
    cpf: '390.533.447-05',
    nome: 'Marcos Vinícius Teles',
    eco: '7589',
    quando: '11/10/2026 09:58',
    tipos: ['Reciclável'],
    pts: 50,
    status: 'Pendente',
    flag: 'Foto semelhante a descarte anterior do mesmo CPF',
  },
  {
    id: 'D-0388',
    cpf: '111.444.777-35',
    nome: 'Dona Lurdes Maria da Silva',
    eco: '7589',
    quando: '04/10/2026 17:20',
    tipos: ['Reciclável'],
    pts: 50,
    status: 'Homologado',
  },
  {
    id: 'D-0371',
    cpf: '111.444.777-35',
    nome: 'Dona Lurdes Maria da Silva',
    eco: '7589',
    quando: '27/09/2026 10:05',
    tipos: ['Reciclável', 'Orgânico'],
    pts: 70,
    status: 'Homologado',
  },
];
export const TICKETS_INICIAIS: Ticket[] = [
  {
    id: 'PR-2026-3011',
    cpf: '390.533.447-05',
    nome: 'Marcos Vinícius Teles',
    cod: '7640',
    cats: ['Estrutura danificada/vandalizada'],
    obs: 'Tampa do contêiner arrancada.',
    status: 'Aberto',
  },
  {
    id: 'PR-2026-3024',
    cpf: '111.444.777-35',
    nome: 'Dona Lurdes Maria da Silva',
    cod: '7589',
    cats: ['Contêiner cheio'],
    obs: 'Sem espaço para vidro há 3 dias.',
    status: 'Em atendimento',
  },
];
export const ECOPONTOS: Ecoponto[] = [
  { c: '7589', n: 'Ecoponto 7589 - Q. 104 Sul', d: '350 m', s: 'Disponível' },
  { c: '7612', n: 'Ecoponto 7612 - Q. 306 Norte', d: '1,8 km', s: 'Disponível' },
  { c: '7640', n: 'Ecoponto 7640 - Q. 1005 Sul', d: '2,4 km', s: 'Quase cheio' },
];
export const SCREEN_LABELS: Record<Screen, string> = {
  login: 'Tela 1 - Login',
  register: 'Tela 2 - Cadastro',
  dashboard: 'Tela 3 - Dashboard',
  photoUpload: 'Tela 4 - Registrar Fotos',
  gpsValidation: 'Tela 5 - Validação Local',
  postDescarte: 'Tela 6 - Formulário Pós-Descarte',
  iptuExtrato: 'Tela 7 - Extrato IPTU',
  reportProblem: 'Tela 8 - Reportar Problema',
  adminPanel: 'Painel Administrativo - Prefeitura',
};
