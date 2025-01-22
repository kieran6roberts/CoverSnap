import ConfettiShower from 'react-confetti';

export default function Confetti() {
  return <ConfettiShower recycle={true} numberOfPieces={100} width={window.innerWidth} height={window.innerHeight} />;
}
