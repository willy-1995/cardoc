# 🚗 digiTour (cardoc) 

CarDoc is a modern, web-based solution for legally compliant digital mileage logging. The application is specifically engineered to meet strict tax authority requirements for data integrity and audit-readiness.

[![Platform - Web](https://img.shields.io/badge/Platform-Web-blue?style=flat-square)](#)
[![Security - Audit--Ready](https://img.shields.io/badge/Security-Audit--Ready-green?style=flat-square)](#)
[![Stack - Docker](https://img.shields.io/badge/Stack-Docker-0db7ed?style=flat-square)](#)

TRY: 
(https://cardoc.infinityfree.me/)

## 🌟 Key Features
- **Tax Compliance:** Designed to follow the principles of timely and closed-loop logging required by tax authorities (e.g., German "Finanzamt").
- **Tamper-Proof Logging:** Integrated audit trail that documents any modifications to trip data, ensuring full transparency.
- **PDF Export:** Generate tax-ready PDF reports instantly using the `dompdf` engine.
- **Vehicle Management:** Centralized management for multiple company and private vehicles.

## 🛠 Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), JavaScript |
| **Backend** | PHP 8.x |
| **Database** | MySQL |
| **Infrastructure** | Docker, Docker Compose |
| **Reporting** | dompdf |
| **Deployment** | infinityfree |

## 🏗 System Architecture
The application is fully containerized using **Docker** for maximum portability and ease of deployment. The React frontend communicates via a REST API with the PHP backend, which manages secure data persistence in the MySQL database.



## 🚦 Quick Start (Docker)

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/cardoc.git](https://github.com/your-username/cardoc.git)
   cd cardoc
