import { db } from "@vercel/postgres";

const client = await db.connect();

async function createTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE tarjetas (
      card_id SERIAL PRIMARY KEY,
      palabra VARCHAR (30) NOT NULL,
      traduccion VARCHAR (30) NOT NULL,
      frase_ejemplo VARCHAR NULL,
      cat_gramatical VARCHAR (20) NULL,
      idioma VARCHAR (20) NOT NULL DEFAULT 'ingles',
      notas VARCHAR NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await createTable();
    await client.sql`COMMIT`;

    return Response.json({ message: "Se ha creado la tabla correctamente" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
