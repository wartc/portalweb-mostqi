import { FaAddressCard, FaChevronLeft, FaChevronRight, FaUserPlus, FaUsers } from "react-icons/fa";

import styles from "./AuthorizedLayout.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsClockHistory } from "react-icons/bs";

const AuthorizedLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { push, pathname } = useRouter();
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <nav className={styles.sideNavigation}>
        <ul className={styles.sideNavigationList}>
          <li
            className={`${styles.sideNavigationListItem} ${
              /\/clients(?!(\/new)|(\/history))/.test(pathname) ? styles.selected : ""
            }`}
            onClick={() => push("/clients")}
          >
            <FaUsers size="1.5em" style={{ minWidth: "1.5em" }} />
            {!isMinimized ? <span className={styles.itemLink}>Clientes</span> : null}
          </li>

          <li
            className={`${styles.sideNavigationListItem} ${
              pathname === "/clients/history" ? styles.selected : ""
            }`}
            onClick={() => push("/clients/history")}
          >
            <BsClockHistory size="1.5em" style={{ minWidth: "1.5em" }} />
            {!isMinimized ? <span className={styles.itemLink}>Histórico</span> : null}
          </li>

          <li
            className={`${styles.sideNavigationListItem} ${
              pathname === "/clients/new" ? styles.selected : ""
            }`}
            onClick={() => push("/clients/new")}
          >
            <FaUserPlus size="1.5em" style={{ minWidth: "1.5em" }} />
            {!isMinimized ? <span className={styles.itemLink}>Novo cliente</span> : null}
          </li>

          <li
            className={`${styles.sideNavigationListItem} ${
              pathname === "/profile" ? styles.selected : ""
            }`}
            onClick={() => push("/profile")}
          >
            <FaAddressCard size="1.5em" style={{ minWidth: "1.5em" }} />
            {!isMinimized ? <span className={styles.itemLink}>Perfil</span> : null}
          </li>

          <li className={styles.minimize} onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? (
              <FaChevronRight size="1.15em" style={{ minWidth: "1.5em" }} />
            ) : (
              <FaChevronLeft size="1.15em" style={{ minWidth: "1.5em" }} />
            )}
          </li>
        </ul>
      </nav>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AuthorizedLayout;
