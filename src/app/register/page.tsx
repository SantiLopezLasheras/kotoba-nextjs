import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "../lib/actions";
import Link from "next/link";

const Register = async () => {
  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-6 md:p-8 shadow-lg bg-white border border-gray-300 dark:bg-black dark:border-gray-700">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
        K O T O B A
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-2 mb-6">
        Regístrate para empezar a aprender
      </p>

      <form className="space-y-6" action={register}>
        <div>
          <Label
            htmlFor="user"
            className="block text-gray-700 dark:text-gray-200 mb-2"
          >
            Nombre de Usuario
          </Label>
          <Input
            id="user"
            type="text"
            name="user"
            placeholder="Tu nombre de usuario"
            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-200 mb-2"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="example@email.com"
            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-200 mb-2"
          >
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Registrarse &rarr;
        </button>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-700">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
