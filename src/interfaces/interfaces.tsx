import { DocumentData } from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";

export interface FullVehicles {
  id: string;
  marca: string;
  modelo: string;
  tipoDeUnidad: string;
  año: string;
  color: string;
  patente: string;
  kilometraje?: string;
  alertas: Object;
  alertasSeteadas?: Object;
}
export interface FullVehiclesModel {
  marca: string;
  modelo: string;
  tipoDeUnidad: string;
  año: string;
  color: string;
  patente: string;
  kilometraje?: string;
  alertas?: Object;
  alertasSeteadas?: Object;
}

export interface Expenses {
  id: string;
  marca: string;
  modelo: string;
  rubro: string;
  fecha: string;
  kilometraje: number;
  patente: string;
  precio: number;
  empresa: string;
  observaciones: string;
  medioPago: string;
  tarjeta?: string;
  numero?: number;
  banco?: string;
  subRubro?: string;
  file?: any;
  hora?: string;
  auto?: string;
  idVehiculo?: string;
}
export interface ExpenseSaved {
  marca: string;
  modelo: string;
  rubro: string;
  fecha: string;
  kilometraje: number;
  patente: string;
  precio: number;
  empresa: string;
  observaciones: string;
  medioPago: string;
  tarjeta?: string;
  numero?: number;
  banco?: string;
  subRubro?: string;
  file?: any;
  hora?: string;
  idVehiculo: string;
}

export interface Prices {
  desde: string;
  hasta: string;
}

export interface Target {
  name: string;
  value: string;
}

export interface Errors {
  [key: string]: any;
  marca?: string;
  modelo?: string;
  rubro?: string;
  fecha?: string;
  auto?: string;
  kilometraje?: number;
  patente?: string;
  precio?: number;
  empresa?: string;
  observaciones?: string;
  medioPago?: string;
  tarjeta?: string;
  numero?: number;
  banco?: string;
  subRubro?: string;
  file?: any;
}

export interface ExpensesDocumentData extends DocumentData {
  id: string;
  marca: string;
  modelo: string;
  rubro: string;
  fecha: string;
  kilometraje: number;
  patente: string;
  precio: number;
  empresa: string;
  observaciones: string;
  medioPago: string;
  tarjeta?: string;
  numero?: number;
  banco?: string;
  subRubro?: string;
  file?: any;
}

export interface Attached {
  lastModified: string;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
export interface Temp {
  kilometraje: number;
  alert?: number;
}

export interface AlertInterface {}

export interface Rubros {
  id: string;
  rubro: string;
}
export interface RubrosFetched {
  id: string;
  rubro: string;
  subRubro?:{
    key:number,value:string
  }
}

export interface ContextProps {
  authorization: boolean;
  currentUser: string;
  currentTotalPages: number[];
  expenses?: Expenses[];
  filterOption: string;
  fullVehicles: FullVehicles[];
  ITEMS_PER_PAGE: number;
  newAlert: {
    nombreAlerta: string;
    kilometros: string;
  };
  page: number;
  sorted: string;
  toogleFilter2: boolean;
  lastUpdateKilometer: number;
  rubros:Rubros[],
  selectedVehicles: FullVehicles[] | never[];
  updateCars: boolean;
  saveVehicle: (vehicle: any) => void;
  handleAdd: (vehicle: FullVehicles) => void;
  handleAlert: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, vehicle: FullVehicles) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (pageNumber: number) => void;
  handlePriceFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: (vehicle: FullVehicles) => void;
  handleSetFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (vehicle: FullVehicles) => boolean;
  handleSetCurrentTotalPages: (arr: Expenses[]) => void;
  handleSET_ITEM_PER_PAGE: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleToogleFilter2: () => void;
  handleResetFilter: (value: string) => void;
  handleSelectedVehicles: () => void;
  handleSetSelected: (newAlert: Object) => void;
  handleAuth: (user: string) => void;
  handleSorted: (value: string) => void;
  handleUpdateKilometer: (e: React.ChangeEvent<HTMLInputElement> | number) => void;
  handleUpdateCars: () => void;
  navigate: NavigateFunction;
  removeVehicle: (coleccion: string, id: string) => void;
  resetAlert: () => void;
  filterExpenseByDate: (date1: Date, date2: Date, subFiltro: boolean) => void;
  resetExpenses: () => void;
  sortFullExpenses: (expenses: Expenses[], option: string) => any;
}

export interface ExpensesContextProps {
  addExpense: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: Target },
  ) => void;
  handleAddFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  marcAsViewed: (coleccion: string) => void;
  saveExpense: (title: string, info: any) => void;
  removeExpense: (coleccion: string, id: string, expense: Expenses) => void;
  handleWillDelete: (e: string) => void;
  handleFilteredExpenses: (expenses: Expenses[]) => void;
  updateExpense: (id: string, title: string, info: any) => void;
  expenses: Expenses[];
  filteredExpenses: Expenses[];
  expense: ExpenseSaved;
  toogleLoader: boolean;
  willDelete: string | null;
  notifications: any[];
}
