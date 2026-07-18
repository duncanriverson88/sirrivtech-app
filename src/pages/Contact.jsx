function Contact() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Thank you! We will contact you soon.");
  }

  return (
    <main>
      <section>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" required />
          <label>Phone:</label>
          <input type="tel" required />
          <label>Message:</label>
          <textarea rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>

       <a href="https://wa.me/233241035109" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" width="20" height="20" /><button type="button">Chat on WhatsApp</button></a>
      </section>
    </main>
  );
}

export default Contact;