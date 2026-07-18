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
      </section>
    </main>
  );
}

export default Contact;