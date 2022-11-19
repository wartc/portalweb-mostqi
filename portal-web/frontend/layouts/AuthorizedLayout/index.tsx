import { FaAddressCard, FaUserPlus, FaUsers } from "react-icons/fa";

import styles from "./AuthorizedLayout.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

const AuthorizedLayout = ({ children }: { children: React.ReactNode }) => {
  const { push, pathname } = useRouter();
  const { user } = useAuth();

  console.log(user?.type); // todo: render different menu items based on user type

  return (
    <div className={styles.container}>
      <nav className={styles.sideNavigation}>
        <ul className={styles.sideNavigationList}>
          <li
            className={`${styles.sideNavigationListItem} ${
              pathname === "/clients" ? styles.selected : ""
            }`}
            onClick={() => push("/clients")}
          >
            <FaUsers size="2em" />
            <span className={styles.itemLink}>Clientes</span>
          </li>
          <li
            className={`${styles.sideNavigationListItem} ${
              pathname === "/clients/new" ? styles.selected : ""
            }`}
            onClick={() => push("/clients/new")}
          >
            <FaUserPlus size="2em" />
            <span className={styles.itemLink}>Novo cliente</span>
          </li>

          <li
            className={`${styles.sideNavigationListItem} ${
              pathname === "/profile" ? styles.selected : ""
            }`}
            onClick={() => push("/profile")}
          >
            <FaAddressCard size="2em" />
            <span className={styles.itemLink}>Perfil</span>
          </li>
        </ul>
      </nav>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AuthorizedLayout;
