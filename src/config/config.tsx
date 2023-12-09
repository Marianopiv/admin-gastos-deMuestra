export const rubros = [
  "bateria",
  "combustible",
  "cubiertas/llantas",
  "concesionario",
  "chapista",
  "electricista",
  "gasista",
  "lavadero",
  "mecanico",
  "otros",
];

export const filters = [
  "marca",
  "modelo",
  "patente",
  "fechas",
  "rubro",
  "subRubro",
  "medioPago",
];
export const mediosDePago = [
  "efectivo",
  "cheque",
  "mercado pago",
  "tarjeta de credito",
  "tarjeta de debito",
  "transferencia",
];

export const expenseModel = {
  marca: "",
  modelo: "",
  fecha: "",
  rubro: "",
  kilometraje: 0,
  precio: 0,
  empresa: "",
  observaciones: "",
  patente: "",
  medioPago: "",
  banco: "",
  subRubro: "",
  numero: 0,
  idVehiculo: "",
};

export const vehicleModel = {
  marca: "",
  modelo: "",
  tipoDeUnidad: "",
  año: "",
  color: "",
  patente: "",
  kilometraje: "",
};

export const expenseAuto = {
  0: "",
  1: "marca",
  2: "modelo",
  3: "patente",
  4: "fecha",
  5: "rubro",
  6: "subRubro",
  7: "KM",
  8: "precio",
  9: "empresa",
  10: "observaciones",
  11: "medios de pago",
};

export const tarjetas = ["visa", "mastercard", "amex"];

export const bancos = ["galicia", "bbva"];

export const updateList = [
  "Agregado medio de pago,efectivo/tarjeta/cheque/mercadoPago. Si elijo cheque de que banco y numero de cheque",
  "Diseño en horizontal para que ocupe menos y pueda ver todo.",
  "Muestra el comentario y medios de pago, si es largo comentario agranda al hacer hover.",
  "Usuario que ingresó el gasto figura en ingresa.",
  "tamaño de fuente de los gastos en tamaño escritorio.",
  " Al eliminar, antes de darle confirmar al eliminar, marco en rojo cual voy a eliminar.",
  "Registro de eliminados y dados de baja.",
  "Agregado adjuntar archivos imágenes o pdf, etc.",
  "Exportacion de Excel con los filtros que tengo en mi sistema.",
];

export const subCubiertas = [
  "alineacion",
  "alineacion_rotación_balanceo",
  "balanceo",
  "compra",
  "reparacion",
  "rotacion",
  "rotacion_y_balanceo",
];
export const subConcesionario = ["service", "otros"];

export const subElectricista = ["bateria", "bujia_y/o_cables", "otros"];

export const subMecanico = [
  "aceite_agregado",
  "aceite_y_filtros_cambio-_service_x_km",
  "aire_acondicionado",
  "amortiguador",
  "bujias_y/o_cables",
  "calefaccion",
  "frenos_disco_rectificacion",
  "frenos_disco_cambio_x_nuevo",
  "frenos_cinta",
  "frenos_pastillas",
  "fluidos/liquidos",
  "inyeccion",
  "manguera",
  "mano_de_obra",
  "motor_distribucion",
  "motor_otros",
  "otros",
  "radiador",
  "scanner",
  "tren_delantero_bujes_extremos_otros",
  "tren_trasero",
];

export const subRubrosTotales = [
  "aceite_agregado",
  "aceite_y_filtros_cambio_service_x_km",
  "aire_acondicionado",
  "alineacion",
  "alineacion_rotación_balanceo",
  "amortiguador",
  "balanceo",
  "bateria",
  "bujias_y/o_cables",
  "calefaccion",
  "compra",
  "frenos_disco _rectificacion",
  "frenos_disco_cambio_x_nuevo",
  "frenos_cinta",
  "frenos_pastillas",
  "fluidos/liquidos",
  "inyeccion",
  "manguera",
  "mano_de_obra",
  "motor_distribucion",
  "motor_otros",
  "otros",
  "radiador",
  "reparacion",
  "rotacion",
  "rotacion_y_balanceo",
  "scanner",
  "service",
  "tren_delantero_bujes_extremos_otros",
  "tren_trasero",
];

export const pageNumbers = [20, 40, 80];

//Modificar a todos rubros y subrubros con guiones bajo, terminar alertas el vier
