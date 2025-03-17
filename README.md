# 🌱 Eco Challenge

Eco Challenge is a web application designed to help users achieve their environmental goals by completing daily challenges. Users can select their goal and experience level, and the application will provide a list of challenges to complete.

🔗 **Live Demo:** [Eco Challenge](https://eco-challenge.netlify.app/)

🎨 **Figma Design:** [View on Figma](https://www.figma.com/design/tSYeZDUjFOZ7G8ZbRsG767/Eco-Challenge?node-id=7-510&t=5AUftirmnV0np0ku-1)

<!-- ## 📂 Project Structure -->

# 🚀 Technologies Used

### Frontend:

- HTML, CSS, JavaScript – Core technologies for UI.
- Fetch API – For making requests to the backend.

### Backend:

- Node.js & Express.js – Fast and efficient server.
- CORS – To allow frontend-backend communication.
- JSON Data Storage – Challenges are stored in JSON (No database used).

### Hosting:

- Render – Backend is deployed on Render.

# Features

- Selection of environmental goals and experience levels
- Daily challenges based on selected goals and experience levels
- Progress tracking
- Completion challenge animation
- Daily email reminders with useful tips
- Option to copy or tweet challenges on Twitter

# 🛠️ How to Run Locally

1.  Clone the repository:

    ```bash
    git clone https://github.com/SawSimonLinn/eco-challenge
    ```

2.  Install Dependencies (Backend):

    ```bash
    cd backend
    npm install
    ```

3.  Start the Backend Server:

    ```bash
    node server.js
    ```

    or if you have Nodemon:

    ```bash
    nodemon server.js
    ```

4.  Open index.html in Browser:

    ```bash
    file:///path-to-eco-challenge/index.html
    ```

    or use Live Server in VS Code.

## API Endpoints

### Get Challenges

- URL: /api/challenges
- Method: GET
- Query Parameters:

  - goal (string): The goal for which to fetch challenges.
  - level (string): The experience level for which to fetch challenges.

  ### Example Request

  ```bash
  GET /api/challenges?goal=waste-less-water&level=beginner
  ```

  ### Example Response

  ```bash
  [
    {
      "goal": "waste-less-water",
      "level": "beginner",
      "task": "Take shorter showers"
    },
    {
      "goal": "waste-less-water",
      "level": "beginner",
      "task": "Fix leaky faucets"
    }
  ]
  ```
