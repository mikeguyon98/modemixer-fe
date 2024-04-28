import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExploreCollections from "./pages/ExploreCollections";
import Collections from "./pages/Collections";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/collections" element={<ExploreCollections />} /> */}
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </>
  );
}

export default App;
