import { BiTrash } from "react-icons/bi";
import { FullVehicles } from "../../interfaces/interfaces";
import { useState, useEffect } from "react";
import useVehicles from "../../hook/useVehicles";
import { sortAlerts } from "../../helper";

type Props = {
  alertas: any;
  alertasSeteadas: any;
  toogleSearch: boolean;
  vehiculo: FullVehicles;
};

const CurrentAlert = ({ vehiculo, alertas, alertasSeteadas, toogleSearch }: Props) => {
  const { updateVehicle } = useVehicles();
  const [temporalVehicle, setTemporalVehicle] = useState(vehiculo);
  const [wantToRemoveAlert, setWantToRemoveAlert] = useState(false);

  const removeAlert = (alertId: string, settedAlert: boolean) => {
    setTemporalVehicle((prevEditVehicle: any) => {
      const updatedAlertas = Object.entries(settedAlert ? prevEditVehicle?.alertasSeteadas : prevEditVehicle?.alertas)
        .filter(([key]) => key !== alertId)
        .reduce((obj: any, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      if (settedAlert)
        return {
          ...prevEditVehicle,
          alertasSeteadas: updatedAlertas,
        };
      if (!settedAlert)
        return {
          ...prevEditVehicle,
          alertas: updatedAlertas,
        };
    });
    setWantToRemoveAlert(true);
  };
  const handleUpdateVehicle = (vehicleId: string, coleccion: string, vehicle: FullVehicles, notClose: boolean) => {
    updateVehicle(vehicleId, coleccion, vehicle, notClose);
    setWantToRemoveAlert(false);
  };

  useEffect(() => {
    if (wantToRemoveAlert) {
      console.log("entro en el if")
      handleUpdateVehicle(temporalVehicle.id, "vehiculos", temporalVehicle, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantToRemoveAlert]);

  useEffect(() => {
    setTemporalVehicle(vehiculo)
  }, [vehiculo])
  

  //Esto es ayuda para vos: Mira como en este codigo, destructuraste tu item como [key,value] para no tener que acceder con las posiciones item[0] e item[1], directamente utilizas key y value destructurado en el codigo como vas a ver en las sucesivas lineas
  return (
    <div className="flex w-full p-1">
      <div className="flex flex-col w-1/2 justify-between gap-2 text-sm px-4">
        <h1 className="font-bold">Estado de Alertas</h1>
        {toogleSearch &&
          sortAlerts(Object.entries(alertas)).map(([key, value]: [string, number], index: number) => {
            return (
              <>
                <div className="flex justify-between gap-2 text-sm items-center" key={index}>
                  <div className={`capitalize flex gap-2 ${value > 0 ? "text-green-700" : "text-red-500"}`}>
                    <p className="font-bold">{key}:</p>
                    <p>
                      {" "}
                      {value > 0 ? "restan" : "te pasaste"} {value < 0 ? value * -1 : value} km
                    </p>
                    <BiTrash
                      onClick={() => removeAlert(key, false)}
                      className="text-black my-auto hover:cursor-pointer"
                    />
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <div className="flex flex-col w-1/2 justify-between   gap-2 text-sm px-4">
        <h1 className="font-bold">Alertas Seteadas</h1>
        {alertasSeteadas &&
          sortAlerts(Object.entries(alertasSeteadas)).map(([key, value]: [string, number], index: number) => (
            <div className="flex gap-2  text-sm">
              {" "}
              <p className="capitalize">{key}</p>
              <p>{value}</p>
              <BiTrash onClick={() => removeAlert(key, true)} className="text-black my-auto hover:cursor-pointer" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrentAlert;
