import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center px-4">
      <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl p-5">Blog</h1>
      <h2 className="text-center text-xl sm:text-2xl lg:text-3xl p-5">
        Esta página está en construcción
      </h2>
      <div className="relative w-full sm:w-3/4 md:w-1/2 mt-5">
        <Image
          src="/images/constructing.jpg"
          alt="Under construction"
          width={600}
          height={400}
          className="max-w-full h-auto rounded-3xl mb-5"
        />
      </div>
    </div>
  );
}
