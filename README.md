# Kinderloop Application

## Prerequisites

- AWS Account
- Node.js installed
- Docker installed
- Docker Hub account

## Running the App Locally

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd /path/to/kinderloop/frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm run dev
    ```

    The frontend will run on `http://localhost:5173`.

### Backend

1. Navigate to the backend directory:
    ```bash
    cd /path/to/kinderloop/backend
    ```

2. Create a `.env` file with the following content:
    ```env
    MONGODB_URI=mongodb://localhost:27017/mydatabase
    JWT_SECRET=your_jwt_secret
    AWS_SECRET_KEY_ID=
    AWS_SECRET_ACCESS_KEY
    S3_BUCKET_NAME=
    AWS_REGION=
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```

    The backend will run on `http://localhost:5000`.

### MongoDB

1. Run MongoDB as a container:
    ```bash
    docker pull akhilmittal510/mykinder_database:latest
    docker run --name mongodb -d -p 27017:27017 akhilmittal510/mykinder_database:latest
    ```

2. Access MongoDB shell:
    ```bash
    docker exec -it mongodb mongo
    ```

3. Create the database:
    ```javascript
    use mydatabase
    ```

## Running the App with Docker

### Create a Docker Network

1. Create a Docker network:
    ```bash
    docker network create kinderloop-network
    ```

### Frontend Container

1. Pull the frontend image:
    ```bash
    docker pull akhilmittal510/kinderloop_frontend:latest
    ```

2. Run the frontend container:
    ```bash
    docker run --name kinderloop_frontend --network kinderloop-network -p 5173:5173 -d akhilmittal510/kinderloop_frontend:latest
    ```

### Backend Container

1. Pull the backend image:
    ```bash
    docker pull akhilmittal510/kinderloop_backend:latest
    ```

2. Run the backend container:
    ```bash
    docker run -d --name kinder_app_backend -p 5000:5000 --env-file .env --network kinderloop-network akhilmittal510/kinderloop_backend:latest akhilmittal510/kinderloop_backend:latest
    ```

### MongoDB Container

1. Run MongoDB container:
    ```bash
    docker run --name mongodb --network kinderloop-network -d -p 27017:27017 akhilmittal510/mykinder_database:latest
    ```

2. Access MongoDB shell:
    ```bash
    docker exec -it mongodb mongo
    ```

3. Create the database:
    ```javascript
    use mydatabase
    ```

## Summary

- Ensure all containers are running and connected to the `kinderloop-network`.
- Access the frontend at `http://localhost:5173`.
- The frontend will communicate with the backend at `http://localhost:5000`.
- The backend will connect to MongoDB at `mongodb://mongodb:27017/mydatabase`.
