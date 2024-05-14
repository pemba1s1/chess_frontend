import clsx from "clsx";
import Image from "next/image";

export default function Home() {
  const row = [1, 2, 3, 4, 5, 6, 7, 8];
  const col = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {row.map((r) => (
        <div key={r} className="flex flex-row">
          {col.map((c) => (
            <div key={c} className="flex flex-col">
              <div className={clsx(
                "chess-cell",
                {
                  "bg-white": (r + c) % 2 === 0,
                  "bg-green-950": (r + c) % 2 !== 0,
                }
                )}>
                <div className="flex justify-center items-center h-full">
                  <Image src="/pieces/king.svg" width={90} height={90} alt="King"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
