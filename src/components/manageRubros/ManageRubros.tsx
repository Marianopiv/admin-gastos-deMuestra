import React, { ChangeEvent, useContext, useEffect, useRef } from "react";
import Button from "../../UI/Button";
import useRubros from "../../hook/useRubros";
import { RubrosFetched } from "../../interfaces/interfaces";
import { BiArrowBack } from "react-icons/bi";
import { compareRubro } from "../../helper";
import ButtonTransparent from "../../UI/ButtonTransparent";
import { GlobalContext } from "../../context/GlobalProvider";
import RubrosSub from "../rubrosSub/RubrosSub";

const ManageRubros = () => {
  const {
    saveRubro,
    handleRubro,
    handleCloseSubRubro,
    handleToogleSubRubro,
    handleSubRubro,
    updateRubros,
    chosenRubro,
    rubro,
    toogleSubRubro,
  } = useRubros();
  const { navigate, rubros } = useContext(GlobalContext);
  const formulario = useRef<HTMLFormElement>(null);

  useEffect(() => {}, [rubros]);

  const handleSaveRubro = (e: React.FormEvent<HTMLFormElement> | ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    saveRubro("rubros", rubro);
    if ((e as React.ChangeEvent<HTMLInputElement>).target) {
      handleRubro(e as React.ChangeEvent<HTMLInputElement>, true);
    }
  };
  return (
    <div className="w-screen relative">
      <ButtonTransparent
        customClass="text-xs border-0 sm:w-1/4 mt-10 ml-10 "
        Icon={BiArrowBack}
        text="Volver atras"
        action={() => navigate(-1)}
      />
      <h1 className="text-4xl">ManageRubros</h1>
      <form ref={formulario} onSubmit={handleSaveRubro} className="flex flex-col mt-10 items-center gap-2 md:gap-4">
        <span>Agregue un Rubro</span>
        <input
          onChange={(e) => handleRubro(e, false)}
          placeholder="Rubro aqui"
          value={rubro}
          className="border border-gray-500 rounded-md p-2 text-center"
          type="text"
        />
        <div className="flex">
          <button
            disabled={!rubro}
            type="submit"
            className={`bg-blue-50 p-3 rounded-md text-white w-40 text-sm mx-auto"hover:cursor-pointer"
          `}
          >
            Guardar
          </button>
        </div>
      </form>
      <h1 className="text-2xl">Rubros y Subrubros agregados</h1>
      <div className="flex w-screen mx-auto justify-center mt-10 gap-8">
        <div className="flex flex-wrap justify-center items-center gap-2">
          {rubros.map((obj: RubrosFetched, index) => {
            return (
              <div key={index}>
                <RubrosSub handleToogleSubRubro={handleToogleSubRubro} obj={obj} index={0} />
              </div>
            );
          })}
        </div>
      </div>
      {toogleSubRubro && (
        <div className="flex bg-white flex-col items-center gap-4 justify-center z-100 fixed top-4 left-2/3">
          <button onClick={handleCloseSubRubro}>X</button>
          <span>Agregar Subrubro a {chosenRubro?.rubro}</span>
          <input
            onChange={handleSubRubro}
            name="subRubro"
            className="border border-gray-500 rounded-md p-2 text-center"
          />
          <Button action={() => updateRubros(compareRubro(rubros, chosenRubro), chosenRubro)} text="Guardar" />
        </div>
      )}
    </div>
  );
};

export default ManageRubros;
