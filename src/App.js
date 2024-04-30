import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExploreCollections from "./pages/ExploreCollections";
import Collections from "./pages/Collections";
import Admin from "./pages/Admin";
import AdminSettings from "./pages/AdminSettings";
import AdminCollections from "./pages/AdminCollections";
import GenerateCollection from "./pages/GenerateCollection";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/collections" element={<ExploreCollections />} /> */}
        <Route path="/collections" element={<Collections />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/collections" element={<AdminCollections />} />
        <Route path="admin/generate_collection" element={<GenerateCollection />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
