import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-[800px] bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl p-5">Blog</h1>
      <h2 className="text-center text-xl p-5">
        Esta página está en construcción
      </h2>
      <div className="relative w-1/2 mt-5">
        <Image
          src="/images/constructing.jpg"
          alt="Under construction"
          width={600}
          height={400}
        />
      </div>
    </div>
  );
}
