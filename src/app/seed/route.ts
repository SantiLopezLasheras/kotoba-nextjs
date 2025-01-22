import { db } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { users } from "../lib/placeholder-data";

const client = await db.connect();

// async function createTable() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE tarjetas (
//       card_id SERIAL PRIMARY KEY,
//       palabra VARCHAR (30) NOT NULL,
//       traduccion VARCHAR (30) NOT NULL,
//       frase_ejemplo VARCHAR NULL,
//       cat_gramatical VARCHAR (20) NULL,
//       idioma VARCHAR (20) NOT NULL DEFAULT 'ingles',
//       notas VARCHAR NULL,
//       created_at TIMESTAMP NOT NULL DEFAULT NOW()
//     );
//   `;
// }

// async function createUsersTable() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;
// }

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
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
    await seedUsers();
    // await createUsersTable();
    // await createTable();
    await client.sql`COMMIT`;

    return Response.json({ message: "Se ha creado la tabla correctamente" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
