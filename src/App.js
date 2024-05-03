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
import { createContext, useState } from "react";

export const AppStateContext = createContext();

function App() {
  const [data, setData] = useState([]);

  return (
    <AppStateContext.Provider value={{ data, setData }}>
      <StickyNavbar>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/collections" element={<ExploreCollections />} /> */}
          <Route path="collections" element={<Collections />} />

          <Route path="/collections" element={<Collections />} />

          <Route path="/collections/:id" element={<Items />} />
          {/* <Route path="/collections/items/id:" element={<ItemCard />} /> */}
          <Route path="/collections/:id/items" element={<ItemDetails />} />

          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/collections" element={<AdminCollections />} />
          <Route
            path="admin/generate_collection"
            element={<GenerateCollection />}
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </StickyNavbar>
    </AppStateContext.Provider>
  );
}

export default App;
