import { StickyNavbar } from "./components/StickyNavbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Admin from "./pages/Admin";
import AdminSettings from "./pages/AdminSettings";
import AdminCollections from "./pages/AdminCollections";
import GenerateCollection from "./pages/GenerateCollection";
import Items from "./pages/Items";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <StickyNavbar>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/collections" element={<ExploreCollections />} /> */}

        <Route path="/collections" element={<Collections />} />

        <Route path="/collections/:title/:id" element={<Items />} />
        {/* <Route path="/collections/items/id:" element={<ItemCard />} /> */}
        <Route
          path="/collections/:title/:id/:item_id"
          element={<ItemDetails />}
        />

        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/collections" element={<AdminCollections />} />
        <Route
          path="admin/generate_collection"
          element={<GenerateCollection />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </StickyNavbar>
  );
}

export default App;
