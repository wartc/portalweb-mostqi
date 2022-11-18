import styles from "./Button.module.scss";

type ButtonProps = {
  fluid?: boolean;
  secondary?: boolean;
  text?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ fluid, secondary, text, ...props }: ButtonProps) => (
  <button
    type="button"
    className={`${styles.button}
      ${fluid ? styles.fluid : ""}
      ${secondary ? styles.secondary : ""}`}
    {...props}
  >
    {text}
  </button>
);

export default Button;