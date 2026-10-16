import { Leaf, ShieldCheck, Eye, EyeOff, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Alert } from '@/components/ui/Alert';
import { maskId } from '@/utils';
import { useApp } from '@/context/AppContext';

export function LoginScreen() {
  const {
    loginForm,
    setLoginForm,
    showPassword,
    setShowPassword,
    errors,
    isLoading,
    navigate,
    notify,
    handleLogin,
  } = useApp();
  return (
    <div className="p-5 up">
      <div className="text-center my-5">
        <div className="mx-auto w-14 h-14 rounded-full bg-ok text-white flex items-center justify-center">
          <Leaf size={30} />
        </div>
        <h1 className="text-2xl font-extrabold text-nav mt-3">Palmas Recicla +</h1>
        <p className="text-sm text-mut">Descarte certo vira desconto no IPTU</p>
      </div>
      <h2 className="font-bold mb-3">Identifique-se</h2>
      {errors.geral && (
        <Alert tone="err" title="Não foi possível entrar">
          {errors.geral}
        </Alert>
      )}
      <TextField
        label="CPF ou E-mail"
        icon={User}
        value={loginForm.id}
        error={errors.id}
        onChange={(e) => setLoginForm({ ...loginForm, id: maskId(e.target.value) })}
        autoComplete="username"
        placeholder="000.000.000-00 ou nome@email.com"
      />
      <TextField
        label="Senha"
        icon={Lock}
        type={showPassword ? 'text' : 'password'}
        value={loginForm.senha}
        error={errors.senha}
        onChange={(e) => setLoginForm({ ...loginForm, senha: e.target.value })}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        right={
          <button
            type="button"
            className="px-3 text-pri"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />
      <button
        className="text-pri text-sm font-semibold underline mb-4"
        onClick={() =>
          notify('Enviamos instruções de recuperação para o e-mail cadastrado.', 'info')
        }
      >
        Esqueci minha senha
      </button>
      <Button onClick={handleLogin} loading={isLoading}>
        ENTRAR
      </Button>
      <div className="flex items-center gap-3 my-4 text-xs text-mut">
        <div className="flex-1 h-px bg-[#CCC]" />
        ou
        <div className="flex-1 h-px bg-[#CCC]" />
      </div>
      <button
        className="block w-full text-center text-pri font-bold underline text-sm py-2"
        onClick={() => navigate('register')}
      >
        Cadastro Cliente
      </button>
      <p className="text-xs text-mut text-center mt-5 flex items-center justify-center gap-1">
        <ShieldCheck size={14} />
        Ambiente seguro · senha criptografada (RNF04)
      </p>
    </div>
  );
}
