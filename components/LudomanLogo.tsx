import Image from "next/image";

export function LudomanLogo() {
  return (
    <Image
      src="/ludoman.svg"
      alt="LUDOMAN"
      width={400}
      height={500}
      className="max-w-full h-auto drop-shadow-xl"
      priority
    />
  );
}