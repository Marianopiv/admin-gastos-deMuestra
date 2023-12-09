import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GlobalContext } from "../../context/GlobalProvider";
import useFilter from "../../hook/useFilter";
import ButtonTransparent from "../../UI/ButtonTransparent";
import { FaSpinner } from "react-icons/fa";
import { FullVehiclesModel } from "../../interfaces/interfaces";
import useShortcuts from "../../hook/useShortcuts";
import useVehicles from "../../hook/useVehicles";

const AddVehicle = () => {
  const { saveVehicle, navigate } = useContext(GlobalContext);
  const { handleInput, updateVehicle, element } = useVehicles();
  const { toogleLoader, setToogleLoader } = useFilter();
  const { ButtonRef, handleLastInputKeyDown } = useShortcuts();
  const { state } = useLocation();

  const [editVehicle, setEditVehicle] = useState(state.item);

  const handleEditVehicle = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditVehicle({ ...editVehicle, [name]: value });
  };
  const handleAdd = (info: FullVehiclesModel) => {
    setToogleLoader(true);
    saveVehicle(info);
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:flex-wrap md:mx-10 gap-4 mt-10">
      <IoCloseCircleOutline
        onClick={() => navigate(-1)}
        className="text-3xl hover:cursor-pointer md:w-screen"
      />
      <h1 className="text-4xl md:w-screen">
        {editVehicle ? "Editar Vehiculo elegido" : "Agrega nuevo vehiculo"}
      </h1>
      <div className="flex flex-col md:flex-row w-screen justify-center gap-10 mt-10">
        <div className="flex flex-col gap-4">
          <span>Marca</span>
          <input
            defaultValue={editVehicle?.marca}
            onChange={editVehicle ? handleEditVehicle : handleInput}
            name="marca"
            className="border border-gray-500 rounded-md p-2 text-center w-1/2 mx-auto  md:w-auto"
            type="text"
            placeholder="Toyota"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span>Modelo</span>
          <input
            defaultValue={editVehicle?.modelo}
            onChange={editVehicle ? handleEditVehicle : handleInput}
            name="modelo"
            className="w-1/2 mx-auto  md:w-auto border border-gray-500 rounded-md p-2 text-center"
            type="text"
            placeholder="Corolla"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span>Tipo de Unidad</span>
          <input
            defaultValue={editVehicle?.tipoDeUnidad}
            onChange={editVehicle ? handleEditVehicle : handleInput}
            name="tipoDeUnidad"
            className="w-1/2 mx-auto  md:w-auto border border-gray-500 rounded-md p-2 text-center"
            type="text"
            placeholder="Standard"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span>Año</span>
          <input
            defaultValue={editVehicle?.año}
            onChange={editVehicle ? handleEditVehicle : handleInput}
            name="año"
            className="w-1/2 mx-auto  md:w-auto border border-gray-500 rounded-md p-2 text-center"
            type="text"
            placeholder="2020"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center w-screen gap-10">
        <div className="flex flex-col gap-4">
          <span>Color</span>
          <input
            defaultValue={editVehicle?.color}
            onChange={editVehicle ? handleEditVehicle : handleInput}
            name="color"
            className="w-1/2 mx-auto  md:w-auto border border-gray-500 rounded-md p-2 text-center"
            type="text"
            placeholder="Azul"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span>Patente</span>
          <input
            defaultValue={editVehicle?.patente}
            onChange={editVehicle ? handleEditVehicle : handleInput}
            name="patente"
            className="border border-gray-500 rounded-md p-2 text-center"
            type="text"
            placeholder="AP 993 PI"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span>Kilometraje</span>
          <input
            defaultValue={editVehicle?.kilometraje}
            onKeyDown={handleLastInputKeyDown}
            onChange={editVehicle ? handleEditVehicle : handleInput}
            disabled={editVehicle}
            name="kilometraje"
            className={`border border-gray-500 rounded-md p-2 text-center ${editVehicle?"text-gray-500":""}`}
            type="text"
            placeholder="1000"
          />
        </div>
      </div>
      {toogleLoader ? (
        <ButtonTransparent Icon={FaSpinner} text="Cargando" action={() => ""} />
      ) : (
        <button
          className="bg-blue-50 p-3 rounded-md text-white w-40 hover:cursor-pointer"
          ref={ButtonRef}
          onClick={
            state.action === "add"
              ? () => handleAdd(element)
              : () => updateVehicle(editVehicle.id, "vehiculos", editVehicle,false)
          }
        >
          {state.action === "add" ? "Agregar" : "Actualizar"} Vehiculo
        </button>
      )}
    </div>
  );
};

export default AddVehicle;
