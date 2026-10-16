import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GovHeader } from '@/components/ui/GovHeader';
import { Stepper } from '@/components/ui/Stepper';
import { CITIZEN_SCREENS, type CitizenScreen } from '@/routes/screens';
import { BottomNav } from './BottomNav';
import { ModalsHost } from './ModalsHost';
import { Toast } from './Toast';

export function PhoneFrame() {
  const { screen, scrollRef, navigate } = useApp();
  const {
    component: ScreenComponent,
    title,
    backTo,
    step,
    bottomNav,
  } = CITIZEN_SCREENS[screen as CitizenScreen];
  return (
    <div
      className="relative max-w-md mx-auto bg-[#F8F8F8] rounded-[2rem] border-[8px] border-nav shadow-2xl overflow-hidden flex flex-col"
      style={{ height: 'min(820px,calc(100vh - 90px))', minHeight: 620 }}
    >
      <GovHeader />
      {title && (
        <div className="bg-pri text-white px-4 py-3 flex items-center gap-3">
          {backTo && (
            <button onClick={() => navigate(backTo)} aria-label="Voltar" className="p-1 -ml-1">
              <ArrowLeft />
            </button>
          )}
          <h1 className="font-extrabold">{title}</h1>
        </div>
      )}
      {step && <Stepper current={step} />}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <ScreenComponent />
      </div>
      {bottomNav && <BottomNav />}
      <Toast />
      <ModalsHost />
    </div>
  );
}
