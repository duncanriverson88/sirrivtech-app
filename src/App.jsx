import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart(function (prev) {
      const existing = prev.find(function (item) {
        return item.id === product.id;
      });
      if (existing) {
        return prev.map(function (item) {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products onAddToCart={addToCart} />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
     <Route path="/admin" element={<Dashboard />} />
<Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

