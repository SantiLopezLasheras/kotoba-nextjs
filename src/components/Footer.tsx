import React from "react";
import Link from "next/link";
import { klee_one } from "@/app/ui/fonts";

const Footer = () => {
  return (
    <footer className="bg-slate-300 dark:bg-colors-logoColor text-gray-800 dark:text-white  py-6 mt-auto">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <div
          className={`text-2xl ${klee_one.className} antialiased mb-4 sm:mb-0`}
        >
          K O T O B A
        </div>
        <nav>
          <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/juegos" className="hover:text-gray-400">
                Juegos
              </Link>
            </li>
            <li>
              <Link href="/listas" className="hover:text-gray-400">
                Listas
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gray-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="text-center text-sm mt-8">
        <p>&copy; 2025 KOTOBA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
