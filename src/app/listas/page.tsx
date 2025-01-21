import { fetchTarjetas } from "../lib/data";

export default async function Listas() {
  const tarjetas = await fetchTarjetas();

  return (
    <>
      <h1 className="text-center text-3xl p-5">Listas</h1>
      <div
        id="card-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8"
      >
        {tarjetas.map((tarjeta) => (
          <div
            key={tarjeta.card_id}
            className="w-full max-w-sm h-[100px] bg-white rounded-xl shadow-md p-4"
          >
            <div className="flex flex-col justify-center items-center text-black">
              <h3 className="text-2xl font-bold mb-2 text-cente">
                {tarjeta.palabra.toUpperCase()}
              </h3>
              {tarjeta.cat_gramatical && (
                <small>{tarjeta.cat_gramatical}</small>
              )}
              <p className="text-lg font-semibold text-center">
                {tarjeta.traduccion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
