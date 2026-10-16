export type Tone = 'info' | 'ok' | 'err' | 'warn';

export type Screen =
  | 'login'
  | 'register'
  | 'dashboard'
  | 'photoUpload'
  | 'gpsValidation'
  | 'postDescarte'
  | 'iptuExtrato'
  | 'reportProblem'
  | 'adminPanel';

export interface Foto {
  url?: string;
  sample?: number;
}

export interface Usuario {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  adv: number;
  ban: boolean;
  pts: number;
}

export type StatusDescarte = 'Pendente' | 'Homologado' | 'Rejeitado';

export interface Descarte {
  id: string;
  cpf: string;
  nome: string;
  eco: string;
  quando: string;
  tipos: string[];
  pts: number;
  status: StatusDescarte;
  flag?: string;
  motivo?: string;
  nota?: number;
  fotos?: (Foto | null)[];
}

export interface Ticket {
  id: string;
  cpf: string;
  nome: string;
  cod: string;
  cats: string[];
  obs: string;
  status: string;
}

export interface Ecoponto {
  c: string;
  n: string;
  d: string;
  s: string;
}

export interface GpsLeitura {
  lat: string;
  lng: string;
  s: string;
  d: number;
}
