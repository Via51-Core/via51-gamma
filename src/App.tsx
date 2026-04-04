// App.tsx
import { V51_Visor_Animado } from '@ui/V51_Visor_Animado'; // Usando Alias
import { CORE_REGISTRY } from '@gamma/registry'; // Usando Cerebro

function App() {
  const { electoral } = CORE_REGISTRY;

  return (
    <V51_Visor_Animado
      slides={electoral.slides}
      frasePrincipal={electoral.frasePrincipal}
      fraseSecundaria={electoral.fraseSecundaria}
      posicion={electoral.posicion}
    />
  );
}