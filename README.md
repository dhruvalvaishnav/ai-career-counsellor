# 🤖 AI-Powered Career Counsellor

> **Event-driven microservices platform** that delivers real-time, personalized career recommendations based on student aptitude tests - built with Java Spring Boot, Apache Kafka, ReactJS, and deployed on AWS.

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)](https://kafka.apache.org)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF)](https://www.typescriptlang.org)
[![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

---

## 🎯 Problem & Solution

**Problem:** Students lack personalized career guidance tailored to their actual strengths and aptitude.

**Solution:** An AI-driven platform that ingests aptitude test results, processes them through an event-driven recommendation engine, and returns ranked, personalized career suggestions in real time — with minimal latency and high reliability.

---

## 🏗️ Architecture

```
┌─────────────┐     HTTP      ┌──────────────────┐
│  React.js   │ ─────────────▶│  API Gateway /   │
│  Frontend   │               │  Spring Boot      │
└─────────────┘               └────────┬─────────┘
                                        │ Kafka Producer
                                        ▼
                               ┌─────────────────┐
                               │  Apache Kafka   │
                               │  (aptitude-topic)│
                               └────────┬────────┘
                                        │ Kafka Consumer
                                        ▼
                               ┌─────────────────┐
                               │ Recommendation  │
                               │ Engine Service  │
                               └────────┬────────┘
                                        │
                               ┌────────▼────────┐
                               │   AWS RDS       │
                               │   (MySQL)       │
                               └─────────────────┘
```

**Key design decisions:**
- **Stateless microservices** - horizontally scalable, no shared state
- **Kafka for async processing** - test submission is non-blocking, results delivered via event stream
- **Redis caching** - frequently requested recommendation results cached for low latency
- **AWS EC2 / ECS** - containerized deployment with auto-scaling

---

## ✨ Features

- 📝 **Aptitude Test Intake** - Students submit test results via REST API
- ⚡ **Real-time Streaming** - Kafka producers publish results instantly to processing topics
- 🧠 **AI Recommendation Engine** - Kafka consumers process events and generate ranked career suggestions
- 📊 **Personalized Results** - Tailored career paths returned based on aptitude profile
- 🔄 **Async & Non-blocking** - High throughput, low-latency event-driven flow
- ☁️ **Cloud-native** - AWS deployment with RDS, EC2/ECS, and Redis

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot 3.x, Spring Kafka |
| Frontend | ReactJS |
| Messaging | Apache Kafka |
| Database | MySQL (AWS RDS) |
| Caching | Redis |
| Containerization | Docker |
| Cloud | AWS (EC2/ECS, RDS, S3) |
| Build | Maven |

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Docker & Docker Compose
- Node.js 18+ (for frontend)
- Maven 3.6+

### Run with Docker Compose

```bash
# Clone the repository
git clone https://github.com/dhruvalvaishnav/ai-career-counsellor.git
cd ai-career-counsellor

# Start Kafka, Zookeeper, and the backend
docker-compose up --build

# Backend runs on: http://localhost:8080
# Kafka UI (if enabled): http://localhost:9000
```

### Run Backend Locally

```bash
cd backend
mvn spring-boot:run
```

### API Endpoints

```
POST /api/aptitude/submit     → Submit aptitude test results
GET  /api/recommendations/{id} → Get career recommendations by student ID
GET  /api/health               → Health check
```

---

## 📁 Project Structure

```
ai-career-counsellor/
├── backend/
│   ├── src/main/java/
│   │   ├── producer/        # Kafka producers (aptitude test ingestion)
│   │   ├── consumer/        # Kafka consumers (recommendation processing)
│   │   ├── service/         # Recommendation engine logic
│   │   ├── controller/      # REST API layer
│   │   └── model/           # Domain entities
│   └── pom.xml
├── frontend/                # ReactJS app (in progress)
├── docker-compose.yml
└── README.md
```

---

## 🗺️ Roadmap

- [x] Spring Boot Kafka Producer for aptitude test ingestion
- [x] Kafka Consumer for recommendation processing
- [x] REST API layer
- [ ] ReactJS frontend (in progress)
- [ ] Redis caching layer
- [ ] AWS deployment scripts
- [ ] AI/ML model integration for smarter recommendations

---

## 👨‍💻 Author

**Dhruval Vaishnav** - Senior Backend Engineer | Java · Kafka · Distributed Systems

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/dhruvalvaishnav)
[![Medium](https://img.shields.io/badge/Medium-Follow-12100E?style=for-the-badge&logo=medium)](https://medium.com/@vdhruval)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-0A66C2?style=for-the-badge&logo=google-chrome)](https://dhruvalvaishnav.github.io/dhruvalvaishnav/)

---

⭐ Star this repo if you find the architecture interesting!
