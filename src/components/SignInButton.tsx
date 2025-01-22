import { signIn } from "@/auth";
import { MdLogin } from "react-icons/md";

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 rounded-md text-sm mx-2 p-2 hover:bg-accent hover:text-accent-foreground"
      >
        <span>Iniciar sesión</span>
        <MdLogin />
      </button>
    </form>
  );
}
