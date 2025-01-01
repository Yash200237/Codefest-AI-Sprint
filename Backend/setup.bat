@echo off
REM Create a virtual environment
python -m venv venv

REM Activate the virtual environment
call venv\Scripts\activate

REM Upgrade pip
python -m pip install --upgrade pip

REM Install required libraries
pip install fastapi uvicorn transformers torch pandas joblib xgboost scikit-learns

echo Setup complete! To activate the virtual environment, run 'call myenv\Scripts\activate'.
pause
