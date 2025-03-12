import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Nav />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
