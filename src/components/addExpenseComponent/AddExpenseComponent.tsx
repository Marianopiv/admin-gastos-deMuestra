import { useContext, useEffect, useState } from "react";
import { mediosDePago } from "../../config/config";
import { GlobalContext } from "../../context/GlobalProvider";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import moment from "moment";
import ButtonTransparent from "../../UI/ButtonTransparent";
import { FaSpinner } from "react-icons/fa";
import Filter from "../filter/Filter";
import useShortcuts from "../../hook/useShortcuts";
import SelectList from "../../UI/SelectList";
import useSubRubros from "../../hook/useSubRubros";
import useErrors from "../../hook/useErrors";
import "animate.css";
import {
  convertDate,
  convertHours,
  formatPlaceholder,
  getLastKm,
  lastCreated,
  rightNowForPlaceHolder,
  sortByAlphabeth,
} from "../../helper";
import { ExpensesContext } from "../../context/ExpensesProvider";
import { Rubros } from "../../interfaces/interfaces";

const AddExpenseComponent = () => {
  const { navigate, fullVehicles, rubros, filterExpenseByDate, resetExpenses } = useContext(GlobalContext);
  const { expense, toogleLoader, expenses, addExpense, handleAddFiles, saveExpense, updateExpense } =
    useContext(ExpensesContext);

  const {
    ButtonRef,
    inputRefs,
    inputFirstRef,
    handleFocus,
    handleKeyPress,
    handleFileInputChange,
    handleLastInputKeyDown,
    setHasFiles,
  } = useShortcuts();
  const { toogleSub } = useSubRubros();
  const { state } = useLocation();
  const [editForm, setEditForm] = useState(state.item);
  const { errors, handleBlur } = useErrors();
  const [previewSource, setPreviewSource] = useState<any>("");

  const handleFileInputCapture = (event: any) => {
    const file = event.target.files[0];
    previewImage(file);
  };
  const previewImage = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleEditForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "file") {
      handleFileInputCapture(e);
      const files = (e.target as HTMLInputElement).files;
      const file = files?.[0];
      setEditForm({ ...editForm, file });
    } else if (name === "fecha") {
      setEditForm({
        ...editForm,
        [name]: moment(value).format("DD/MM/YYYY"),
      });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileInputChange(e);
    handleFileInputCapture(e);
    handleAddFiles(e);
  };

  useEffect(() => {
    handleFocus();
  }, [handleFocus]);

  useEffect(() => {
    inputRefs.current[0] = inputFirstRef.current;
  }, [inputFirstRef, inputRefs]);

  useEffect(() => {
    // Actualizar el estado hasFiles al cargar el componente
    if (inputRefs.current[8].current) {
      setHasFiles(inputRefs.current[8].files && inputRefs.current[8].files.length > 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateExpense = () => {
    setPreviewSource("");
    updateExpense(editForm.id, "gastos", editForm);
  };

  const handleSaveExpense = () => {
    saveExpense("gastos", expense);
    setPreviewSource("");
  };

  return (
    <>
      <IoCloseCircleOutline
        onClick={() => navigate(-1)}
        className="text-3xl hover:cursor-pointer mx-auto mt-4 animate__animated animate__fadeInDown"
      />
      <h1 className="text-3xl mt-10 font-bold">{editForm ? "Edite un gasto" : "Ingrese un nuevo Gasto"}</h1>
      <div className="flex flex-col items-center  mt-4 md:flex-row md:justify-center md:mt-10">
        <form className="flex flex-col items-center gap-3 mt-4 md:flex-row md:flex-wrap md:justify-start md:mt-8 ">
          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-center gap-8 md:w-screen">
            <div className="flex relative flex-col gap-2 md:gap-4 ">
              <p className="flex  text-center font-bold mx-auto">Tipo de Gasto</p>
              <select
                onChange={editForm ? handleEditForm : addExpense}
                className="capitalize font-bold text-center border border-gray-500 rounded-md w-52 p-2 "
                placeholder="elegir gasto"
                name="rubro"
                id=""
                onBlur={(e) => handleBlur(e, "Rubro es obligatorio")}
                ref={inputFirstRef}
                onKeyDown={(event) => handleKeyPress(event, 0, expense.rubro, inputFirstRef)}
              >
                <option value="">{editForm ? editForm.rubro : "seleccionar rubro"}</option>
                {rubros.map((item: Rubros) => (
                  <option key={item.id} className="capitalize text-left">
                    {item.rubro}
                  </option>
                ))}
              </select>

              <p className="text-red-500 h-2 text-sm">{errors?.rubro}</p>

              <SelectList
                handleEditForm={handleEditForm}
                editForm={editForm}
                observaciones={(ref: number) => (inputRefs.current[1] = ref)}
                keyDown={(event) => handleKeyPress(event, 1)}
                addExpense={addExpense}
                listado={toogleSub(editForm ? editForm.rubro : expense.rubro)}
                onAlerts={false}
              />
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <span>Fecha del gasto</span>
              <input
                onChange={editForm ? handleEditForm : addExpense}
                placeholder="choco"
                name="fecha"
                className="border border-gray-500 rounded-md w-52 p-2 mx-auto text-center"
                type="date"
                defaultValue={editForm ? formatPlaceholder(editForm.fecha) : rightNowForPlaceHolder}
                ref={(ref) => (inputRefs.current[2] = ref)}
                onKeyDown={(event) => handleKeyPress(event, 2)}
              />
              <p className="text-red-500 h-2 text-sm"></p>
              {editForm && (
                <p className=" h-2 text-xs w-48 absolute text-gray-500 top-10 md:top-20 right-10 text-right">
                  *Se mantendra la fecha anteriormente elegida salvo que vuelvas a modificarla*
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <span>Precio</span>
              <input
                onChange={editForm ? handleEditForm : addExpense}
                placeholder="$50000"
                name="precio"
                className="border border-gray-500 rounded-md p-2 text-center"
                type="number"
                defaultValue={editForm?.precio}
                ref={(ref) => (inputRefs.current[3] = ref)}
                onKeyDown={(event) => handleKeyPress(event, 3)}
              />
              <p className="text-red-500 h-2 text-sm"></p>
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <span>Kilometraje</span>
              <input
                onChange={editForm ? handleEditForm : addExpense}
                placeholder={"1000"}
                name="kilometraje"
                className="border border-gray-500 rounded-md p-2 text-center"
                type="text"
                disabled={
                  convertDate(editForm?.fecha) < convertDate(lastCreated(expenses).fecha) ||
                  convertHours(editForm?.hora) < convertHours(lastCreated(expenses).hora)
                }
                defaultValue={editForm?.kilometraje}
                ref={(ref) => (inputRefs.current[4] = ref)}
                onKeyDown={(event) => handleKeyPress(event, 4)}
              />
              <p className="text-gray-400 h-2 text-sm">
                {expense.patente ? `último kilometraje ingresado: ${getLastKm(fullVehicles, expense)}` : ""}
              </p>
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <span>Móvil</span>

              <select
                onBlur={(e) => handleBlur(e, "móvil es obligatorio")}
                className="border border-gray-500 rounded-md p-2"
                defaultValue={editForm?.marca}
                onChange={editForm ? handleEditForm : addExpense}
                name="auto"
                id="mySelect"
                ref={(ref) => (inputRefs.current[5] = ref)}
                onKeyDown={(event) => handleKeyPress(event, 5)}
              >
                {" "}
                <option className="text-center" value="">
                  {editForm ? `${editForm.marca} ${editForm.modelo} ${editForm.patente}` : "seleccionar"}
                </option>
                {sortByAlphabeth(fullVehicles)?.map((item, index) => (
                  <option
                    value={JSON.stringify({
                      marca: item.marca,
                      modelo: item.modelo,
                      patente: item.patente,
                      id: item.id,
                    })}
                    key={index}
                  >
                    {item.marca} {item.modelo} {item.patente}
                  </option>
                ))}
              </select>
              <p className="text-red-500 h-2 text-sm">{errors?.auto}</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:flex-row gap-8 mt-4 md:mt-0 md:gap-8 md:justify-center  md:items-center md:w-screen">
            <div className="flex flex-col gap-2 md:gap-4">
              <span>Empresa</span>
              <input
                onChange={editForm ? handleEditForm : addExpense}
                onBlur={(e) => handleBlur(e, "empresa es obligatorio")}
                placeholder={"Herz electromecanica"}
                name="empresa"
                className="border border-gray-500 rounded-md px-6 mx-auto py-2 w-52 p-2 text-center"
                type="text"
                defaultValue={editForm?.empresa}
                ref={(ref) => (inputRefs.current[6] = ref)}
                onKeyDown={(event) => handleKeyPress(event, 6)}
              />

              <p className="text-red-500 h-2 text-sm">{errors?.empresa}</p>
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <span>Comentario/observaciones</span>
              <textarea
                onChange={editForm ? handleEditForm : addExpense}
                name="observaciones"
                className="border border-gray-500 rounded-md px-6 mx-auto py-2 text-center h-11"
                defaultValue={editForm?.observaciones}
                ref={(ref) => (inputRefs.current[7] = ref)}
                onKeyDown={(event) => handleKeyPress(event, 7)}
              ></textarea>
              <p className="text-red-500 h-2 text-sm"></p>
            </div>
            <div className="px-auto md:pt-8">
              <Filter
                handleKeyPress={handleKeyPress}
                inputRefs={inputRefs}
                fullVehicles={fullVehicles}
                help={"Seleccione medio de pago"}
                title={"Medio de pago"}
                handleEditForm={handleEditForm}
                expenses={""}
                editForm={editForm}
                addExpense={addExpense}
                filters={mediosDePago}
                option={mediosDePago}
                filterExpenseByDate={filterExpenseByDate}
                resetExpenses={resetExpenses}
              />
              <p className="text-red-500 h-2 text-sm"></p>
            </div>
            <div className="flex flex-col gap-2 md:gap-4 flex-wrap w-96 mx-6">
              <span>{editForm?.file ? "Reemplaza ticket de gasto" : "Adjunta ticket de gasto"}</span>
              <input
                className=""
                onKeyDown={handleLastInputKeyDown}
                onChange={editForm ? handleEditForm : handleFileInput}
                type="file"
                name="file"
                id="file"
                ref={(ref) => (inputRefs.current[9] = ref)}
                onKeyPress={(event) => handleKeyPress(event, 9)}
              />
              {(previewSource || editForm?.file) && (
                <img className="w-36 h-36" src={previewSource || editForm?.file} alt="adjunto" />
              )}

              {<p className="text-red-500 h-2 text-sm">{errors?.file}</p>}
            </div>

            <div className={`flex flex-col gap-2 md:gap-4 ${editForm?.ingresa ? "flex" : "hidden"}`}>
              <span>Ingresado por</span>
              <input
                disabled
                onChange={editForm ? handleEditForm : addExpense}
                placeholder={"ingresa"}
                name="ingresa"
                className={`border border-gray-500 rounded-md px-6 mx-auto py-2 text-center`}
                type="text"
                defaultValue={editForm?.ingresa}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="md:mx-auto md:text-center md:flex md:justify-center mt-8">
        {toogleLoader ? (
          <ButtonTransparent Icon={FaSpinner} text="Cargando" action={() => ""} />
        ) : (
          <div className="flex flex-col items-center">
            <button
              className={`bg-blue-50 p-3 rounded-md text-white w-40 hover:cursor-pointer`}
              ref={ButtonRef}
              name="file"
              onClick={state.action === "add" ? handleSaveExpense : handleUpdateExpense}
            >
              {state.action === "add" ? "Agregar Gasto" : "Guardar cambios"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddExpenseComponent;
