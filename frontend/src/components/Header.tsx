const Header: React.FC = () => {
  return (
    <header
      className="bg-blue-500 text-white text-center p-4 sticky top-0 z-50 shadow-md"
      role="banner"
      aria-label="Movie website header"
    >
      <h1 tabIndex={0}>Movies</h1>
    </header>
  );
};

export default Header;
