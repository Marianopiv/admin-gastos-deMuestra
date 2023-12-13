import { useEffect,useContext } from "react";
import AlertPanel from "../alertPanel/AlertPanel";

import useVehicles from "../../hook/useVehicles";
import VehiclesPanel from "../vehiclesPanel/VehiclesPanel";
import { GlobalContext } from "../../context/GlobalProvider";

const ManageAlerts = () => {
  const { updateMultipleVehicles } = useVehicles();
  const { selectedVehicles,handleSelectedVehicles,handleUpdateCars,updateCars,handleChange,handleSetSelected } = useContext(GlobalContext);

  useEffect(() => {
    if (updateCars) {
      updateMultipleVehicles(selectedVehicles);
      handleSelectedVehicles()
    }
    handleUpdateCars()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCars]);

  return (
    <>
      <div className="flex w-screen justify-center gap-4 flex-wrap">
        <div className="">
          <VehiclesPanel customClasses={true} />
        </div>
        <div className="mt-14">
          <div className="">
            <AlertPanel
              handleChange={handleChange}
              handleSetSelected={handleSetSelected}
              handleEditVehicle={() => ""}
              handleAddAlert={() => ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAlerts;
