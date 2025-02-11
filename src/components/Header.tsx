import {
  NotebookPen,
  BookOpenCheck,
  Gamepad2,
  LogIn,
  LogOut,
  ChartNoAxesCombined,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { auth, signOut } from "@/auth";

export async function Header() {
  const session = await auth();

  return (
    <header className="animate-slide bg-slate-200 dark:bg-colors-logoColor p-4 flex justify-between items-center">
      <Image
        src="/images/kotoba.png"
        alt="logo de la aplicación"
        width={100}
        height={100}
        className="p-5"
      />

      {/* Menú tamaños grandes */}
      <div className="hidden lg:flex justify-center items-center gap-12 text-md">
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
        <div className="flex gap-2 items-center">
          <Link href="/dashboard">Dashboard</Link>
          <ChartNoAxesCombined size={24} />
        </div>
      </div>

      {/* Menú móviles */}
      <div className="lg:hidden flex gap-6 items-center">
        <Link href="/juegos" className="flex items-center justify-center">
          <Gamepad2 size={20} />
        </Link>
        <Link href="/listas" className="flex items-center justify-center">
          <BookOpenCheck size={20} />
        </Link>
        <Link href="/blog" className="flex items-center justify-center">
          <NotebookPen size={20} />
        </Link>
        <Link href="/dashboard" className="flex items-center justify-center">
          <ChartNoAxesCombined size={20} />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* Comprobar si el usuario ha iniciado sesión */}
        {!session ? (
          <Link
            href="/login"
            className="text-sm bg-green-500 hover:bg-green-600 flex items-center gap-2 px-3 py-2 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
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
              className="text-sm bg-red-500 hover:bg-red-600 flex items-center gap-2 px-3 py-2 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
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
