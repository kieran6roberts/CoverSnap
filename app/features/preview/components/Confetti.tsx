'use client';

import ConfettiShower from 'react-confetti';
import { Suspense } from 'react';

export default function Confetti() {
  return (
    <Suspense fallback={null}>
      <ConfettiShower recycle={true} numberOfPieces={100} width={window.innerWidth} height={window.innerHeight} />
    </Suspense>
  );
}
