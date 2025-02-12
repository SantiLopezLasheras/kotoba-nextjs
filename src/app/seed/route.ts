import { db } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { users } from "../lib/placeholder-data";

const client = await db.connect();

// async function createListasTable() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//       CREATE TABLE listas (
//         id SERIAL PRIMARY KEY,
//         nombre VARCHAR (255) NOT NULL,
//         idioma VARCHAR (30) NOT NULL DEFAULT 'ingles',
//         nivel INTEGER NOT NULL,
//         created_at TIMESTAMP NOT NULL DEFAULT NOW()
//       );
//     `;
// }

// async function createTarjetasTable() {
//   await client.sql`
//     CREATE TABLE tarjetas (
//       card_id SERIAL PRIMARY KEY,
//       palabra VARCHAR (30) NOT NULL,
//       traduccion VARCHAR (30) NOT NULL,
//       frase_ejemplo VARCHAR NULL,
//       cat_gramatical VARCHAR (20) NULL,
//       idioma VARCHAR (20) NOT NULL DEFAULT 'ingles',
//       pronunciacion VARCHAR (50) NULL,
//       notas VARCHAR NULL,
//       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//       lista_id INTEGER NOT NULL,
//       FOREIGN KEY (lista_id) REFERENCES listas(id)
//     );
//   `;
// }

// async function seedTarjetas() {
//   try {
//     const response =
//       await client.sql`SELECT id FROM listas WHERE id = 3 LIMIT 1`;

//     console.log(response);
//     if (response.rows.length === 0) {
//       console.log("No existe ninguna lista en la BD.");
//       return;
//     }

//     const listaId = response.rows[0].id;

//     const tarjetasData = [
//       {
//         palabra: "apple",
//         traduccion: "manzana",
//         cat_gramatical: "sustantivo",
//         idioma: "inglés",
//         frase_ejemplo: "An apple a day keeps the doctor away.",
//         pronunciacion: "\u02C8æp.əl",
//       },
//       {
//         palabra: "dog",
//         traduccion: "perro",
//         cat_gramatical: "sustantivo",
//         idioma: "inglés",
//         frase_ejemplo: "We could hear dogs barking in the distance.",
//         pronunciacion: "\u0064\u0254\u0261",
//       },
//       {
//         palabra: "run",
//         traduccion: "correr",
//         cat_gramatical: "verbo",
//         idioma: "inglés",
//         frase_ejemplo: "I can run a mile in five minutes.",
//         pronunciacion: "rʌn",
//       },
//       {
//         palabra: "book",
//         traduccion: "libro",
//         cat_gramatical: "sustantivo",
//         idioma: "inglés",
//         frase_ejemplo: "Have you read any good books recently?",
//         pronunciacion: "bʊk",
//       },
//       {
//         palabra: "sky",
//         traduccion: "cielo",
//         cat_gramatical: "sustantivo",
//         idioma: "inglés",
//         frase_ejemplo: "We looked up at the sky..",
//         pronunciacion: "skaɪ",
//       },
//       {
//         palabra: "cat",
//         traduccion: "gato",
//         cat_gramatical: "sustantivo",
//         idioma: "inglés",
//         frase_ejemplo: "My cat likes dozing in front of the fire.",
//         pronunciacion: "kæt",
//       },
//       {
//         palabra: "table",
//         traduccion: "mesa",
//         cat_gramatical: "sustantivo",
//         idioma: "inglés",
//         frase_ejemplo: "I need to buy a new table for the dining room.",
//         pronunciacion: "ˈteɪ.bəl",
//       },
//       {
//         palabra: "window",
//         traduccion: "ventana",
//         cat_gramatical: "sustantivo",
//         idioma: "inglés",
//         frase_ejemplo: "Is it all right if I open the window?",
//         pronunciacion: "ˈwɪn.dəʊ",
//       },
//       {
//         palabra: "door",
//         traduccion: "puerta",
//         cat_gramatical: "sustantivo",
//         idioma: "inglés",
//         frase_ejemplo: "The door to his bedroom was locked.",
//         pronunciacion: "dɔːr",
//       },
//       {
//         palabra: "tree",
//         traduccion: "árbol",
//         cat_gramatical: "sustantivo",
//         idioma: "inglés",
//         frase_ejemplo: "We sat under a tree for shade.",
//         pronunciacion: "triː",
//       },
//     ];

//     for (const tarjeta of tarjetasData) {
//       await client.sql`
//         INSERT INTO tarjetas (palabra, traduccion, cat_gramatical, idioma, pronunciacion, frase_ejemplo, lista_id)
//         VALUES (${tarjeta.palabra}, ${tarjeta.traduccion}, ${tarjeta.cat_gramatical}, ${tarjeta.idioma}, ${tarjeta.pronunciacion}, ${tarjeta.frase_ejemplo}, ${listaId});
//       `;
//     }

//     console.log("Tarjetas table seeded successfully!");
//   } catch (err) {
//     console.error("Error seeding tarjetas table:", err);
//   }
// }

async function createUsersTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'user'
    );
  `;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'user'
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await createListasTable();
    await createUsersTable();
    await seedUsers();
    // await createTarjetasTable();
    // await seedTarjetas();
    await client.sql`COMMIT`;

    return Response.json({ message: "Se ha creado la tabla correctamente" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
