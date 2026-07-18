import { useState, useEffect } from "react";
import { products as defaultProducts } from "../../data/products";

function loadProducts() {
  const saved = localStorage.getItem("products");
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultProducts;
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

const emptyForm = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
  inStock: true,
};

function AdminProducts() {
  const [products, setProducts] = useState(loadProducts);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(function () {
    saveProducts(products);
  }, [products]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(function (prev) {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      setProducts(function (prev) {
        return prev.map(function (p) {
          if (p.id === editingId) {
            return { ...form, id: editingId, price: Number(form.price) };
          }
          return p;
        });
      });
      setEditingId(null);
    } else {
      const newProduct = {
        ...form,
        id: Date.now(),
        price: Number(form.price),
      };
      setProducts(function (prev) {
        return [...prev, newProduct];
      });
    }

    setForm(emptyForm);
  }

  function handleEdit(product) {
    setForm(product);
    setEditingId(product.id);
  }

  function handleDelete(id) {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;
    setProducts(function (prev) {
      return prev.filter(function (p) {
        return p.id !== id;
      });
    });
    if (editingId === id) {
      setForm(emptyForm);
      setEditingId(null);
    }
  }

  function handleCancelEdit() {
    setForm(emptyForm);
    setEditingId(null);
  }

  return (
    <main>
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>

        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>
        </div>

        <button type="submit">
          {editingId ? "Save Changes" : "Add Product"}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <h3>Existing Products</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(function (product) {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>GHS {product.price}</td>
                <td>{product.inStock ? "Yes" : "No"}</td>
                <td>
                  <button onClick={function () { handleEdit(product); }}>
                    Edit
                  </button>
                  <button onClick={function () { handleDelete(product.id); }}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default AdminProducts;