import React from "react";
import Link from "next/link";
import { klee_one } from "@/app/ui/fonts";

const Footer = () => {
  return (
    <footer className="bg-colors-logoColor text-white py-6 mt-auto">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className={`text-2xl ${klee_one.className} antialiased`}>
          K O T O B A
        </div>
        <nav>
          <ul className="flex space-x-6">
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
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
