Interactive Resume Application (React, Node.js, MySQL)

Project Overview

This project is an interactive Resume Application built to showcase my personal resume in a dynamic and modern web format. Users can explore my skills, projects, education, experience, and more. The app is built using React for the frontend, Node.js and Express for the backend, and MySQL for data management.

Key Technologies: React, Node.js, Express, MySQL, Google OAuth, AI Chatbot Integration, Live Weather API, News Feed API

Key Features

Frontend
React-based User Interface: Built with React to create a dynamic, smooth user experience.
Responsive Design: Fully responsive layout to display the resume on various devices.
Dynamic Theme: Toggle between light and dark modes.
Interactive Sections: Each section (skills, experience, projects) can be expanded and viewed interactively.
Live Updates: Displays live weather data and real-time news headlines.
Time-Based Greetings: Personalized greetings based on the time of day (e.g., "Good Morning").

Backend
Node.js & Express: Used to manage API endpoints for dynamic data and resume sections.
Google OAuth Authentication: Secure sign-in for users to access personalized data or edit sections.
CRUD Operations: Full functionality for creating, editing, and deleting sections of the resume.

Database
MySQL: Data for storing user details, education, work experience, and projects.

Additional Features
AI Chatbot: Provides real-time help and assistance in finding specific information or answering questions about the resume.
Live Weather Updates: Shows weather information dynamically based on the user's location or preferences.
News Feed: Displays live news updates relevant to the user's interests.

Getting Started
Frontend Setup
Clone the repository:
bash
Copy code
git clone https://github.com/shivas1432/final_project_FE.git
cd resume/frontend

Install the dependencies:
bash
Copy code
npm install
Start the React app:
bash
Copy code
npm start

Visit the app at http://localhost:3000 to see your interactive resume in action.

Backend Setup
Navigate to the backend folder:
bash
Copy code
cd resume/backend

Install the required dependencies:
bash
Copy code
npm install
Set up your .env file with the necessary environment variables (such as database credentials, Google OAuth credentials, etc.).
Start the Node.js server:
bash
Copy code
npm start

App Features
Personalized Resume: Shows detailed sections about your skills, work experience, education, and projects.
Dynamic Sections: Click to expand or collapse detailed information for each section.
Live Data Integration:
Real-time weather updates based on the user's location.
Display news feed related to your areas of interest.
User Authentication: Users can sign in with Google OAuth to edit or interact with certain sections of the resume (if allowed).
Technologies Used
Frontend: React, CSS Modules, Axios, React Router
Backend: Node.js, Express, Google OAuth, MySQL, Sequelize ORM
APIs: OpenWeather API (for weather updates), NewsAPI (for news feed)
Other: Socket.io (for live updates), AI Chatbot API

How to Contribute

Feel free to fork this repository and make any improvements. To contribute:

Fork the repository to your GitHub account.
Create a new branch for your feature: git checkout -b feature-branch.
Make your changes and commit them: git commit -m "Describe your change".
Push to your branch: git push origin feature-branch.
Create a pull request to submit your changes for review.