import { fetchListasPorIdioma, fetchTotales } from "../lib/data";
import BarChartComponent from "./BarChart";
import PieChartComponent from "./Piechart";

export default async function Page() {
  const data = await fetchTotales();
  const dataPie = await fetchListasPorIdioma();

  return (
    <div className="dark:bg-[#2A2D33] bg-slate-300 transition-colors duration-300">
      <header className="text-white p-5">
        <h1 className="text-center text-3xl font-bold">KOTOBA Dashboard</h1>
      </header>

      <main className="py-8 px-4 md:px-0 max-w-screen-xl mx-auto">
        {/* Use a grid layout for better space distribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 justify-center">
          {/* Estadísticas totales */}
          <div className="w-full p-4">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-center text-[#333] mb-4">
                Estadísticas Totales de KOTOBA
              </h2>
              <BarChartComponent data={data} />
            </div>
          </div>

          {/* Listas por Idiomas */}
          <div className="w-full p-4">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-center text-[#333] mb-4">
                Listas Creadas por Idioma
              </h2>
              <PieChartComponent data={dataPie} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
