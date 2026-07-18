function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>GHS {product.price}</p>
      <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
      <button
        onClick={function () {
          onAddToCart(product);
        }}
        disabled={!product.inStock}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;