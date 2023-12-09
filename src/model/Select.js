const Select = ({ rubros, filterByRubro }) => {
    return (
      <select onChange={filterByRubro}>
        <option value="">selecciona</option>
        {rubros.map((rubro) => (
          <option>{rubro}</option>
        ))}
      </select>
    );
  };
  export default Select;
  