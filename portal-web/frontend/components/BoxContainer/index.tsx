import styles from "./BoxContainer.module.scss";

const BoxContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.boxContainer}>{children}</div>;
};

export default BoxContainer;
