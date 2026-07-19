import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function fetchProducts() {
      const snapshot = await getDocs(collection(db, "products"));
      const items = snapshot.docs.map(function (doc) {
        return { ...doc.data(), firestoreId: doc.id };
      });
      setProducts(items);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main>
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main>
      <section>
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.map(function (product) {
            return (
              <ProductCard
                key={product.firestoreId}
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