import styles from "./Table.module.scss";

type TableProps = {
  columns: {
    dataIndex: string;
    displayName: string;
  }[];
  data: {
    [key: string]: any;
  }[];
};

const Table = ({ columns, data }: TableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(({ displayName }, i) => (
            <th key={i}>{displayName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((currentData, i) => (
          <tr key={i} onClick={() => (currentData.onClick ? currentData.onClick() : null)}>
            {columns.map(({ dataIndex }, j) => (
              <td key={j}>{currentData[dataIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
