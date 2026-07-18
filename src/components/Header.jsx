import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>SirRivTech</h1>
      <p className="tagline">Your trusted tech shop in Ghana</p>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;