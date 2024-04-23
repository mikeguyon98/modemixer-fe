import Header from "./components/Header";
import CollectionCard from "./components/CollectionCard";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center container mx-auto border h-screen pt-2">
        <Hero />
      </div>
    </>
  );
}

export default App;
