import styles from "./Table.module.scss";

type TableProps<T> = {
  data: T[];
  columns: {
    key: string;
    title: string;
    render?: (value: T) => React.ReactNode;
  }[];
};

export default function Table<T extends { [key: string]: any }>({ data, columns }: TableProps<T>) {
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
          <tr key={i}>
            {columns.map((col, j) => (
              <td key={j}>{col.render ? col.render(item) : item[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
