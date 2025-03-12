import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav
      className="bg-gray-200 p-4 flex gap-4 sticky top-[56px] z-40 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <Link to="/" className="text-blue-600" aria-label="Go to Home page">
        Home
      </Link>
    </nav>
  );
};

export default Nav;
