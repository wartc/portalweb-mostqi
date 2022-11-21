import Loading from "../Loading";

import styles from "./LoadingPage.module.scss";

const LoadingPage = () => {
  return (
    <div className={styles.loadingContainer}>
      <Loading visible={true} />
    </div>
  );
};

export default LoadingPage;
