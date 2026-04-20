from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, ConfigDict
from datetime import datetime
import csv
import io
from starlette.responses import StreamingResponse

# ===========================
# DATABASE CONFIGURATION
# ===========================

# Using SQLite for development (switch to PostgreSQL in production)
DATABASE_URL = "sqlite:///./applications.db"
# For PostgreSQL in production, use:
# DATABASE_URL = "postgresql://user:password@localhost/prashanthi"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    future=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ===========================
# DATABASE MODELS
# ===========================

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, index=True)
    parent_name = Column(String)
    phone = Column(String)
    email = Column(String, index=True)
    class_applied = Column(String)
    status = Column(String, default="NEW")
    created_at = Column(DateTime, default=datetime.utcnow)

# ===========================
# PYDANTIC MODELS (Schemas)
# ===========================

class ApplicationCreate(BaseModel):
    student_name: str
    parent_name: str
    phone: str
    email: str
    class_applied: str

class ApplicationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    student_name: str
    parent_name: str
    phone: str
    email: str
    class_applied: str
    status: str
    created_at: datetime

class ApplicationMessage(BaseModel):
    message: str

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminResponse(BaseModel):
    message: str
    token: str | None = None

# ===========================
# CREATE TABLES
# ===========================

Base.metadata.create_all(bind=engine)

# ===========================
# FASTAPI APP
# ===========================

app = FastAPI(
    title="Prashanthi Vidyalaya API",
    description="Admin and Admission Management API",
    version="1.0.0"
)

# ===========================
# CORS MIDDLEWARE
# ===========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===========================
# DEPENDENCY: Database Session
# ===========================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ===========================
# ADMIN CREDENTIALS (Demo)
# ===========================

ADMIN_CREDENTIALS = {
    "username": "admin",
    "password": "admin123"
}

# ===========================
# ROUTES: Admission Application
# ===========================

@app.post("/apply", response_model=ApplicationMessage)
def submit_application(
    app_data: ApplicationCreate,
    db: Session = Depends(get_db)
):
    """
    Submit a new admission application
    """
    try:
        # Create new application record
        new_app = Application(
            student_name=app_data.student_name,
            parent_name=app_data.parent_name,
            phone=app_data.phone,
            email=app_data.email,
            class_applied=app_data.class_applied,
            status="NEW"
        )
        db.add(new_app)
        db.commit()
        db.refresh(new_app)

        return {"message": "Application submitted successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# ===========================
# ROUTES: Admin Login
# ===========================

@app.post("/admin/login", response_model=AdminResponse)
def admin_login(credentials: AdminLogin):
    """
    Admin login endpoint
    """
    if (credentials.username == ADMIN_CREDENTIALS["username"] and
        credentials.password == ADMIN_CREDENTIALS["password"]):
        return {
            "message": "Login successful",
            "token": "sample_token_" + credentials.username
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

# ===========================
# ROUTES: Fetch Applications
# ===========================

@app.get("/applications", response_model=list[ApplicationResponse])
def get_applications(db: Session = Depends(get_db)):
    """
    Fetch all applications (sorted by latest first)
    """
    try:
        applications = db.query(Application).order_by(
            Application.created_at.desc()
        ).all()
        return applications
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ===========================
# ROUTES: Export CSV
# ===========================

@app.get("/applications/export")
def export_applications_csv(db: Session = Depends(get_db)):
    """
    Export all applications as CSV file
    """
    try:
        applications = db.query(Application).order_by(
            Application.created_at.desc()
        ).all()

        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)

        # Write header
        writer.writerow([
            "ID", "Student Name", "Parent Name", "Phone", "Email",
            "Class Applied", "Status", "Applied On"
        ])

        # Write rows
        for app in applications:
            writer.writerow([
                app.id,
                app.student_name,
                app.parent_name,
                app.phone,
                app.email,
                app.class_applied,
                app.status,
                app.created_at.strftime("%Y-%m-%d %H:%M:%S")
            ])

        # Return as downloadable file
        output.seek(0)
        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=applications.csv"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ===========================
# HEALTH CHECK
# ===========================

@app.get("/health")
def health_check():
    """
    Health check endpoint
    """
    return {"status": "ok", "message": "Prashanthi API is running"}

# ===========================
# ROOT
# ===========================

@app.get("/")
def read_root():
    """
    Root endpoint with API information
    """
    return {
        "name": "Prashanthi Vidyalaya API",
        "version": "1.0.0",
        "endpoints": {
            "apply": "/apply (POST)",
            "admin_login": "/admin/login (POST)",
            "applications": "/applications (GET)",
            "export": "/applications/export (GET)",
            "health": "/health (GET)"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
