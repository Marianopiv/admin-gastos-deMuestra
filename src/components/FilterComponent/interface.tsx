import { NavigateFunction } from "react-router-dom";
import { Expenses, FullVehicles, Target } from "../../interfaces/interfaces";

export interface IPrecios {
  filterExpenseByPrice: (desde: string, hasta: string) => void;
  filterExpenseByDate: (desde: Date, hasta: Date,subFiltro:boolean) => void;
}
export interface IRubros {
  fullVehicles?: FullVehicles[];
  option?: string;
  filterExpenseByCar?: ((selected: string) => void) | any;
  navigate: NavigateFunction;
}

export interface ITarjetas {
  editForm?: Expenses | undefined;
  option?: string;
  addExpense?: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: Target },
  ) => void;
  handleEditForm?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}
