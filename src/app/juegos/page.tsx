import Image from "next/image";
import Link from "next/link";

export default function Juegos() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-center text-4xl font-extrabold text-white p-10">
        ¡Diviértete mientras aprendes!
      </h1>

      <div className="flex flex-wrap justify-center gap-10 p-5">
        {/* Memory Game */}
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out flex flex-col">
          <div className="relative w-full h-48">
            <Image
              src="/images/memory-game.jpg"
              alt="Memory Game"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col justify-between p-5 h-full">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">
              ¡Encuentra la traducción correcta!
            </h2>
            <p className="text-gray-600 text-center mb-4">
              El clásico juego de memoria de buscar parejas, pero con palabras.
              Busca las palabras y sus traducciones.
            </p>
            <div className="mt-auto flex justify-center">
              <Link
                href="/juegos/memory-game"
                className="text-colors-buttonColorHover font-bold hover:underline"
              >
                Jugar
              </Link>
            </div>
          </div>
        </div>

        {/* Drag and Drop */}
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out flex flex-col">
          <div className="relative w-full h-48">
            <Image
              src="/images/drag-drop.jpg"
              alt="Drag and Drop Game"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col justify-between p-5 h-full">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">
              ¡Ordena las frases!
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Idiomas los Yo todos días aprendiendo estoy. ¡Pero qué lío! Ni
              Yoda hablaba tan mal... Juega a ordenar las frases para que tengan
              sentido. Arrastra cada palabra a su posición adecuada.
            </p>
            <div className="mt-auto flex justify-center">
              <Link
                className="text-colors-buttonColorHover font-bold hover:underline"
                href="/juegos/dragdrop"
              >
                Jugar
              </Link>
            </div>
          </div>
        </div>

        {/* Repasar */}
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out flex flex-col">
          <div className="relative w-full h-48">
            <Image
              src="/images/repasar.webp"
              alt="Drag and Drop Game"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col justify-between p-5 h-full">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">
              Repasar flashcards
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Mira, no te voy a engañar. Esto no es un juego. Pero si no repasas
              de vez cuando, poco vas a mejorar.
            </p>
            <div className="mt-auto flex justify-center">
              <Link
                className="text-colors-buttonColorHover font-bold hover:underline"
                href="/juegos/repasar"
              >
                Repasar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
