import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav className="bg-gray-200 p-4 flex gap-4 sticky top-[56px] z-40 shadow-sm">
      <Link to="/" className="text-blue-600">
        Home
      </Link>
    </nav>
  );
};

export default Nav;
