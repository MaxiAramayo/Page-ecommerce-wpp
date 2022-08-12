import Producto from "./Producto";

import { useFirebase } from "../useFirebase";

/* import { comercios } from "../api"; */

import { useEffect } from "react";

const Productos = ({ setCarrito, carrito }) => {
  const { data, error, getData, getProductos } = useFirebase();

  useEffect(() => {
    getProductos("K3A18i");
  }, []);

  console.log(data);

  const obj = {};

  data.map((item) => {
    {
      if (item.productos.length > 0) {
        item.productos.forEach((producto) => {
          const { categoria } = producto;
          obj[categoria] = obj[categoria]
            ? [...obj[categoria], producto]
            : [producto];
        });
      } else {
        return null;
      }
    }
  });

  return (
    <div className="grid place-content-center w-3/5 mx-auto">
      <h1 className="text-center font-black text-xl my-5 text-white">
        PRODUCTOS
      </h1>
      <div className="grid grid-cols-2 gap-3 grid-row-2">
        {/*  //POR CATEGORIA */}

        {Object.keys(obj).map((Cat) => (
          <div className="flex flex-col gap-2" key={Cat}>
            <p className="text-white font-bold">{Cat}</p>

            {obj[Cat].map((producto) => (
              <Producto
                key={producto.id}
                producto={producto}
                setCarrito={setCarrito}
                carrito={carrito}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
