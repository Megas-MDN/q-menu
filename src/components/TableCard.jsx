/* eslint-disable react/prop-types */
const TableCard = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <ul>
        {props.commands.map((el, i) => (
          <li key={i}>{JSON.stringify(el, null, 2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default TableCard;
