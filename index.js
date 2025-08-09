const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
const cron = require("node-cron");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const emails = [
  // "hr@promodome.in",
  // "hire-me@gophygital.io",
  // "info@graymatrix.com",
  // "contact@amagi.io",
  // "info@insigniacom.com",
  // "mumbai@inkincaps.com",
  // "hr@bondsindia.com",
  // "careers@locobuzz.com",
  // "careers@fabstudio.co",
  // "info@qpsit.com",
  // "info@parashifttech.com",
  // "joinus@crimsoni.com",
  // "careers@digitaledgetech.in",
  // "hrd@esoftech.com",
  "maneaditya006@gmail.com",
  "thingsrandom966@gmail.com",
];

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
    attachments: [
      {
        filename: "ADITYA_MANE_RESUME",
        path: path.join(__dirname, "public", "ADITYA_MANE_RESUME.pdf"),
        contentType: "application/pdf",
      },
    ],
  });
};

app.get("/", (req, res) => {
  return res.json({
    message: "This email server for sending daily emails to recruiters.",
  });
});

cron.schedule(
  "0 15 19 * * *",
  async () => {
    for (let email of emails) {
      try {
        await sendEmail(email);
        console.log(`Email sent to ${email}`);
      } catch (error) {
        console.error(`Failed to send email to ${email} :`, error);
      }
    }
  },
  {
    timezone: "Asia/Kolkata",
  }
);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

cron.schedule(
  "10 * * * * *",
  async () => {
    const res = await fetch(process.env.APP_DOMAIN + "/health");
    const data = await res.json();
    console.log("Message From Server : ", data && data.message);
  },
  {
    timezone: "Asia/Kolkata",
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue.underline);
});
