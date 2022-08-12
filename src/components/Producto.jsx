const Producto = ({ producto, setCarrito, carrito }) => {
  const { nombre, precio, descripcion, categoria, id } = producto;

  const agregarAlCarrito = (id) => {
    if (carrito.length === 0) {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    } else {
      const existe = carrito.some((producto) => producto.id === id);
      if (existe) {
        const productos = carrito.map((producto) =>
          producto.id === id
            ? { ...producto, cantidad: producto.cantidad + 1 }
            : producto
        );
        setCarrito(productos);
      } else {
        setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      }
    }
  };

  return (
    <div className="flex flex-col bg-slate-700 p-5 text-white rounded-xl gap-5">
      <h2 className="font-bold">{nombre}</h2>

      <p>{descripcion}</p>

      <p>{categoria}</p>

      <p className="font-semibold">${precio}</p>

      <button
        onClick={() => agregarAlCarrito(id)}
        type="button"
        className="bg-blue-700 rounded-full  mx-auto p-2 text-white"
      >
        Agregar
      </button>
    </div>
  );
};

export default Producto;
