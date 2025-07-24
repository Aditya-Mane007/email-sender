const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
const cron = require("node-cron");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

const emails = ["thingsrandom966@gmail.com", "maneaditya006@gmail.com"];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmail = async (email) => {
  const emailHtml = `
  <p>Dear sir/madam,</p>
  
  <p>I hope this message finds you well.</p>
  
  <p>
    My name is <strong>Aditya Ashok Mane</strong>, and I am writing to express my interest in any suitable openings in your organization for the role of a React.js, Next.js Developer, or Frontend Developer.
  </p>
  
  <p>
    I have completed my graduation in Bachelor of Science in Information Technology from Nirmala Memorial Foundation College, Kandivali (Mumbai). Most recently, I completed an internship at Oneroof Technologies where I worked as a React.js Developer. During my internship, I had the opportunity to contribute to live projects and strengthen my technical skills, including React.js, Next.js, Git, Bitbucket, and basic SEO.
  </p>
  
  <p>
    I have attached my resume for your review. I would be grateful for the opportunity to discuss any potential roles you might have that align with my skills and interests.
  </p>
  
  <p>
    Thank you for your time and consideration. I look forward to hearing from you.
  </p>
  
  <p>
    Warm regards,<br>
    <strong>Aditya Ashok Mane</strong><br>
    📧 Email: <a href="mailto:adityamane27023@gmail.com">adityamane27023@gmail.com</a><br>
    📱 Phone: +91 9326549507<br>
    🌐 GitHub: <a href="https://github.com/Aditya-Mane007" target="_blank" rel="noopener noreferrer">github.com/Aditya-Mane007</a><br>
    🔗 LinkedIn: <a href="https://www.linkedin.com/in/aditya-mane-73ab47359/" target="_blank" rel="noopener noreferrer">linkedin.com/in/aditya-mane-73ab47359/</a>
  </p>
`;

  const res = await transporter.sendMail({
    from: `Aditya Ashok Mane <${process.env.APP_USER}>`,
    to: email,
    subject: "Application for React.js Developer / Frontend Developer Position",
    html: emailHtml,
    attachments: {
      filename: "ADITYA_MANE_RESUME",
      path: path.join(__dirname, "public", "ADITYA_MANE_RESUME.pdf"),
      contentType: "application/pdf",
    },
  });

  console.log(res);
};

cron.schedule(
  "0 15 17 * * 1-5",
  async () => {
    for (email of emails) {
      try {
        const res = await sendEmail(email);
        console.log(`Email sent to ${email}:`);
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
      }
    }
  },
  {
    timezone: "Asia/Kolkata",
  }
);

setInterval(() => {
  const date = new Date();
  const dateAndTime = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  console.log(dateAndTime);
}, 1000);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`.blue.underline);
});
