import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Principals from "./pages/Principals";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/movies/:movieTitle/principals/:principalId"
            element={<Principals />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
