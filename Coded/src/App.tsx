import { AppProvider, useApp } from '@/context/AppContext';
import { AppToolbar } from '@/components/layout/AppToolbar';
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { AdminPanel } from '@/screens/admin/AdminPanel';

function AppLayout() {
  const { screen, highContrast } = useApp();
  return (
    <div className={`min-h-screen py-4 px-3 ${highContrast ? 'hc' : ''}`}>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute bg-white p-2">
        Ir para o conteúdo
      </a>
      <AppToolbar />
      <main id="conteudo">{screen === 'adminPanel' ? <AdminPanel /> : <PhoneFrame />}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
