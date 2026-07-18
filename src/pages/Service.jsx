import { useState } from "react";

const faqResponses = [
  {
    keywords: ["flash", "flashing", "software", "update"],
    answer:
      "We offer phone flashing and software updates for most Android and iPhone models. Bring your device to our shop or message us on WhatsApp for pricing.",
  },
  {
    keywords: ["frp", "bypass", "unlock", "unlocking"],
    answer:
      "We provide FRP bypass and iPhone unlocking services. Please note we may require proof of ownership before unlocking any device.",
  },
  {
    keywords: ["data", "recovery", "recover", "lost files"],
    answer:
      "Our data recovery service can help retrieve lost photos, contacts, and files from phones, laptops, and storage devices.",
  },
  {
    keywords: ["laptop", "repair", "fix", "broken"],
    answer:
      "We repair laptops including screen replacement, keyboard issues, battery problems, and software troubleshooting.",
  },
  {
    keywords: ["price", "cost", "how much"],
    answer:
      "Pricing depends on the device and issue. Message us on WhatsApp with your device model for an accurate quote.",
  },
  {
    keywords: ["hours", "open", "time", "location", "where"],
    answer:
      "Contact us on WhatsApp for our current hours and location details.",
  },
];

const defaultAnswer =
  "Thanks for your question! For anything specific, please message us directly on WhatsApp and our team will respond shortly.";

function getAutoReply(message) {
  const lower = message.toLowerCase();
  const match = faqResponses.find(function (faq) {
    return faq.keywords.some(function (keyword) {
      return lower.includes(keyword);
    });
  });
  return match ? match.answer : defaultAnswer;
}

function Services() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! Ask me about our services, pricing, or repairs.",
    },
  ]);
  const [input, setInput] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botReply = { sender: "bot", text: getAutoReply(input) };

    setMessages(function (prev) {
      return [...prev, userMessage, botReply];
    });
    setInput("");
  }

  return (
    <main>
      <section>
        <h2>Our Services</h2>
        <ul>
          <li>Phone Flashing & Software Updates</li>
          <li>FRP Bypass & iPhone Unlocking</li>
          <li>Data Recovery</li>
          <li>Laptop Repair</li>
        </ul>
      </section>

      <section>
        <h3>Have a Question?</h3>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            maxWidth: "400px",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            {messages.map(function (msg, index) {
              return (
                <p
                  key={index}
                  style={{
                    textAlign: msg.sender === "user" ? "right" : "left",
                  }}
                >
                  <strong>{msg.sender === "user" ? "You" : "SirRivTech"}:</strong>{" "}
                  {msg.text}
                </p>
              );
            })}
          </div>

          <form onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={function (e) {
                setInput(e.target.value);
              }}
              placeholder="Type your question..."
              style={{ width: "70%" }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Services;