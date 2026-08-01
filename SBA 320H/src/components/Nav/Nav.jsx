import { NavLink } from "react-router";
import styles from "./Nav.module.css";
import logoImg from "../../assets/earth.png";

function Nav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img className={styles.logoImage} src={logoImg} /> World
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/apod"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            APOD
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/earthquakes"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Earthquakes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/iss"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            ISS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mars"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Mars
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/near-earth-objects"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Near earth objects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/weather"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Weather
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
