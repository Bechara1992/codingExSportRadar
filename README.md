# SCORE BOARD

This application serves as both a score board and an interface allowing the user to create football games, edit the socres and end the games.

## Features

- No games present when the application is launched
- User can add a new game by pressing on the + button where the user can enter 2 teams' names
- Games added will be displayed as a list, where the user can click to edit the score or end the game.
- Games will be sorted by the combined score of both teams
- If 2 teams have the same score the most recent one would appear on top
- Games will get sorted as well when a new game is created

## Tech

The project is made with react and typescript. Solid principles are applied as best as could be for the project in hand. UI components have no complex logic in them and the logic is extracted into other logical components.

## Important notes

> Since the pdf did not mention anything about showing 2 lists
> one in the original creation sequence and another sorted as per the requirements
> I only kept track of 1 list, where having a second one is just straight forward
> however I tried to keep things as simple as possible.

## Installation

This app requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
cd path-to-app-directory
npm i
npm start
npm test (to run the test sequence)
```

For production environments...

```sh
npm run build
```

For any additional questions and regards please feel free to contact me (bechara.murr@outlook.com).
I would as well love to hear your feedback regardless of the outcome.
