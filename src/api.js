import { nanoid } from "nanoid";

export const comercios = [
  {
    id: nanoid(6),
    nombre: "Café de la esquina",
    direccion: "Calle falsa 123",
    telefono: "123456789",
    productos: [
      {
        id: nanoid(6),
        nombre: "Café",
        precio: 100,
        descripcion: "Café de la mejor calidad",
        imagen: "",
        categoria: "Bebidas",
      },
      {
        id: nanoid(6),
        nombre: "Té",
        precio: 100,
        descripcion: "Té de la mejor calidad",
        imagen: "",
        categoria: "Bebidas",
      },
      {
        id: nanoid(6),
        nombre: "Tostadas",
        precio: 100,
        descripcion: "Tostadas de la mejor calidad",
        imagen: "",
        categoria: "Comida",
      },
      {
        id: nanoid(6),
        nombre: "Sandwich",
        precio: 100,
        descripcion: "Sandwich de la mejor calidad",
        imagen: "",
        categoria: "Comida",
      },
    ],
  },
];
