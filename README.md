# 🌿 EcoStats

EcoStats is a web application that provides sustainability insights about companies and industries. Users can search for a company and retrieve summarized environmental and social impact data.

## 🚀 Features

- **Company Sustainability Search**: Enter a company or industry name to fetch sustainability data.
- **AI-Powered Summarization**: Uses OpenAI to generate concise summaries of sustainability initiatives.
- **Supabase Database**: Retrieves company sustainability statistics dynamically.
- **Modern UI**: Built with React, Tailwind CSS, and React Typed animations.
- **Backend API**: Express.js server handles data requests and summarization.

## 📂 Project Structure

```
.
├── server               # Backend (Express.js + OpenAI)
│   ├── server.js       # API endpoints
├── src                 # Frontend (React.js)
│   ├── components
│   │   ├── Search.jsx  # Search bar component
│   │   ├── Results.jsx # Display results and summary
│   ├── App.js         # React Router setup
├── public              # Static assets
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # Project documentation
```

## 🔧 Setup & Installation

### 1️⃣ Clone the repository

```sh
git clone https://github.com/your-username/ecostats.git
cd ecostats
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in the root directory and add:

```ini
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key
PORT=5001
```

### 4️⃣ Start the backend server

```sh
cd server
node server.js
```

### 5️⃣ Start the frontend

```sh
npm start
```

The frontend will be available at `http://localhost:3000`, and the backend runs on `http://localhost:5001`.

## 🌍 Deployment

### **Frontend (React.js)**

Use **Vercel** or **Netlify**:

```sh
npm run build
```

Deploy the `build` folder to a hosting provider.

### **Backend (Express.js)**

Use **Railway**, **Render**, or **Heroku** for hosting.

## 🛠 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, OpenAI API
- **Database:** Supabase (PostgreSQL)

## 🔒 Security Considerations

- **Do not expose API keys.** Always use environment variables.
- **Enable CORS restrictions** in production.
- **Validate user input** to prevent malicious queries.

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Submit a pull request

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

For inquiries or contributions, contact [j.wang19@student.vu.nl] or create an issue in the repository.

---

🌱 **EcoStats** – Empowering sustainability through data! 🌎
