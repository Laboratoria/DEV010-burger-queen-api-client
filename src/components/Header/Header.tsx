import { useEffect, useState } from "react";
import Logo from "../../assets/burger-queen-logo.png";
import LogOut from "../../assets/log-out.png";
import Profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    // Lee el rol desde localStorage y actualiza el estado
    const role = localStorage.getItem("userRole");
    if (role) {
      setUserRole(role);
    }
  }, []);

  const navigate = useNavigate();
  const handleLoggedSession = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className="headerSection">
      <img className="logo-img" id="logo-Header" src={Logo} />
      <section className="buttonHeader">
        <button id="profile-button" className="headerButton">
          {userRole}
          <img className="button-img" id="profileImg" src={Profile} />
        </button>
        <button
          data-testid="logOut-button"
          className="headerButton"
          onClick={handleLoggedSession}
        >
          <img className="button-img" id="logOutimg" src={LogOut} />
        </button>
      </section>
    </header>
  );
};

export default Header;
