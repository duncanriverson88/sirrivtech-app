function Cart({ cart, setCart }) {
  let total = 0;
  cart.forEach(function (item) {
    total += item.price * item.quantity;
  });

  function removeItem(id) {
    setCart(cart.filter(function (item) {
      return item.id !== id;
    }));
  }

  return (
    <main>
      <section>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map(function (item) {
              return (
                <div key={item.id}>
                  {item.name} x{item.quantity} — GH₵ {item.price * item.quantity}
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              );
            })}
            <p><strong>Total: GH₵ {total.toLocaleString()}</strong></p>
          </>
        )}
      </section>
    </main>
  );
}

export default Cart;