import { useState } from "react";

const useLoader = () => {
  const [toogleLoader, setToogleLoader] = useState<boolean>(false);

  const handleToogleLoader = () => {
    setToogleLoader(!toogleLoader);
  };
  return { toogleLoader, handleToogleLoader };
};

export default useLoader;
