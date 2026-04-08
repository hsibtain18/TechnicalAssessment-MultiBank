# Trading Dashboard Project

This is a real-time trading dashboard built with a **React** frontend and a **Node.js** backend. It features live market data updates via WebSockets and secured REST APIs.

## 🔐 Security & Authentication

This project implements **JWT (JSON Web Token)** for secure communication. The system is fully configured for environment-based security.

### 🔑 Secret Key Generation
The `JWT_SECRET` used for this project was generated using the following command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

🛠️ Environment Configuration
To strictly use the environment variable for testing:

Generate a new key using the command above.

Backend Auth: In backend/src/middleware/auth.js, the code is set to pull from process.env.JWT_SECRET.

Dockerfile: Update the ENV JWT_SECRET in backend/Dockerfile.

Docker Compose: Update the JWT_SECRET value in docker-compose.yml.


## 🔐 How to run 

```bash
docker compose up --build


Access the dashboard at http://localhost:5

**What these tests check:**
* **The Math:** Makes sure the price movements stay realistic and don't break.
* **The API:** Checks that the server sends back the right data when the frontend asks for it.
* **Errors:** Confirms that the app shows a "Not Found" message if you look for a stock that doesn't exist.

---

## Important Notes

* **Node Version:** I built and tested this using **Node v20.19.2**. 
* **Database:** Since this is a coding test, I kept the data in the server's memory. This means you don't need to set up a separate database like MongoDB or SQL.
* **Live Updates:** The prices update automatically using WebSockets, so you don't need to refresh the page to see new data.

---

## Project Structure

* **Frontend:** Built with React and TypeScript. I kept the data-handling logic separate from the visual components to keep the code clean.
* **Backend:** A simple Express server that handles the "Random Walk" algorithm to mimic real market movements.