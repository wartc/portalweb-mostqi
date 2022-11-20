import styles from "./Table.module.scss";

type TableProps<T> = {
  data: T[];
  columns: {
    key: string;
    title: string;
    render?: (item: T) => React.ReactNode;
  }[];
  onRowClick?: (item: T) => void;
};

export default function Table<T extends { [key: string]: any }>({
  data,
  columns,
  onRowClick,
}: TableProps<T>) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} onClick={() => (onRowClick ? onRowClick(item) : null)}>
            {columns.map((col, j) => (
              <td key={j}>{col.render ? col.render(item) : item[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
