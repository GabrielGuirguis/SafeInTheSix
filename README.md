# <a target="_blank" href="https://safe-in-the-six.vercel.app/">SafeInTheSix</a>

A full-stack application that integrates public safety data (crime reports, police calls, weather alerts, etc.) into an interactive mapping experience.  
Users can explore safety insights via a **Google Maps heatmap** and view detailed events through a **sidebar panel**.

---

## 🚀 Project Overview

This project aims to streamline access to public safety information by integrating real-time and historical data sources into a single, map-based interface.  
The application consists of:

- **Frontend (React + Vite + @vis.gl/react-google-maps)**
  - Interactive Google Maps heatmap
  - Sidebar for exploring nearby crimes or police calls
  - Toggle navigation between data layers (`Crimes`, `Calls`)
  - Context-driven state management for selections

- **Backend (Express + Node.js + TypeScript)**
  - REST API for querying public safety data
  - PostGIS queries for spatial searches
  - Redis caching for frequent queries
  - Supabase/Postgres as the main datastore

- **Data Ingestion**
  - AWS Lambda functions fetch and insert new data (e.g., Toronto Open Data, ArcGIS services)
  - AWS EventBridge schedules periodic ingestion (e.g., every 15 minutes)
  - Data normalized and stored in Postgres

Check it out! https://safe-in-the-six.vercel.app/
