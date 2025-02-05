import { login } from "@/app/lib/actions";

export default async function Login() {
  return (
    <div className="mt-10 max-w-md w-full my-7 mx-auto rounded-lg md:rounded-2xl p-6 md:p-8 shadow-lg bg-white border border-gray-300 dark:bg-black dark:border-gray-700">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
        Iniciar sesión
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-3 mb-6">
        Introduce tus datos para iniciar sesión
      </p>

      <form className="space-y-6" action={login}>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-200 mb-2"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="example@email.com"
            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-200 mb-2"
          >
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="********"
            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Iniciar sesión
        </button>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-700">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
}
