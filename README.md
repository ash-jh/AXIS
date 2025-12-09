# Bridge Structural Health Monitoring Dashboard

## Overview
The **Bridge Structural Health Monitoring Dashboard** is a modern, responsive web application designed to monitor the structural health of bridges using vibration and sensor data. It allows engineers, researchers, and maintenance personnel to upload CSV datasets, automatically analyze key metrics, visualize trends, detect anomalies, and generate comprehensive PDF reports.

The dashboard emphasizes usability and clarity, making it accessible for non-technical users.

---

## Features

### 1. CSV Upload
- Drag-and-drop or click-to-upload functionality.
- Automatic column detection and validation.
- Checks for numeric values and missing data.
- Displays a preview of the uploaded dataset.

### 2. Data Processing & Analysis
- Computes key bridge health metrics:
  - **RMS (Root Mean Square)** vibration
  - **Peak** vibration events
  - **Frequency spectrum (FFT)**
  - Trend analysis
  - **Anomaly detection** using z-scores
- Provides a **bridge condition indicator**: Normal, Needs Attention, or Critical.
- Shows real-time processing messages and loading indicators.

### 3. Visualization
- **Vibration vs Time** line chart.
- **Frequency spectrum** line chart for detecting dominant vibration frequencies.
- Highlights detected anomalies with indices and amplitude values.
- Interactive charts with selectable columns for analysis.

### 4. Report Generation
- Generates **PDF reports** summarizing:
  - Bridge metadata
  - Key statistics (RMS, Peak, anomalies)
  - Graph snapshots (Vibration and Frequency spectrum)
  - Overall bridge health assessment
- Reports can be exported directly from the dashboard.

### 5. Quick Actions
- Re-run analysis on the uploaded dataset.
- Clear the dashboard to start a new analysis.

---
