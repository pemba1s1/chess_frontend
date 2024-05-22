import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex relative min-h-screen flex-col items-center justify-center bg-chess text-black">
      <Image className="absolute top-0 -z-10" src="/images/chess.jpg" layout="fill" objectFit="cover" alt="chess-bg"/>
      <div className="p-20 bg-slate-400 bg-opacity-65 rounded-2xl">
        <h1 className="text-6xl font-bold mb-10">Welcome to Chess Game!</h1>
        <p className="text-2xl text-center mb-10">
          Start playing chess and challenge your friends.
        </p>
        <div className="flex justify-evenly">
          <Link
            href="/play"
            className="group rounded-lg border border-transparent px-4 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Play Offline{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </Link>
          <Link
            href="/create"
            className="group rounded-lg border border-transparent px-4 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Create Room{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </Link>
          <Link
            href="/join"
            className="group rounded-lg border border-transparent px-4 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Join Room{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </Link>
        
        </div>        
      </div>
    </main>
  );
}
