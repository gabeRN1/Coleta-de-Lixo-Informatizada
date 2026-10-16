import type { ComponentType } from 'react';
import type { Screen } from '@/types';
import { LoginScreen } from '@/screens/citizen/LoginScreen';
import { RegisterScreen } from '@/screens/citizen/RegisterScreen';
import { DashboardScreen } from '@/screens/citizen/DashboardScreen';
import { PhotoUploadScreen } from '@/screens/citizen/PhotoUploadScreen';
import { GpsValidationScreen } from '@/screens/citizen/GpsValidationScreen';
import { PostDischargeScreen } from '@/screens/citizen/PostDischargeScreen';
import { IptuStatementScreen } from '@/screens/citizen/IptuStatementScreen';
import { ReportProblemScreen } from '@/screens/citizen/ReportProblemScreen';

export type CitizenScreen = Exclude<Screen, 'adminPanel'>;

export interface ScreenConfig {
  component: ComponentType;
  title?: string;
  backTo?: Screen;
  step?: number;
  bottomNav?: boolean;
}

export const CITIZEN_SCREENS: Record<CitizenScreen, ScreenConfig> = {
  login: { component: LoginScreen },
  register: { component: RegisterScreen, title: 'Cadastro', backTo: 'login' },
  dashboard: { component: DashboardScreen, bottomNav: true },
  photoUpload: {
    component: PhotoUploadScreen,
    title: 'Registrar Fotos',
    backTo: 'dashboard',
    step: 1,
  },
  gpsValidation: {
    component: GpsValidationScreen,
    title: 'Validação Local',
    backTo: 'photoUpload',
    step: 2,
  },
  postDescarte: { component: PostDischargeScreen, title: 'Formulário Pós-Descarte', step: 3 },
  iptuExtrato: {
    component: IptuStatementScreen,
    title: 'Extrato IPTU',
    backTo: 'dashboard',
    bottomNav: true,
  },
  reportProblem: {
    component: ReportProblemScreen,
    title: 'Reportar Problema',
    backTo: 'dashboard',
    bottomNav: true,
  },
};
