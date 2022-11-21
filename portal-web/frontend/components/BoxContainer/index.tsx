import styles from "./BoxContainer.module.scss";

const BoxContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.boxContainer} ${className}`}>{children}</div>;
};

export default BoxContainer;
