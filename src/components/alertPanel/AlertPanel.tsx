import React, { useContext, useEffect, useRef } from "react";
import { FullVehicles, RubrosFetched } from "../../interfaces/interfaces";
import { GlobalContext } from "../../context/GlobalProvider";
import SelectList from "../../UI/SelectList";
import useSubRubros from "../../hook/useSubRubros";
import useShortcuts from "../../hook/useShortcuts";

type Props = {
  handleEditVehicle: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  handleAddAlert: (alertas: { [key: string]: string }) => void;
  handleSetSelected: (alert: Object) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, vehicle: FullVehicles) => void;
};

const AlertPanel = ({ handleSetSelected, handleChange }: Props) => {
  const {
    fullVehicles,
    newAlert,
    lastUpdateKilometer,
    rubros,
    selectedVehicles,
    handleAdd,
    handleAlert,
    handleSearch,
    handleRemove,
    resetAlert,
    handleUpdateKilometer,
  } = useContext(GlobalContext);
  const { toogleSub } = useSubRubros();
  const { inputRefs, inputFirstRef, handleFocus, handleKeyPress } = useShortcuts();
  const formulario = useRef<HTMLFormElement>(null);

  const handleSaveAlert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newAdded: { [key: string]: string } = {};
    newAdded[newAlert.nombreAlerta] = newAlert.kilometros;
    handleSetSelected(newAdded);
    resetAlert();
  };

  const handleAlertAndSub = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    handleAlert(e);
  };

  useEffect(() => {
    handleFocus();
  }, [handleFocus]);

  useEffect(() => {}, [selectedVehicles]);

  return (
    <form ref={formulario} onSubmit={handleSaveAlert} className="flex flex-col gap-4 relative">
      <div className="flex relative items-center flex-col gap-2 md:gap-4 ">
        <span className="font-bold">Agregar alerta</span>
        <select
          className="capitalize font-bold text-center border border-gray-500 rounded-md w-52 p-2 "
          placeholder="elegir gasto"
          name="nombreAlerta"
          value={newAlert.nombreAlerta}
          onChange={handleAlertAndSub}
          id=""
          ref={inputFirstRef}
          onKeyDown={(event) => handleKeyPress(event, 0, newAlert.nombreAlerta, inputFirstRef)}
        >
          <option value="">{"seleccionar rubro"}</option>
          {rubros.map((item:RubrosFetched) => (
            <option key={item.id} className="capitalize">
              {item.rubro}
            </option>
          ))}
        </select>
        <SelectList
          observaciones={(ref: number) => (inputRefs.current[1] = ref)}
          keyDown={(event) => handleKeyPress(event, 1)}
          listado={toogleSub(newAlert.nombreAlerta)}
          onAlerts={true}
          handleAlert={handleAlert}
        />
        {newAlert.nombreAlerta ? (
          <p className="font-bold">Elegida: {newAlert.nombreAlerta}</p>
        ) : (
          <p>Seleccione una alerta para continuar</p>
        )}
      </div>
      <span>Cantidad de kilometraje para alerta</span>
      <input
        className="border border-gray-500 rounded-md p-2 text-center"
        name="kilometros"
        value={newAlert.kilometros}
        onChange={handleAlert}
        type="number"
      />
      <span className="text-md">Kilometraje desde cuando contabilizar</span>
      <span className="text-xs">(Si no aclara nada queda toma ultimo ingresado)</span>
      <input
        className="border border-gray-500 rounded-md p-2 text-center"
        onChange={handleUpdateKilometer}
        value={lastUpdateKilometer}
        type="number"
      />
      <div className="flex flex-col gap-2 text-left">
        <h1 className="font-bold">Seleccione a que vehiculos agregarla</h1>
        {fullVehicles.map((vehicle: FullVehicles, index) => (
          <div key={index} className="flex gap-2">
            <input
              onChange={() => {
                console.log("esto es el onchange");
                if (handleSearch(vehicle)) {
                  handleRemove(vehicle);
                } else {
                  handleAdd(vehicle);
                }
              }}
              type="checkbox"
              checked={handleSearch(vehicle)}
            />
            <span>
              {vehicle.marca}
              {vehicle.modelo}
              {vehicle.patente}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <button
          type="submit"
          disabled={!selectedVehicles.length}
          className={`bg-blue-50 p-3 rounded-md text-white w-40 text-sm mx-auto ${
            !selectedVehicles.length ? "opacity-50" : "hover:cursor-pointer"
          }`}
        >
          Guardar Alerta
        </button>
      </div>
    </form>
  );
};

export default AlertPanel;
