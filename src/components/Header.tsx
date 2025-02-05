import {
  NotebookPen,
  BookOpenCheck,
  Gamepad2,
  LogIn,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NavButton } from "@/components/NavButton";
import { ModeToggle } from "@/components/ModeToggle";
import { auth, signOut } from "@/auth";

export async function Header() {
  const session = await auth();

  return (
    <header className="animate-slide bg-colors-logoColor flex justify-between">
      <Image
        src="/images/kotoba.png"
        alt="logo de la aplicación"
        width={100}
        height={100}
        className="p-5"
      />

      <div className="flex justify-center items-center gap-12 text-md">
        <div className="flex gap-2 items-center">
          <Link href="/juegos">Juegos</Link>
          <Gamepad2 size={24} />
        </div>
        <div className="flex gap-2 items-center">
          <Link href="/listas">Listas</Link>
          <BookOpenCheck size={24} />
        </div>
        <div className="flex gap-2 items-center">
          <Link href="/blog">Blog</Link>
          <NotebookPen size={24} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <NavButton href="/juegos" label="Juegos" icon={Gamepad2} />
        <NavButton href="/listas" label="Listas" icon={BookOpenCheck} />
        <NavButton href="/blog" label="Blog" icon={NotebookPen} />

        {/* Comprobar si el usuario ha iniciado sesión */}
        {!session ? (
          <Link
            href="/login"
            className="bg-green-500 hover:bg-green-600 flex items-center gap-2 px-3 py-2 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            Iniciar sesión
            <LogIn className="h-5 w-5" />
          </Link>
        ) : (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 flex items-center gap-2 px-3 py-2 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              Cerrar sesión
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        )}

        {/* Modo oscuro */}
        <ModeToggle />
      </div>
    </header>
  );
}
