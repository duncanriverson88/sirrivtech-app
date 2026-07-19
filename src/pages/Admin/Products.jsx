import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
  inStock: true,
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  async function fetchProducts() {
    const snapshot = await getDocs(collection(db, "products"));
    const items = snapshot.docs.map(function (docSnap) {
      return { ...docSnap.data(), firestoreId: docSnap.id };
    });
    setProducts(items);
    setLoading(false);
  }

  useEffect(function () {
    fetchProducts();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(function (prev) {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price),
    };

    if (editingId) {
      const productRef = doc(db, "products", editingId);
      await updateDoc(productRef, productData);
    } else {
      await addDoc(collection(db, "products"), productData);
    }

    setForm(emptyForm);
    setEditingId(null);
    fetchProducts();
  }

  function handleEdit(product) {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      inStock: product.inStock,
    });
    setEditingId(product.firestoreId);
  }

  async function handleDelete(firestoreId) {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    await deleteDoc(doc(db, "products", firestoreId));

    if (editingId === firestoreId) {
      setForm(emptyForm);
      setEditingId(null);
    }

    fetchProducts();
  }

  function handleCancelEdit() {
    setForm(emptyForm);
    setEditingId(null);
  }

  if (loading) {
    return (
      <main>
        <p>Loading products...</p>
      </main>
    );
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
              <tr key={product.firestoreId}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>GHS {product.price}</td>
                <td>{product.inStock ? "Yes" : "No"}</td>
                <td>
                  <button onClick={function () { handleEdit(product); }}>
                    Edit
                  </button>
                  <button onClick={function () { handleDelete(product.firestoreId); }}>
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