import { useEffect, useRef, useState } from 'react';
import { formatNow, validCpf } from '@/utils';
import {
  IPTU_ESTIMADO,
  REAIS_POR_PONTO,
  USUARIOS_INICIAIS,
  DESCARTES_INICIAIS,
  TICKETS_INICIAIS,
} from '@/data';
import type { Screen, Usuario, Foto, GpsLeitura } from '@/types';

let toastTimer: number | undefined;

export function useAppState() {
  const [screen, setScreen] = useState<Screen>('login');
  const [users, setUsers] = useState(USUARIOS_INICIAIS);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [pontos, setPontos] = useState(500);
  const [discards, setDiscards] = useState(DESCARTES_INICIAIS);
  const [tickets, setTickets] = useState(TICKETS_INICIAIS);
  const [photos, setPhotos] = useState<(Foto | null)[]>([null, null]);
  const [releaseCode, setReleaseCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [gpsReading, setGpsReading] = useState<GpsLeitura | 'load' | null>(null);
  const [simulatedDistance, setSimulatedDistance] = useState(8);
  const [containerCode, setContainerCode] = useState('');
  const [wasteTypes, setWasteTypes] = useState<string[]>([]);
  const [recyclableSubtypes, setRecyclableSubtypes] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [loginForm, setLoginForm] = useState({ id: '111.444.777-35', senha: 'palmas2026' });
  const [showPassword, setShowPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({ nome: '', email: '', cpf: '', senha: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toast, setToast] = useState<{ m: string; t: string } | null>(null);
  const [reportForm, setReportForm] = useState<{ cod: string; cats: string[]; obs: string }>({
    cod: '',
    cats: [],
    obs: '',
  });
  const [activeTab, setActiveTab] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [pendingAction, setPendingAction] = useState<{
    k: string;
    id?: string;
    cpf?: string;
  } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Imagem falsa ou manipulada');
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    f?: Foto | null;
    i: number;
    l: string;
  } | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize + 'px';
  }, [fontSize]);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [screen]);
  useEffect(() => {
    if (screen !== 'gpsValidation') return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [screen]);
  useEffect(() => {
    if (screen === 'gpsValidation' && secondsLeft <= 0) {
      notify('Código de liberação expirado. Envie as fotos novamente.', 'err');
      setPhotos([null, null]);
      navigate('photoUpload');
    }
  }, [secondsLeft, screen]);

  const notify = (m: string, t: string = 'ok') => {
    setToast({ m, t });
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => setToast(null), 3800);
  };
  const navigate = (s: Screen) => {
    setErrors({});
    setScreen(s);
  };
  const simulateRequest = (f: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      f();
    }, 800);
  };
  const myDiscards = discards.filter((d) => currentUser && d.cpf === currentUser.cpf);
  const pendingPoints = myDiscards
    .filter((d) => d.status === 'Pendente')
    .reduce((a, d) => a + d.pts, 0);
  const discountValue = Math.min(pontos * REAIS_POR_PONTO, IPTU_ESTIMADO),
    discountPercent = (discountValue / IPTU_ESTIMADO) * 100;
  const userName = currentUser ? currentUser.nome : '';
  const greetingName =
    userName.split(' ')[0] === 'Dona' || userName.split(' ')[0] === 'Seu'
      ? userName.split(' ').slice(0, 2).join(' ')
      : userName.split(' ')[0];
  const monthlyHistory =
    currentUser && currentUser.cpf === '111.444.777-35'
      ? [90, 170, 260, 350, 420]
      : [0, 0, 0, 0, 0];

  const handleLogin = () => {
    const id = loginForm.id.trim().toLowerCase(),
      e: Record<string, string> = {};
    if (!id) e.id = 'Informe seu CPF ou e-mail.';
    if (!loginForm.senha) e.senha = 'Informe sua senha.';
    if (Object.keys(e).length) return setErrors(e);
    simulateRequest(() => {
      const u = users.find(
        (x) => (x.cpf === loginForm.id.trim() || x.email === id) && x.senha === loginForm.senha,
      );
      if (!u)
        return setErrors({
          geral: 'CPF/e-mail ou senha incorretos. Confira os dados e tente novamente.',
        });
      if (u.ban)
        return setErrors({
          geral:
            'Conta suspensa pela Prefeitura de Palmas por inconsistências nos descartes. Procure a Secretaria de Meio Ambiente.',
        });
      setCurrentUser(u);
      setPontos(u.pts || 0);
      navigate('dashboard');
      notify('Bem-vindo(a) de volta!');
    });
  };
  const handleLogout = () => {
    setUsers((us) =>
      us.map((x) => (currentUser && x.cpf === currentUser.cpf ? { ...x, pts: pontos } : x)),
    );
    setCurrentUser(null);
    navigate('login');
  };
  const passwordStrength =
    registerForm.senha.length > 7
      ? 1 +
        (/[A-Z]/.test(registerForm.senha) ? 1 : 0) +
        (/\d/.test(registerForm.senha) ? 1 : 0) +
        (/[^A-Za-z0-9]/.test(registerForm.senha) ? 1 : 0)
      : registerForm.senha
        ? 1
        : 0;
  const handleRegister = () => {
    const e: Record<string, string> = {};
    if (registerForm.nome.trim().split(' ').length < 2) e.nome = 'Informe userName e sobrenome.';
    if (!/^\S+@\S+\.\S+$/.test(registerForm.email)) e.email = 'Informe um e-mail válido.';
    if (!validCpf(registerForm.cpf)) e.cpf = 'CPF inválido. Confira os 11 dígitos.';
    else if (users.some((u) => u.cpf === registerForm.cpf))
      e.cpf = 'CPF já cadastrado. É permitida apenas 1 conta por CPF.';
    if (registerForm.senha.length < 6) e.senha = 'A senha deve ter no mínimo 6 caracteres.';
    if (Object.keys(e).length) return setErrors(e);
    simulateRequest(() => {
      setUsers([...users, { ...registerForm, adv: 0, ban: false, pts: 0 }]);
      setLoginForm({ id: registerForm.cpf, senha: registerForm.senha });
      setRegisterForm({ nome: '', email: '', cpf: '', senha: '' });
      navigate('login');
      notify('Cadastro realizado! Faça login para continuar.');
    });
  };
  const handlePickPhoto = (i: number, file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return setActiveModal('4c');
    const n = [...photos];
    n[i] = { url: URL.createObjectURL(file) };
    setPhotos(n);
  };
  const handleSubmitPhotos = () => {
    if (!photos.every(Boolean)) return setActiveModal('4c');
    simulateRequest(() => {
      setReleaseCode(String(Math.floor(100000 + Math.random() * 900000)));
      setSecondsLeft(600);
      setGpsReading(null);
      setContainerCode('');
      navigate('gpsValidation');
      notify('Fotos enviadas. Código de liberação gerado.');
    });
  };
  const handleGetLocation = () => {
    setGpsReading('load');
    setErrors({});
    setTimeout(
      () =>
        setGpsReading({
          lat: '-10,2491',
          lng: '-48,3243',
          s: (1.1 + Math.random() * 0.9).toFixed(1).replace('.', ','),
          d: simulatedDistance,
        }),
      1400,
    );
  };
  const handleValidateLocation = () => {
    if (!gpsReading || gpsReading === 'load')
      return setErrors({ gps: 'Obtenha sua localização antes de handleValidateLocation.' });
    if (!containerCode)
      return setErrors({ cod: 'Digite o código numérico impresso no contêiner.' });
    if (gpsReading.d > 15) return setActiveModal('5a');
    if (containerCode !== '7589') return setActiveModal('5b');
    navigate('postDescarte');
  };
  const handleCompleteDiscard = () => {
    if (!currentUser) return;
    const e: Record<string, string> = {};
    if (!wasteTypes.length) e.tipos = 'Marque ao menos um tipo de resíduo.';
    if (!rating) e.nota = 'Avalie a limpeza do contêiner.';
    if (Object.keys(e).length) return setErrors(e);
    const g =
      (wasteTypes.includes('Reciclável') ? 50 : 0) + (wasteTypes.includes('Orgânico') ? 20 : 0);
    setPontos((p) => p + g);
    setDiscards((d) => [
      {
        id: 'D-0' + (415 + d.length),
        cpf: currentUser.cpf,
        nome: currentUser.nome,
        eco: '7589',
        quando: formatNow(),
        tipos: [...wasteTypes],
        pts: g,
        status: 'Pendente',
        fotos: photos,
        nota: rating,
      },
      ...d,
    ]);
    setWasteTypes([]);
    setRecyclableSubtypes([]);
    setRating(0);
    setPhotos([null, null]);
    setGpsReading(null);
    setContainerCode('');
    navigate('dashboard');
    notify('+' + g + ' pontos creditados no seu saldo.');
  };
  const handleSendAlert = () => {
    if (!currentUser) return;
    const e: Record<string, string> = {};
    if (!/^\d{4}$/.test(reportForm.cod)) e.cod = 'Informe o código de 4 números do contêiner.';
    if (!reportForm.cats.length) e.cats = 'Selecione ao menos uma categoria da avaria.';
    if (Object.keys(e).length) return setErrors(e);
    simulateRequest(() => {
      const id = 'PR-2026-' + (3025 + tickets.length);
      setTickets((t) => [
        {
          id,
          cpf: currentUser.cpf,
          nome: currentUser.nome,
          cod: reportForm.cod,
          cats: reportForm.cats,
          obs: reportForm.obs,
          status: 'Aberto',
        },
        ...t,
      ]);
      setReportForm({ cod: '', cats: [], obs: '' });
      navigate('dashboard');
      notify('Alerta ' + id + ' enviado à Prefeitura.');
    });
  };
  const toggleItem = (a: string[], set: (v: string[]) => void, v: string) =>
    set(a.includes(v) ? a.filter((x) => x !== v) : [...a, v]);
  const approveDiscard = (id: string) => {
    setDiscards((d) => d.map((x) => (x.id === id ? { ...x, status: 'Homologado' } : x)));
    notify('Créditos homologados e liberados para o carnê do IPTU_ESTIMADO.');
  };
  const rejectDiscard = (id: string) => {
    const d = discards.find((x) => x.id === id);
    if (!d) return;
    setDiscards((ds) =>
      ds.map((x) => (x.id === id ? { ...x, status: 'Rejeitado', motivo: rejectionReason } : x)),
    );
    setUsers((us) => us.map((u) => (u.cpf === d.cpf ? { ...u, adv: u.adv + 1 } : u)));
    if (currentUser && d.cpf === currentUser.cpf) setPontos((p) => Math.max(0, p - d.pts));
    setPendingAction(null);
    notify('Descarte rejeitado. Cidadão notificado e advertência registrada.', 'warn');
  };
  const moderateUser = (k: string, cpf: string) => {
    setUsers((us) =>
      us.map((u) =>
        u.cpf !== cpf
          ? u
          : k === 'adv'
            ? { ...u, adv: u.adv + 1 }
            : k === 'ban'
              ? { ...u, ban: true }
              : { ...u, ban: false },
      ),
    );
    setPendingAction(null);
    notify(
      k === 'adv'
        ? 'Advertência registrada.'
        : k === 'ban'
          ? 'Usuário banido.'
          : 'Usuário reativado.',
      'warn',
    );
  };

  const filteredDiscards = discards.filter(
    (d) =>
      (statusFilter === 'Todos' || d.status === statusFilter) &&
      (d.nome + d.cpf).toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return {
    activeModal,
    activeTab,
    approveDiscard,
    containerCode,
    currentUser,
    discards,
    discountPercent,
    discountValue,
    errors,
    filteredDiscards,
    fontSize,
    gpsReading,
    greetingName,
    handleCompleteDiscard,
    handleGetLocation,
    handleLogin,
    handleLogout,
    handlePickPhoto,
    handleRegister,
    handleSendAlert,
    handleSubmitPhotos,
    handleValidateLocation,
    highContrast,
    isLoading,
    lightboxPhoto,
    loginForm,
    moderateUser,
    monthlyHistory,
    myDiscards,
    navigate,
    notify,
    passwordStrength,
    pendingAction,
    pendingPoints,
    photos,
    pontos,
    rating,
    recyclableSubtypes,
    registerForm,
    rejectDiscard,
    rejectionReason,
    releaseCode,
    reportForm,
    screen,
    searchQuery,
    secondsLeft,
    setActiveModal,
    setActiveTab,
    setContainerCode,
    setCurrentUser,
    setDiscards,
    setErrors,
    setFontSize,
    setGpsReading,
    setHighContrast,
    setIsLoading,
    setLightboxPhoto,
    setLoginForm,
    setPendingAction,
    setPhotos,
    setPontos,
    setRating,
    setRecyclableSubtypes,
    setRegisterForm,
    setRejectionReason,
    setReleaseCode,
    setReportForm,
    setScreen,
    setSearchQuery,
    setSecondsLeft,
    setShowPassword,
    setSimulatedDistance,
    setStatusFilter,
    setTickets,
    setToast,
    setUsers,
    setWasteTypes,
    showPassword,
    simulateRequest,
    simulatedDistance,
    statusFilter,
    tickets,
    toast,
    toggleItem,
    userName,
    users,
    wasteTypes,
    scrollRef,
  };
}
