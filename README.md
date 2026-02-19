# Chesa Dental Care - Sales Dashboard (SAP B1 Simulation)

A premium, production-grade Sales Dashboard built with a modern full-stack architecture, simulating real-world SAP Business One data flows for dental equipment sales.

---

## Architecture Stack

The project follows a decoupled, scalable architecture designed for high performance and maintainability.

### Frontend (React + Material UI)
- **Deep Black Aesthetic**: A custom theme using Pure Black (#050505) and Dental Cyan (#00D1FF) accents.
- **Glassmorphism**: High-quality blur effects for a modern medical-tech feel.
- **Responsive-First**: Seamless transition from desktop tables to mobile-optimized card layouts.
- **RTK Query**: Efficient state management and data fetching.

### Backend (Node.js + Express MVC)
- **MVC Structure**: Decoupled Controllers, Models, Routes, and Middleware for clean code.
- **Defensive API**: Sanitized pagination and query parameters.
- **SAP Integrity**: Mock data follows authentic SAP Business One schemas.

### Redis Caching (Elite Engine)
- **Cache-Aside Pattern**: The application queries Redis first, only hitting the "database" on a miss.
- **Key Normalization**: 
  - Alphabetically sorted query parameters.
  - Case-normalized search terms.
  - This ensures `?search=Chesa` and `?search=chesa` hit the same cache entry.
- **Uniform 300s TTL**: 5-minute expiration period for balanced data freshness.

---

## Quick Start: Running Locally

Follow these steps to get the dashboard running on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/pappukrs/sales-dashboard-chesa-dental-care.git
cd sales-dashboard-chesa-dental-care
```

### 2. Run with Docker Compose
Use the local development configuration which includes live-reload volumes:
```bash
docker compose -f docker-compose.local.yml up --build
```

### 3. Access the Dashboard
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api/orders](http://localhost:5000/api/orders)

---


Built for Chesa Dental Care.
