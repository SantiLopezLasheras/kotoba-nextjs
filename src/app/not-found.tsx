import Image from "next/image";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full min-h-[520px] bg-gradient-to-br from-blue-500 to-violet-500">
      <div className="mx-auto py-6 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Mamma mia! ¡Qué vergüenza!</h2>
        <h3>No recuerdo dónde guardé esa página...</h3>
        <Image
          className="mt-6 rounded-xl"
          src="/images/not-found-1024x1024.png"
          width={300}
          height={300}
          sizes="300px"
          alt="Page Not Found"
          priority={true}
          title="404 | Page Not Found"
        />
      </div>
    </div>
  );
}
