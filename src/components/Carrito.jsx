const Carrito = ({ carrito, editarCantidad, vaciarCarrito, setShow, show }) => {
  const total = carrito.reduce(
    (actual, producto) => actual + producto.precio * producto.cantidad,
    0
  );

  return (
    <>
      <div className="grid  my-10 w-11/12 mx-auto text-white">
        <h1 className="text-center font-black my-5 text-xl ">CARRITO</h1>

        {carrito.length === 0 ? (
          <p className="text-center">No hay productos en el carrito</p>
        ) : (
          <>
            <div className="flex flex-col gap-5 w-full ">
              {carrito.map((carro) => (
                <div
                  key={carro.id}
                  className="flex flex-col bg-slate-700 p-3 rounded-xl gap-1"
                >
                  <h2>{carro.nombre}</h2>
                  <p>{carro.descripcion}</p>
                  <p>{carro.categoria}</p>
                  <p>${carro.precio}</p>
                  <p>
                    Cantidad:{" "}
                    <button
                      onClick={() => editarCantidad(carro.id, "restar")}
                      className="font-bold text-xl"
                    >
                      -
                    </button>{" "}
                    <span>{carro.cantidad}</span>{" "}
                    <button
                      onClick={() => editarCantidad(carro.id, "aumentar")}
                      className="font-bold text-xl"
                    >
                      +
                    </button>{" "}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2  mt-10 bg-slate-700 p-5 rounded-xl">
              <h1>Total: ${total} </h1>
              <button
                onClick={() => vaciarCarrito()}
                className="bg-red-600 w-22 mx-auto p-2 rounded-full text-white"
              >
                Vaciar carrito
              </button>
              <button
                className="bg-blue-600  w-22 mx-auto rounded-full p-2 "
                onClick={() => setShow(!show)}
              >
                Comprar
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Carrito;
