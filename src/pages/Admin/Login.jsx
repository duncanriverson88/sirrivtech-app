import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then(function () {
        navigate("/admin");
      })
      .catch(function () {
        setError("Invalid email or password.");
      });
  }

  return (
    <main>
      <section style={{ maxWidth: "400px" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={function (e) {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={function (e) {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Log In</button>
        </form>
      </section>
    </main>
  );
}

export default Login;