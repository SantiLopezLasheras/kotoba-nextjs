export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Lista = {
  id: string;
  nombre: string;
  idioma: string;
  nivel: number;
};

export type Tarjeta = {
  card_id: string;
  palabra: string;
  traduccion: string;
  frase_ejemplo: string;
  pronunciacion: string;
  cat_gramatical: string;
  idioma: string;
  notas: string;
};
