import ConfettiShower from 'react-confetti';
import { Suspense } from 'react';

export default function Confetti() {
  if (typeof window === 'undefined') {
    throw Error('Confetti should only render on the client.');
  }

  return (
    <Suspense fallback={null}>
      <ConfettiShower recycle={true} numberOfPieces={100} width={window.innerWidth} height={window.innerHeight} />
    </Suspense>
  );
}
