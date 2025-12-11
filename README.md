<h1 align="center">✨ Lumen Translate ✨</h1>

A fast, intuitive, and multilingual text translation tool powered by modern frontend architecture and a robust Python backend. Translate text across languages with clarity, speed, and a clean user experience.


## 🚀 **Tech Stack**

### **Frontend**
- ⚛️ Solid.js – high-performance reactive UI framework
- 🎨 Kobalte UI – accessible and customizable UI components
- ⚡ Vite – lightning-fast bundler & dev server
- 🎭 Lucide Icons – clean and lightweight icon set

### **Backend**
- 🐍 Python
- 🚀 FastAPI – high-performance async API framework
- 🌐 deep_translator – translation engine wrapper


---
  
## 📌 **Key Features**
- 🌎 Translate between 100+ languages using deep_translator
- ⚡ Fast, reactive UI powered by Solid.js
- 🎨 Modern, clean design using Kobalte UI
- 📱 Responsive layout optimized for all screen sizes
- 🔌 Dedicated Python FastAPI backend for reliable translations

---

## ▶️ **How It Works**
- The user enters text into the input field.
- User selects source and target languages using Kobalte Select.
- Frontend triggers backend API
- FastAPI uses deep_translator
- The response is displayed instantly in a clean, readable UI.

---

## ⚙️ **Installation & Setup**
```sh

1. Clone the repository
git clone https://github.com/your-username/lumen-translate.git
cd lumen-translate

2. Frontend Setup
cd frontend
npm install

Create a .env file in /frontend:
VITE_API_BASE_URL = http://localhost:8000 (backend server url)

Run the frontend:
npm run dev

3. Backend Setup (Python + FastAPI)
cd backend

Create a virtual environment:
python -m venv venv

Activate it:
for Windows - venv\Scripts\activate
for Mac/Linux - source venv/bin/activate

Install dependencies:
pip install -r requirements.txt

Run the backend with FastAPI server:
python main.py 
OR
uvicorn main:app --reload --port 8000

```

---
