import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Products({ onAddToCart }) {
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