# Quick Start Guide

## 🚀 Run in 2 Steps

### Terminal 1 - Backend
```bash
cd backend
python main.py
```
Backend runs on: `http://localhost:8000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5174`

---

## 🧪 Quick Test

### Test 1: Submit Application
1. Go to http://localhost:5174
2. Click "Enroll Now" button
3. Fill form and submit
4. See success message ✅

### Test 2: Admin Dashboard
1. Go to http://localhost:5174/admin
2. Login: `admin` / `admin123`
3. See submitted applications
4. Click "Export CSV" to download

---

## 📁 Key Files

**Frontend:**
- `src/components/AdmissionModal.jsx` - Form modal
- `src/pages/AdminLogin.jsx` - Login page
- `src/pages/AdminDashboard.jsx` - Dashboard
- `src/App.jsx` - Router config

**Backend:**
- `backend/main.py` - All API endpoints

---

## 📝 Admin Credentials
- Username: `admin`
- Password: `admin123`

---

Done! Both servers running and fully tested. ✅
