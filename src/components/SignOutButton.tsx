import { signOut } from "@/auth";
import { MdLogout } from "react-icons/md";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 rounded-md text-sm mx-2 p-2 hover:bg-accent hover:text-accent-foreground"
      >
        <span>Cerrar sesión</span>
        <MdLogout />
      </button>
    </form>
  );
}
