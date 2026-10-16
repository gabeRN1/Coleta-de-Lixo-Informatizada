import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';

export function UsersTab() {
  const { users, setPendingAction, moderateUser } = useApp();
  return (
    <>
      {users.map((u) => (
        <div
          key={u.cpf}
          className="border rounded-lg p-4 mb-3 flex flex-wrap items-center gap-4 text-sm"
        >
          <div className="flex-1 min-w-[220px]">
            <p className="font-bold">{u.nome}</p>
            <p className="text-mut">
              CPF {u.cpf} · {u.email}
            </p>
          </div>
          <Badge tone={u.ban ? 'err' : u.adv ? 'warn' : 'ok'}>
            {u.ban ? 'Banido' : u.adv ? u.adv + ' advertência(s)' : 'Regular'}
          </Badge>
          <div className="flex gap-2">
            {u.ban ? (
              <Button variant="secondary" onClick={() => moderateUser('re', u.cpf)}>
                REATIVAR
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setPendingAction({ k: 'adv', cpf: u.cpf })}
                >
                  ADVERTIR
                </Button>
                <Button variant="danger" onClick={() => setPendingAction({ k: 'ban', cpf: u.cpf })}>
                  BANIR
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
