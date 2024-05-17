import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex relative min-h-screen flex-col items-center justify-center bg-chess text-white">
      <Image className="absolute top-0 -z-10" src="/images/chess.jpg" layout="fill" objectFit="cover" alt="chess-bg"/>
      <div>
        <h1 className="text-6xl font-bold mb-8">Welcome to Chess Game!</h1>
        <p className="text-2xl text-center mb-8">
          Start playing chess and challenge your friends.
        </p>
      </div>
      <Link
        href="/play"
        className="group rounded-lg border border-transparent px-4 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          Play{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </Link>
    </main>
  );
}
