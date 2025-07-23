🧠 LocalChat – Full Stack AI Chat Application
LocalChat is a lightweight, full-stack conversational AI chat app built using React, Node.js, Express, and PostgreSQL, integrated with local LLMs (Ollama + Mistral). Inspired by ChatGPT’s clean UI and dynamic behavior, this project demonstrates how to build an intelligent, self-hosted chat platform with rich frontend interaction and modular backend design.

🚀 Features Implemented
✅ Dynamic Chat List: Chats update instantly without needing to reload the page.

✅ Auto Chat Titles: First user prompt automatically sets the chat title like ChatGPT.

✅ Assistant Typing Indicator: Real-time “Assistant is typing...” shown while LLM is responding.

✅ Rename / Delete Chats: Users can rename and delete conversations with backend persistence.

✅ Keyboard Shortcuts:

Enter: Send message

Shift + Enter: New line

Esc: Clear input

✅ LLM Backend: Integrated with Ollama running Mistral for fast, local AI responses.

🛠️ Tech Stack
Layer	Tech Used
Frontend	React.js, Tailwind CSS
Backend	Node.js, Express.js
Database	PostgreSQL
LLM Engine	Ollama with Mistral
Styling	Tailwind CSS
Versioning	Git + GitHub

🖼️ UI Screenshots
Chat UI
<img width="1606" height="778" alt="image" src="https://github.com/user-attachments/assets/1b2877e3-c8bb-4a26-8098-f2ee2a354713" />

Typing feature
<img width="1373" height="397" alt="image" src="https://github.com/user-attachments/assets/2ca971c2-39da-4583-99a8-f6f62ee746ff" />

Update Delete 
<img width="854" height="837" alt="image" src="https://github.com/user-attachments/assets/f16ae7c4-84cc-48bb-814a-6e529fca9254" />

Backend Server 
<img width="930" height="129" alt="image" src="https://github.com/user-attachments/assets/dfd886d8-9399-4009-84c9-397492c919de" />

Database 
<img width="1035" height="450" alt="image" src="https://github.com/user-attachments/assets/913c3262-0fac-4bc7-9bd0-78e81639af21" />

⚠️ Challenges Faced
Ollama Model Limitation: Initially used LLaMA2 via Ollama, but due to slow response and load issues, we switched to the faster Mistral model.

Dynamic Frontend State: Ensuring newly created chats update immediately in the sidebar required careful React state management.

Localhost API Proxying: Dealt with CORS and proxy settings between frontend (React) and backend (Express).

Chat Title Auto-generation: Made sure the title only sets after the first assistant response.

📦 Getting Started

# Backend Setup
cd localchat-backend
npm install
node app.js

# Frontend Setup
cd localchat-frontend
npm install
npm start
Make sure Ollama is installed and Mistral model is running:


ollama run mistral
📁 Project Structure

├── localchat-frontend
│   ├── components/
│   ├── App.js
│   └── ...
├── localchat-backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── app.js
└── README.md

<img width="255" height="271" alt="image" src="https://github.com/user-attachments/assets/bc3ca108-cb59-4dff-960e-9037ce4e4e4f" />


Working Video :-

https://youtu.be/WAE0RUA_JkE

## 🔮 Future Work

- ⚡ **LLM Latency Optimization**  
  Explore better deployment strategies (Docker, GPU support, etc.) to improve response times.

- 💅 **UI Enhancements**  
  - Responsive design  
  - Animations and skeleton loading  
  - Better mobile support  
  - Error modals / toast notifications

- 🔁 **Retry Failed Messages Feature**  
  Will allow users to click "Retry" on failed message attempts.

- 📝 **Conversation Export**  
  Export chats as `.txt` or `.pdf` (planned).

🤝 Credits
Built with ❤️ using Open Source tools

Powered by Ollama & Mistral

UI inspired by ChatGPT
