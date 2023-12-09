import { useContext, useEffect } from "react";
import { ImBin2 } from "react-icons/im";
import Button from "../../UI/Button";
import { GlobalContext } from "../../context/GlobalProvider";
import Spinner from "../spinner/Spinner";
import ButtonTransparent from "../../UI/ButtonTransparent";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { sortByAlphabeth } from "../../helper";
import useSearch from "../../hook/useSearch";
import CurrentAlert from "../currentAlert/CurrentAlert";
import useFilter from "../../hook/useFilter";

type Props = {
  customClasses: boolean;
};

const VehiclesPanel = ({ customClasses }: Props) => {
  const { fullVehicles, navigate, removeVehicle } = useContext(GlobalContext);
  const { toogleSearch, handleToogleSearch } = useSearch();
  const { toogleLoader,setToogleLoader } = useFilter();

  useEffect(() => {
    if (fullVehicles.length===0) {
      setToogleLoader(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullVehicles]);

  if (toogleLoader) {
    return <Spinner />;
  }

  return (
    <div className={`mb-5 text-left ${customClasses ? "w-screen pl-10 sm:pl-0 sm:w-auto" : ""}`}>
      <div
        className={`mt-10 text-center mx-auto sm:flex justify-center lg:justify-normal ${
          customClasses ? "" : "lg:mx-80"
        }  items-center `}
      >
        <ButtonTransparent
          customClass="text-xs border-0 sm:w-1/4"
          Icon={BiArrowBack}
          text="Volver atras"
          action={() => navigate(-1)}
        />
        <h1 className={`text-4xl sm:w-3/4 ${customClasses ? "hidden" : ""}`}>Elimina o agrega vehiculos</h1>
      </div>
      <div className={`flex flex-col items-center justify-center gap-10 mt-12`}>
        <div className={`flex flex-col ${!customClasses ? "w-screen" : ""} gap-4 border-2 p-3 bg-gray-400 rounded-md`}>
          <div
            className={`flex bold text-lg uppercase ${
              customClasses ? "gap-6 sm:gap-20" : " gap-10"
            } h-14 items-center sm:w-full sm:justify-between sm:border rounded-md px-3 py-2 bg-white font-bold`}
          >
            <p className="w-1/4 sm:w-1/6">Marca</p>
            <p className="w-1/6 hidden sm:flex">Modelo</p>
            <p className="w-1/6 hidden sm:flex">Tipo de unidad</p>
            <p className="w-1/6 hidden sm:flex">Año</p>
            <p className="w-1/4 sm:w-1/6">Patente</p>
            <p className="w-1/4 sm:w-1/6">Kms</p>
            <div
              className={`md:flex w-1/4 sm:w-1/6 justify-left ${
                customClasses ? "absolute top-24 right-10 sm:relative sm:top-0 sm:right-0" : ""
              }`}
            >
              <button
                onClick={handleToogleSearch}
                className={`py-1 md:flex sm:w-24  text-xs sm:py-4  sm:px-1 text-center hover:bg-blue-50 hover:text-white rounded-md ${
                  customClasses ? "" : "hidden"
                }`}
              >{`Ver Alertas${toogleSearch ? "  -" : "  +"}`}</button>
            </div>
            <div className="flex w-1/8 sm:w-1/6 gap-4 items-center">
              <FiEdit className="hover:cursor-pointer invisible" />
              <ImBin2 className="invisible" />
            </div>{" "}
          </div>
          {fullVehicles.length > 0 &&!toogleLoader ? (
            sortByAlphabeth(fullVehicles)?.map((item, index) => (
              <>
                <div
                  key={index}
                  className={`flex gap-8 ${
                    customClasses ? "text-left sm:text-center" : ""
                  } text-center md:text-left md:text-md items-center  sm:border rounded-md px-2 py-2 bg-white lg:py-auto`}
                >
                  <p className="w-1/4 sm:w-1/6">{item.marca}</p>
                  <p className="w-1/6 hidden sm:flex">{item.modelo}</p>
                  <p className="w-1/6 hidden sm:flex">{item.tipoDeUnidad}</p>
                  <p className="w-1/6 hidden sm:flex">{item.año}</p>
                  <p className="w-1/4 text-xs sm:w-1/6">{item.patente}</p>{" "}
                  <p className="w-1/4 sm:w-1/6">{item.kilometraje ? item?.kilometraje : 0}</p>
                  <p className="hidden md:flex w-1/3 sm:w-1/6">
                    {item.alertas ? Object.entries(item.alertas).length : 0}
                  </p>
                  <div className={`flex w-1/8 sm:w-1/6 gap-4 items-center ${customClasses ? "invisible" : ""}`}>
                    <FiEdit
                      onClick={() =>
                        navigate("/addVehicle", {
                          state: { action: "edit", item },
                        })
                      }
                      className="hover:cursor-pointer"
                    />
                    <ImBin2
                      className="hidden md:flex hover:cursor-pointer"
                      onClick={() => removeVehicle("vehiculos", item.id)}
                    />
                  </div>{" "}
                </div>
                {toogleSearch && (
                  <div className="bg-white rounded-md">
                    <CurrentAlert
                      vehiculo={item}
                      toogleSearch={toogleSearch}
                      alertas={item.alertas}
                      alertasSeteadas={item.alertasSeteadas}
                    />
                  </div>
                )}
              </>
            ))
          ) : (
            <p className="text-center pt-4">No se encontraron vehiculos</p>
          )}
        </div>
        <Button
          action={() =>
            navigate("/addVehicle", {
              state: {
                action: "add",
                item: null,
              },
            })
          }
          text="Agregar Vehiculo"
          customClass={`text-center ${customClasses ? "hidden" : ""}`}
        />
      </div>
    </div>
  );
};

export default VehiclesPanel;
