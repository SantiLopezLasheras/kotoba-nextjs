import Link from "next/link";

export default function Juegos() {
  return (
    <>
      <h1 className="text-center text-3xl p-5">Juegos</h1>

      <ul className="text-xl">
        <li>
          <Link href="/juegos/memory-game">Memory Game</Link>
        </li>
        <li>
          <Link href="/juegos/drag-drop">Drag and Drop</Link>
        </li>
      </ul>
    </>
  );
}
