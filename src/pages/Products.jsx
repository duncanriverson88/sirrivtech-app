import { products as defaultProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

function loadProducts() {
  const saved = localStorage.getItem("products");
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultProducts;
}

function Products({ onAddToCart }) {
  const products = loadProducts();

  return (
    <main>
      <section>
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.map(function (product) {
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Products;