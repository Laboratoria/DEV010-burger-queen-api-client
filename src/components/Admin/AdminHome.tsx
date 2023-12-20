import { Link } from "react-router-dom";
import Header from "../Header/Header";
import productsImg from "../../assets/ProductsImg.png"
import workersImg from "../../assets/usersImg.png"

const AdminHome = () => {
  return (
    <section className="admin-home">
      <Header />
      <main className="adminHomeSection">
          <Link to={"/admin/workerList"}>
            <button className="adminHomeButton">
              <img src= {workersImg} alt="Trabajadores" className="adminHomeImg"/>
              Trabajadores</button>
          </Link>
          <Link to={"/admin/adminProducts"}>
            <button className="adminHomeButton">
            <img src= {productsImg} alt="Trabajadores" className="adminHomeImg"/>
              Productos</button>
          </Link>
      </main>
    </section>
  );
};

export default AdminHome;
