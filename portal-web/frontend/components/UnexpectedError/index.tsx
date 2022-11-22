import styles from "./UnexpectedError.module.scss";

const UnexpectedError = () => (
  <div className={styles.errorContainer}>
    <h1>Um erro inesperado ocorreu 😞</h1>
    <p>Por favor, tente recarregar esta página.</p>
  </div>
);

export default UnexpectedError;
