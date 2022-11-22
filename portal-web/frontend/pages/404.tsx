import { useRouter } from "next/router";

import styles from "../styles/404.module.scss";
import Button from "../components/Button";

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div className={styles.notFoundContainer}>
      <h1>Não encontramos a página que você está procurando 😔</h1>
      <Button secondary text="Voltar à página principal" onClick={() => router.push("/")} />
    </div>
  );
};

export default PageNotFound;
