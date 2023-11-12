# GeeksDeck

Welcome to GeeksDeck, a tool designed to help users create, organize, and quiz themselves using flashcards. This README provides an overview of the application's features and functionalities.

## Features

### Home Screen
- Lists various buttons allowing users to perform different actions:
    - Create categories
    - Create flashcards
    - View flashcards
    - Quiz mode
- Each button leads to its respective screen for the chosen action.

### Creating Category Screen
- Allows users to create categories by providing a name and description.
- Upon submission, the data is added to the database, and the user returns to the home screen.

### Creating Flashcards Screen
- Enables users to create flashcards by entering terms, definitions, and uploading images.
- Upon submission, the data is added to the database, and the user returns to the home screen.

### View Flashcards
- Displays flashcards based on the selected category.
- Features a flip animation allowing users to reveal the answer on each flashcard.
- Navigation options to move between flashcards.

### Quiz Mode
- Allows users to quiz themselves using the flashcards.
- Provides a way to track correct and incorrect answers.
- At the end of the quiz, a summary screen shows the user's score.

### Navigation
- Navigation is available from all screens, allowing users to return to the home screen easily.

## Getting Started

To run the Flashcards Application locally, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies with ```npm install```.
3. Set up the database and ensure proper connectivity.
4. Run the application.

## Technologies Used

- Frontend: React Native
- Backend: Node.js
- Database: PostgreSQL. (configuration is taken from .env file)

## Screenshots
### Home Screen
![Home Screen](https://github.com/thathva/GeeksDeck/assets/34968163/8e9f243b-caa3-4cfe-a040-a797ffb5c595)

### Creating Category Screen
![Create Category](https://github.com/thathva/GeeksDeck/assets/34968163/923f84f0-c7db-4077-ac77-19b821f882fb)

### Creating Flashcards Screen
![Create Flashcards](https://github.com/thathva/GeeksDeck/assets/34968163/a4bbff62-8f62-45c8-9705-8a89a1e2ec33)

### Selecting Category for Viewing Flashcards
![Select Category](https://github.com/thathva/GeeksDeck/assets/34968163/cefd828f-6c39-4b56-b345-428a9927f278)

### Viewing Flashcards
![View Flashcards](https://github.com/thathva/GeeksDeck/assets/34968163/74b5e7eb-21cb-4ddd-bfd0-64beaa744909)

### Quiz Mode
![Quiz Mode](https://github.com/thathva/GeeksDeck/assets/34968163/8544558a-1981-4419-91d6-c2a8de9ae161)


### Final Scores Screen
![Final Scores](https://github.com/thathva/GeeksDeck/assets/34968163/d41d7251-4c0e-49c4-912e-1e93e6306c37)







