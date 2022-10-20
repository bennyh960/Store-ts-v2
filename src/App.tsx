import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/home";
import { Store } from "./pages/store";
// import { About } from "./pages/about";
import { Navbar } from "./components/navbar/navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fruits" element={<Store section={"פירות"} />} />
            <Route path="/vegtables" element={<Store section={"ירקות"} />} />
            <Route path="/milk" element={<Store section={"חלב"} />} />
            <Route path="/cheese" element={<Store section={"גבינות"} />} />

            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
