import { useState, useEffect } from "react";
import Carrito from "./components/Carrito";
import Productos from "./components/Productos";

import { useForm } from "react-hook-form";
import { validacionDelSelect } from "./validators/validator";

function App() {
  const [carrito, setCarrito] = useState(
    localStorage.getItem("carrito")
      ? JSON.parse(localStorage.getItem("carrito"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  console.log(carrito);

  const eliminarCarrito = (id) => {
    const productoNuevo = carrito.filter((item) => item.id !== id);
    return productoNuevo;
  };

  const editarCantidad = (id, opcion) => {
    let productos = carrito.map((producto) => {
      if (producto.id === id) {
        if (opcion === "aumentar") {
          producto.cantidad++;
        } else if (opcion === "restar") {
          if (producto.cantidad > 1) {
            producto.cantidad--;
          } else {
            producto.cantidad = 0;
          }
        }
      }
      return producto;
    });

    carrito.map((item) => {
      if (item.id === id) {
        if (item.cantidad === 0) {
          productos = eliminarCarrito(id);
        }
      }
    });

    setCarrito(productos);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  //-----------------------------------------------------------------------------

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const incluirDireccion = watch("FormaDeConsumir");
  const incluirPago = watch("FormaDePago");

  const total = carrito.reduce(
    (actual, producto) => actual + producto.precio * producto.cantidad,
    0
  );

  const onSubmit = (data) => {
    const { nombre, FormaDeConsumir, apellido, Direccion, FormaDePago } = data;

    let mensaje = "";

    if (FormaDeConsumir === "delivery") {
      mensaje = `
    *Hola Tienda: Aramayo*
    _Nombre: ${nombre} ${apellido}_
    Envio: *Por Delivery*
    ${carrito.map((item) => {
      return `
      *${item.nombre}* (${item.cantidad}) _$${item.precio}_
      -----------------------------------------------------
      `;
    })}
    direccion: *${Direccion}*
    *El costo del envio a cargo del restaurante/Cadete*
    pago: *${FormaDePago}*
    Total: _$${total}_
  `;
    } else {
      mensaje = `
    *Hola Tienda: Aramayo*
    _Nombre: ${nombre} ${apellido}_
    Envio: *Retira en Restaurante*
    ${carrito.map((item) => {
      return `
      *${item.nombre}* (${item.cantidad}) _$${item.precio}_
      -----------------------------------------------------
      `;
    })}
    pago: *${FormaDePago}*
    Total: _$${total}_
    `;
    }

    console.log(data);

    console.log(mensaje);

    window.open(
      `https://wa.me/+543854402944?text=${encodeURIComponent(mensaje)}`
    );
  };

  console.log(show);

  return (
    <>
      {show ? (
        <div className="grid place-content-center h-screen">
          <form
            className="p-5 bg-slate-700 text-white rounded-xl flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="block">Ingrese el Nombre: </label>

              <input
                className="text-black w-full rounded"
                type="text"
                placeholder="nombre"
                {...register("nombre", {
                  required: true,
                })}
              />

              {errors.nombre?.type === "required" && (
                <p>Rellene el campo nombre</p>
              )}

              <p></p>
              {/* --------------------------------------------------------------------- */}

              <label className="block">Ingrese el Apellido: </label>
              <input
                type="text"
                className="text-black w-full rounded"
                placeholder="apellido"
                {...register("apellido", {
                  required: true,
                })}
              />

              {errors.apellido?.type === "required" && (
                <p>Rellene el campo Apellido</p>
              )}
            </div>

            <div>
              <select
                className="text-black"
                {...register("FormaDeConsumir", {
                  validate: validacionDelSelect,
                })}
              >
                <option selected disabled value={""}>
                  Selecciona la forma de consumir
                </option>
                <option value="delivery">Delivery</option>
                <option value="take">Retirar en el restaurante</option>
              </select>

              {errors.FormaDeConsumir && <p>Debe seleccionar una opcion</p>}

              {incluirDireccion === "delivery" ? (
                <div>
                  <label>Ingrese su Direccion:</label>
                  <input
                    type="text"
                    className="text-black w-full rounded"
                    placeholder="Direccion"
                    {...register("Direccion", { required: true })}
                  />
                  {errors.Direccion?.type === "required" && (
                    <p>Es necesario ingresar la direccion</p>
                  )}
                </div>
              ) : (
                <></>
              )}

              {incluirDireccion === "take" && <p>Retira en Restaurante</p>}
            </div>

            <div>
              <select
                className="text-black w-full"
                {...register("FormaDePago", {
                  validate: validacionDelSelect,
                })}
              >
                <option selected disabled value={""}>
                  Selecciona la forma de Pago
                </option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
              </select>

              {errors.FormaDePago && <p>Debe seleccionar una opcion</p>}

              {incluirPago === "efectivo" ? (
                <div>
                  <label>Pagara En Efectivo</label>
                </div>
              ) : (
                <></>
              )}

              {incluirPago === "tarjeta" ? (
                <div>
                  <label>Pagara Con Tarjeta</label>
                </div>
              ) : (
                <></>
              )}
            </div>

            <button className="bg-blue-600  rounded-xl p-1 w-22 " type="submit">
              Finalizar Compra
            </button>
          </form>
          <button
            className="bg-red-500  rounded-xl p-1 w-20 mx-auto mt-5 text-white"
            onClick={() => setShow(!show)}
          >
            Volver
          </button>
        </div>
      ) : (
        <>
          <Productos setCarrito={setCarrito} carrito={carrito} />

          <Carrito
            carrito={carrito}
            editarCantidad={editarCantidad}
            vaciarCarrito={vaciarCarrito}
            setShow={setShow}
            show={show}
          />
        </>
      )}
    </>
  );
}

export default App;
