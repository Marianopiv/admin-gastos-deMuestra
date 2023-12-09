import { BiPlus } from "react-icons/bi";
import { sortByAlphabethSubRubro } from "../../helper";
import { Rubros, RubrosFetched } from "../../interfaces/interfaces";
import useRubros from "../../hook/useRubros";
import { IoChevronDownCircleSharp, IoChevronUpCircleSharp } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
  handleToogleSubRubro: (obj: Rubros) => void;
  obj: RubrosFetched;
  index: number;
};

const RubrosSub = ({ handleToogleSubRubro, obj, index }: Props) => {
  const { handleToogleSub, removeRubro, removeSubRubro, toogleSubRubro } = useRubros();
  return (
    <div
      key={index}
      className={` ${toogleSubRubro ? "border-b-0" : "border"} flex flex-col rounded-md items-center justify-between border border-blue-50 p-4 h-44 relative`}
    >
      <div className="text-left">
        <div className="flex ">
          <p>Rubro:</p>
          <div className="flex">
            <p className="font-bold capitalize">{obj.rubro}</p>
            <button
              onClick={() => removeRubro("rubros", obj)}
              className={`rounded-full    px-1 py-0 absolute text-xs right-1 top-1 text-white bg-blue-50 hover:bg-red-600`}
            >
              X
            </button>
          </div>
        </div>
        {obj.subRubro && (
          <div className="bg-white z-50">
            SubRubros:
            {toogleSubRubro
              ? sortByAlphabethSubRubro(Object.values(obj.subRubro)).map((subRubro,index) => (
                  <div key={index} className="flex items-center gap-1">
                    {" "}
                    <li>{subRubro}</li>
                    <AiOutlineCloseCircle
                      onClick={() => removeSubRubro(obj.id, obj, subRubro)}
                      className="rounded-full hover:cursor-pointer hover:bg-red-600"
                    />
                  </div>
                ))
              : sortByAlphabethSubRubro(Object.values(obj.subRubro))
                  .slice(0, 1)
                  .map((subRubro) => (
                    <div className="flex relative items-center gap-1">
                      {" "}
                      <li>{subRubro}</li>
                      <AiOutlineCloseCircle
                        onClick={() => removeSubRubro(obj.id, obj, subRubro)}
                        className="rounded-full hover:cursor-pointer hover:bg-red-600"
                      />
                    </div>
                  ))}
          </div>
        )}
      </div>
      {(Object.values(obj.subRubro ? Object.values(obj.subRubro) : []) ?? []).length > 1 &&
        (toogleSubRubro ? (
          <div className="flex text-xs items-center hover:cursor-pointer" onClick={handleToogleSub}>
            {" "}
            <p>Ver Menos</p>
            <IoChevronUpCircleSharp />
          </div>
        ) : (
          <div className="flex text-xs items-center hover:cursor-pointer" onClick={handleToogleSub}>
            <p>Ver mas</p>
            <IoChevronDownCircleSharp />
          </div>
        ))}
      <button
        onClick={() => handleToogleSubRubro(obj)}
        className={`border border-black h-10 w-36 text-xs px-2 py-2 rounded-md hover:cursor-pointer hover:bg-blue-50 hover:text-white flex gap-2 items-center`}
      >
        <BiPlus className={`hover:cursor-pointer hover:text-white`} />
        <div className={``}>{"Agregar Subrubro"}</div>
      </button>
    </div>
  );
};

export default RubrosSub;
