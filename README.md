# Trading Dashboard Project

This is a simple project I built to show a live trading dashboard. It uses a React frontend to show stock prices and a Node.js backend to send out those price updates in real-time.

## How to Run This (No Docker Needed)

You do NOT need to use Docker for this project. I designed it to run directly on your computer using Node.js.

### 1. Start the Backend
- Open your terminal and go into the `backend` folder.
- Run `npm install` to get the packages.
- Run `npm start` to start the server.
- The server runs on **port 4000**.

### 2. Start the Frontend
- Open a second terminal window and go into the `frontend` folder.
- Run `npm install`.
- Run `npm run dev`.
- Follow the link in the terminal (`http://localhost:5173`) to see the dashboard.

---

## 🧪 Testing the Code

I included some tests to make sure the math and the API links are working as they should. I used **Jest** for these tests.

**To run the tests:**
1. Go into the `backend` folder.
2. Type `npm test`.

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