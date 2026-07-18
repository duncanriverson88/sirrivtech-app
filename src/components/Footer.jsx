function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} SirRivTech. All rights reserved.</p>
      <p>
        <a href="https://wa.me/233241035109" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" width="20" height="20" />
          Chat with us on WhatsApp
        </a>
      </p>
    </footer>
  );
}

export default Footer;