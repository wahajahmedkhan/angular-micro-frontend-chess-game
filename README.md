# Angular Micro-Frontend Chess Game

## Introduction

Welcome to the Angular Micro-Frontend Chess Game! This application is a modern take on the classic game of chess, crafted with Angular and incorporating micro-frontend architecture. Each player interacts with their own view of the chessboard, rendered in separate iframes, ensuring a unique and personalized gaming experience.

## Features

- **Micro-Frontend Iframes**: Each player has a dedicated iframe for their view of the chess game.
- **Communication**: The iframes communicate using `window.postMessage`, ensuring smooth and efficient data transfer.
- **Sound Effects**: Immersive audio plays with each move, enhancing the user experience.
- **Stopwatch**: A built-in stopwatch tracks the duration of the game.
- **Move Counter**: The app counts and displays the total number of moves made in each frame.
- **Automated Deployment**: GitHub Actions are utilized for seamless deployment to Firebase.

## Demo

Experience the game firsthand at: [Angular Micro-Frontend Chess Game Demo](https://angular-micro-frontend-chess.web.app/app)

## Dependencies

- Angular: `13.2.0`
- TypeScript: `4.5.5`
- Node: `17.0.18`
- NGX-Chess-Board: `2.2.1`
- Jest: `27.5.1`
- Prettier: `2.5.1`
- ESLint: `8.9.0`

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/) and NPM (Node Package Manager).
- Install Angular CLI by running `npm install -g @angular/cli`

### Installing

- Clone the repository: `git clone https://github.com/wahajahmedkhan/angular-micro-frontend-chess-game.git`
- Navigate into the directory: `cd angular-micro-frontend-chess-game`
- Install dependencies: `npm install`

## Running the application

- Run `ng serve`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running the tests

- Run `ng test` to execute the unit tests

## Contributing

Contributions to enhance the Angular Micro-Frontend Chess Game are welcome. Please read our [contribution](CONTRIBUTION.md)  guidelines before submitting your pull request.

## Deployment

This project is configured with GitHub Actions for continuous deployment. Every push to the main branch triggers a deployment process to Firebase.

## Authors



See also the list of [contributors](https://github.com/wahajahmedkhan/angular-micro-frontend-chess-game/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.
