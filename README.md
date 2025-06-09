# Full-Stack Task Management Application

A complete task management application built with a React.js frontend and a Node.js/Express.js backend. The application allows users to view and filter a list of tasks fetched from a proxied external API.


## Tech Stack

-   **Frontend:** React.js
-   **Backend:** Node.js, Express.js
-   **HTTP Client:** Axios


---

## Installation and Local Setup

Follow these steps to run the application on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or later recommended)
-   npm (comes with Node.js)
-   Git

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YourUsername/your-repo-name.git
    cd your-repo-name
    ```

2.  **Set up the Backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **Set up the Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

---

## Running the Application Locally

You need to run the backend and frontend servers in **two separate terminals**.

1.  **Start the Backend Server:**
    -   Navigate to the `backend` directory.
    -   Run the command:
    ```bash
    npm start
    ```
    The backend will be running on `http://localhost:5001`.

2.  **Start the Frontend Server:**
    -   Navigate to the `frontend` directory.
    -   Run the command:
    ```bash
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.
