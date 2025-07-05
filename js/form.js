document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const token = "8127761848:AAFBEcLNzS0mnI9eSi0r6JY6JmcTtQnxGSQ";
    const chat_id = "7804834224";
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const comment = document.getElementById("comment").value.trim();
    const message = `
<b>Нова заявка з сайту 4home</b>
👤 Ім’я: ${name}
📞 Телефон: ${phone}
📧 Email: ${email || "Не вказано"}
📝 Коментар: ${comment || "Без коментаря"}
    `;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chat_id,
          text: message,
          parse_mode: "HTML"
        })
      });

      if (response.ok) {
        alert("Заявку надіслано успішно!");
        document.getElementById("contact-form").reset();
      } else {
        alert("Сталася помилка при надсиланні. Спробуйте ще раз.");
      }
    } catch (error) {
      console.error("Помилка:", error);
      alert("Не вдалося надіслати заявку.");
    }
  });