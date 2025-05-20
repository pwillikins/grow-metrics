# CSV Histogram API

This Node.js/Express app parses a CSV file and serves histogram data via a REST API.

## Features

- Parses a configurable CSV file on startup
- Serves histogram data through a simple HTTP API
- Modular structure using TypeScript
- Dockerized for easy deployment
- Unit test support via `npm test`

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Docker (optional, for containerized setup)

---

### Local Development

1. **Install dependencies**
   ```bash
   npm install
2. **Run Tests**
   ```bash
   npm test
   ```

### Running with Docker
1. **Install dependencies**
   ```bash
   docker build -t grow-metrics .
2. **Running Tests**
   ```bash
   docker run -p 3000:3000 grow-metrics
   ```