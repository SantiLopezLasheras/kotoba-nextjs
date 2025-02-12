import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-100">
      {/* Landing Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-16 px-8 max-w-screen-xl mx-auto">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src="/images/landing.jpg"
            alt="App Landing Image"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-colors-logoColor">
            Bienvenido a KOTOBA
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Una plataforma que te permite crear tus listas de vocabulario y
            flashcards para aprender jugando.
          </p>
          <Link
            href="/register"
            className="bg-colors-logoColor text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700"
          >
            ¿Empezamos?
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-colors-logoColor mb-10">
          Descubre K O T O B A
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {/* Feature 1 */}
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-8">
              <Image
                src="/images/landing.jpg"
                alt="Feature 1"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <h3 className="text-xl font-semibold text-colors-logoColor mb-4">
                Colección de Juegos
              </h3>
              <p className="text-gray-700">
                ¡Descubre una selección de minijuegos para hacer tu estudio más
                ameno!
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col sm:flex-row-reverse items-center">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pl-8">
              <Image
                src="/images/landing.jpg"
                alt="Feature 2"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <h3 className="text-xl font-semibold text-colors-logoColor mb-4">
                Listas Personalizadas
              </h3>
              <p className="text-gray-700">
                Crea tus propias listas de vocabulario o accede a las listas
                disponibles en la plataforma.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-8">
              <Image
                src="/images/landing.jpg"
                alt="Feature 3"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <h3 className="text-xl font-semibold text-colors-logoColor mb-4">
                Diario de Aprendizaje
              </h3>
              <p className="text-gray-700">
                No esperes más y empieza a escribir ya un blog personal para
                practicar tu nuevo idioma.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col sm:flex-row-reverse items-center">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pl-8">
              <Image
                src="/images/landing.jpg"
                alt="Custom Flashcards"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <h3 className="text-xl font-semibold text-colors-logoColor mb-4">
                Flashcards
              </h3>
              <p className="text-gray-700">
                Crea tus propias tarjetas de vocabulario según tus necesidades.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
