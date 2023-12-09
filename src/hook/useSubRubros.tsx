import { useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider";
import { RubrosFetched } from "../interfaces/interfaces";

const useSubRubros = () => {
  const { rubros } = useContext(GlobalContext);
  const toogleSub = (rubro: string) => {
    let filtrado: RubrosFetched | undefined = rubros.find((item) => item.rubro === rubro);
    if (filtrado?.subRubro) {
      return Object.values(filtrado.subRubro).map((sub: string | number) => sub);
    } else {
      return;
    }
  };

  return { toogleSub };
};

export default useSubRubros;
