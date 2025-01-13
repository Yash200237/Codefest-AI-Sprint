# SmartFoodie Sales Consultant Assistant

## Description
SmartFoodie is a robust full-stack application with a Next.jsfrontend and a FastAPI backend, designed to serve the needs of sales consultants. By incorporating cutting-edge technologies such as Generative AI, Natural Language Processing (NLP), and data science, our solution offers advanced and tailored services. This integration ensures that sales consultants have the tools they need for enhanced productivity and personalized client interactions.  

## Prerequisites

Before you begin, ensure you have the following installed:
* Node.js and npm (for frontend)
* Python (version 3.10-3.12)
* Rust and Cargo (To ensure transformers installation is error free)
* Git

## Backend Setup

### 1. Verify Rust Installation
```bash
rustc --version
cargo --version
```

### 2. Set Up Python Environment
Navigate to the backend directory and create a virtual environment:
```bash
cd Backend
python -m venv venv
```

### 3. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Unix or MacOS:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install fastapi uvicorn scikit-learn joblib pandas xgboost torch transformers
pip install mysql-connector-python sqlalchemy databases
pip install passlib[bcrypt] 
```

### 5. Run Backend Server
```bash
uvicorn app:app --reload
```
*The backend server will start at `http://localhost:8000`*

### Note for Windows Users
If you encounter "Running scripts is disabled" error, run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
*The frontend will be available at `http://localhost:3000`*

## Development Setup

### VS Code Configuration
1. Open the project in VS Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (MacOS)
3. Select "Python: Select Interpreter"
4. Choose the interpreter from virtual environment:
   * **Windows:** `Backend\venv\Scripts\python.exe`
   * **Unix/MacOS:** `Backend/venv/bin/python`

## Project Structure
```
/
├── Backend/
│   ├── app.py
│   ├── requirements.txt
│   └── [other backend files]
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── package.json
│   └── [other frontend files]
└── README.md
```

## Available Scripts

### Backend
```bash
uvicorn app:app --reload  # Start development server
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```
