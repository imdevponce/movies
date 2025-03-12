const Footer: React.FC = () => {
  return (
    <footer
      className="bg-gray-800 text-white text-center p-4 mt-auto"
      role="contentinfo"
      aria-label="Movie website footer"
    >
      <p>&copy; {new Date().getFullYear()} Developed by Ismael Ponce</p>
    </footer>
  );
};

export default Footer;
