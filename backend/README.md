# Prashanthi Vidyalaya - Backend API

FastAPI-based backend for admission form management and admin dashboard.

## Features

- ✅ Admission application submission
- ✅ Admin login system
- ✅ Application management dashboard
- ✅ CSV export functionality
- ✅ CORS enabled for frontend integration
- ✅ SQLite (development) / PostgreSQL (production) support

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Server

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### 1. Submit Application
**POST** `/apply`

```json
{
  "student_name": "John Doe",
  "parent_name": "Jane Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "class_applied": "5th"
}
```

### 2. Admin Login
**POST** `/admin/login`

Default credentials:
- Username: `admin`
- Password: `admin123`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### 3. Get All Applications
**GET** `/applications`

Returns array of all applications.

### 4. Export to CSV
**GET** `/applications/export`

Downloads applications data as CSV file.

### 5. Health Check
**GET** `/health`

Returns API health status.

## Database

### Development (SQLite)
Database file: `applications.db` (auto-created)

### Production (PostgreSQL)

Update `DATABASE_URL` in `main.py`:

```python
DATABASE_URL = "postgresql://username:password@localhost:5432/prashanthi"
```

Then run the server.

## Project Structure

```
backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
└── applications.db      # SQLite database (auto-created)
```

## CORS Configuration

Currently allows all origins. For production, update:

```python
allow_origins=["https://yourdomain.com"]
```

## Troubleshooting

### Port 8000 already in use
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### Database locked error (SQLite)
Remove `applications.db` and restart server.

## Notes

- Admin credentials in `main.py` are for demonstration only
- For production, use environment variables and proper authentication
- Consider using JWT tokens for better security
- Add request validation and rate limiting for production

---

**Last Updated**: April 2026
