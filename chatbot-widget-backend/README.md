# Chatbot Widget - Backend

## Features
- **FastAPI** for the Python backend API.
- **SQLModel** for the Python SQL database interactions (ORM).
- **Pydantic**, used by FastAPI, for the data validation and settings management.
- **SQLite** as the SQL database.
- JWT (JSON Web Token) authentication.
- Tests with **Pytest**.


## How To Use
To run the backend for this widget, follow the below steps:

1. Clone this repository
2. Run a Python virtual environment in the chatbot-widget-backend directory from a terminal. This can be done by running the below. (Note: Python version 3.9 or higher is required)
    1. `brew install virtualenv`
    2. `virtualenv venv`
3. Install requirements by running `pip install -r requirements.txt`
4. Setup a local db with some default data by running `./prestart.sh`
5. Lastly, run `fastapi run` to start the backend server


Note: SQLite is required to run this app but should already be installed on Mac OS.

## Testing
Unit tests can be run by using `pytest`

Swagger docs: http://127.0.0.1:8000/docs
