import { NotebookPen, BookOpenCheck, Gamepad2 } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { NavButton } from "@/components/NavButton";
import { ModeToggle } from "@/components/ModeToggle";
import SignInButton from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

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
        {!session && <SignInButton />}
        {session && <SignOutButton />}
        <ModeToggle />
      </div>
    </header>
  );
}
