import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <Link className={styles.logoLink} to="/">
        <div className={styles.logoContainer}>
          <img
            src="https://davinciboardgame.com/wp-content/uploads/2023/01/Hy8uge6SCowHNV4QUwQ1_abBLok08iS03jz2W.png"
            alt="Logo"
            className={styles.logoImage}
          />
        </div>
      </Link>

      {location.pathname !== "/" && (
        <div className={styles.menu}>
          <nav className={styles.navigation}>
            <Link
              className={`${styles.link} ${
                location.pathname === "/users" ? styles.active : ""
              }`}
              to="/users"
            >
              Users
            </Link>
            <Link
              className={`${styles.link} ${
                location.pathname === "/posts" ? styles.active : ""
              }`}
              to="/posts"
            >
              Posts
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
