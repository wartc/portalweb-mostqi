import styles from "./Input.module.scss";

type InputProps = {
  label: string;
  fluid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ fluid, label, ...props }: InputProps) => {
  return (
    <div className={`${styles.container} ${fluid ? styles.fluid : ""}`}>
      <label className={styles.inputLabel}>{label}</label>
      <input className={styles.input} {...props} />
    </div>
  );
};

export default Input;
