import { NextResponse } from "next/server";
import { eliminarTarjeta } from "@/app/lib/actions";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Tarjeta ID es necesario" },
      { status: 400 }
    );
  }

  try {
    await eliminarTarjeta(Number(id));

    return NextResponse.json(
      { message: "Se ha borrado la tarjeta" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al borrar la tarjeta:", error);
    return NextResponse.json(
      { error: "Error al borrar la tarjeta" },
      { status: 500 }
    );
  }
}
