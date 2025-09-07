import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.heroSection}>
      <h1 className={styles.title}>Welcome to Tech Task</h1>
      <p className={styles.subtitle}>
        Manage users and posts efficiently with our modern dashboard
      </p>

      <div className={styles.buttons}>
        <Link className={`${styles.link} ${styles.primary}`} to="/users">
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default Hero;
