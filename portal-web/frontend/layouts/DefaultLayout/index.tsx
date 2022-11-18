import styles from "./DefaultLayout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
