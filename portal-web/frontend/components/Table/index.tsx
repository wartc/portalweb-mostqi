type TableProps = {
  columns: string[];
  data: {
    [key: string]: any;
  }[];
};

const Table = ({ columns, data }: TableProps) => {
  return (
    <table>
      <thead>
        {columns.map((col, i) => (
          <th key={i}>{col}</th>
        ))}
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col, j) => (
              <td key={j}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
