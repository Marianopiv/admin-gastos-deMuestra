import * as XLSX from "xlsx";
import { Expenses } from "../interfaces/interfaces";

const useExcel = () => {
  function exportToExcel(data: Expenses[]) {
    const dataWithoutUnwantedColumns = data.map(expense => {
      const { id, auto, idVehiculo, ...rest } = expense;
      return rest;
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataWithoutUnwantedColumns);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Listado");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);

    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }

    const blob = new Blob([buf], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "listado.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  }
  return { exportToExcel };
};

export default useExcel;
