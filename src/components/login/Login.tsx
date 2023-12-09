import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import useAuth from "../../hook/useAuth";
import truck from "../../assets/truck.jpeg";
import { FaLock, FaSpinner } from "react-icons/fa";
import { updateList } from "../../config/config";
import ButtonTransparent from "../../UI/ButtonTransparent";

const Login = () => {
  const { handleAuth, navigate } = useContext(GlobalContext);
  const { handleUserInfo, login, setToogleVersion, userLog, toogleVersion } =
    useAuth();
  const [errors, setErrors] = useState("");
  const [toogleLoader, setToogleLoader] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setToogleLoader(true);
    e.preventDefault();
    setErrors("");
    try {
      await login(userLog.email, userLog.password);
      handleAuth(userLog.email);
      setToogleLoader(false);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      let string = error.message;
      let index = string.indexOf(":");
      let cleanedString = string.slice(index + 1);
      setToogleLoader(false);
      setErrors(cleanedString);
    }
  };
  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/2 h-screen hidden md:flex">
        <img className="h-screen object-cover" src={truck} alt="truck" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-10 justify-evenly mt-10 text-center md:w-1/2"
      >
        <div className="text-left text-sm absolute right-6 top-6">
          <p
            className="font-bold hover:cursor-pointer"
            onMouseLeave={() => setToogleVersion(!toogleVersion)}
            onMouseEnter={() => setToogleVersion(!toogleVersion)}
          >
            v1.1
          </p>
          {toogleVersion && (
            <ul className="absolute right-1 sm:right-6 list-disc z-40 bg-amber-100 px-6 py-2">
              <p>Actualizaciones con version 1.1:</p>
              {updateList.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-full">
            <FaLock className="text-white bg-blue-50" />
          </div>
          <h1 className="text-xl">Inicia sesión</h1>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-black text-start" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleUserInfo}
              className="p-2 rounded-md border border-black dark:bg-white dark:text-black"
              type="email"
              name="email"
              placeholder="youremail@pivo.com"
              id=""
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black text-start" htmlFor="password">
              Contraseña
            </label>{" "}
            <input
              onChange={handleUserInfo}
              className="p-2 rounded-md border border-black dark:bg-white dark:text-black"
              type="password"
              name="password"
              id="password"
              placeholder="******"
            />{" "}
          </div>
          {errors && <p className="text-red-500 uppercase text-xs">{errors}</p>}
          {toogleLoader ? (
            <div className="mx-auto">
              <ButtonTransparent
                customClass="mx-auto p-3 rounded-md w-52 mt-8"
                Icon={FaSpinner}
                text="Cargando"
                action={() => ""}
              />
            </div>
          ) : (
            <button className="bg-blue-50 mx-auto p-3 rounded-md text-white w-52 mt-8">
              Inicia Sesion
            </button>
          )}
        </div>
        <p>Copyright Admin-gastos© 2023.</p>
      </form>
    </div>
  );
};

export default Login;
