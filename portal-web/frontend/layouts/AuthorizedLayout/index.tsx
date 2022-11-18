import { FaAddressCard, FaUserPlus, FaUsers } from "react-icons/fa";
import Link from "next/link";

import styles from "./AuthorizedLayout.module.scss";
import { useAuth } from "../../contexts/AuthContext";

const AuthorizedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  console.log(user!.type); // todo: render different menu items based on user type

  return (
    <div className={styles.container}>
      <nav className={styles.sideNavigation}>
        <ul className={styles.sideNavigationList}>
          <li className={`${styles.sideNavigationListItem} ${styles.selected}`}>
            <FaUsers size="2em" />
            <Link className={styles.itemLink} href="/clients">
              Clientes
            </Link>
          </li>
          <li className={styles.sideNavigationListItem}>
            <FaUserPlus size="2em" />
            <Link className={styles.itemLink} href="/clients/new">
              Novo cliente
            </Link>
          </li>

          <li className={styles.sideNavigationListItem}>
            <FaAddressCard size="2em" />
            <Link className={styles.itemLink} href="/profile">
              Perfil
            </Link>
          </li>
        </ul>
      </nav>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AuthorizedLayout;
