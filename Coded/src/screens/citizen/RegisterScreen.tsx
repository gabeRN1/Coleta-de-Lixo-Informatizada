import { ShieldCheck, User, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { maskCpf } from '@/utils';
import { useApp } from '@/context/AppContext';

export function RegisterScreen() {
  const { registerForm, setRegisterForm, errors, isLoading, passwordStrength, handleRegister } =
    useApp();
  return (
    <div className="p-5 up">
      <p className="text-sm text-mut mb-4">
        Todos os campos são obrigatórios. <b>Cada CPF pode ter apenas 1 conta</b>, para garantir a
        autenticidade dos créditos.
      </p>
      <TextField
        label="Nome Completo"
        icon={User}
        value={registerForm.nome}
        error={errors.nome}
        onChange={(e) => setRegisterForm({ ...registerForm, nome: e.target.value })}
        placeholder="Ex.: Lurdes Maria da Silva"
      />
      <TextField
        label="E-mail"
        icon={Mail}
        type="email"
        value={registerForm.email}
        error={errors.email}
        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
        placeholder="nome@email.com"
      />
      <TextField
        label="CPF"
        icon={ShieldCheck}
        inputMode="numeric"
        value={registerForm.cpf}
        error={errors.cpf}
        help="Para testar a regra de CPF único, use 111.444.777-35."
        onChange={(e) => setRegisterForm({ ...registerForm, cpf: maskCpf(e.target.value) })}
        placeholder="000.000.000-00"
      />
      <TextField
        label="Senha"
        icon={Lock}
        type="password"
        value={registerForm.senha}
        error={errors.senha}
        onChange={(e) => setRegisterForm({ ...registerForm, senha: e.target.value })}
        help="Mínimo de 6 caracteres. Use maiúsculas, números e símbolos."
      />
      {registerForm.senha && (
        <div className="-mt-2 mb-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={
                  'h-1.5 flex-1 rounded ' +
                  (passwordStrength >= n
                    ? passwordStrength < 3
                      ? 'bg-warn'
                      : 'bg-ok'
                    : 'bg-[#E0E0E0]')
                }
              />
            ))}
          </div>
          <p className="text-xs text-mut mt-1">
            Força da senha: {['', 'Fraca', 'Razoável', 'Boa', 'Forte'][passwordStrength]}
          </p>
        </div>
      )}
      <Button onClick={handleRegister} loading={isLoading}>
        CADASTRAR
      </Button>
    </div>
  );
}
