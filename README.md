# OpenHands Web API

OpenHands Web API is a RESTful service designed to simplify your workflow by providing a comprehensive suite of endpoints for interacting with the OpenHands platform. Built with Express and TypeScript, it integrates WebSocket actions, OpenAPI specification support, and various useful endpoints for health checks, configuration, and more.

## Overview

This project provides an API that allows you to:

- Perform health checks and status monitoring.
- Access options such as models, agents, and security analyzers.
- Manage conversations including listing files, selecting files, handling uploads, and more.
- Retrieve runtime configuration and VSCode URLs.
- Integrate with GitHub for repository and user information retrieval.

All endpoints are documented using the OpenAPI Specification. Interactive documentation is available via Swagger UI.

## Features

- **Express & TypeScript:** Modern, modular, and scalable API built with the latest standards.
- **OpenAPI Support:** Full API documentation available through `/openapi.json` and Swagger UI at `/swagger`.
- **WebSocket Integration:** Leverage WebSocket actions through dedicated controllers.
- **Modular Controllers:** Clear separation of endpoints through controllers (e.g., `openhandsController`).

## Installation

1. Clone the repository:

   ```bash
git clone https://github.com/vinisdl/open-hands-web-api.git
   ```

2. Navigate to the project directory:

   ```bash
cd open-hands-web-api
   ```

3. Install the dependencies:

   ```bash
npm install
   ```

## Development

To run the API in development mode, use:

```bash
npm run start:dev
```

The server will start on the port defined by the `PORT` environment variable (default is 8080).

## Build & Production

Build the project:

```bash
npm run build
```

Then, start the server in production mode:

```bash
npm start
```

## API Documentation

The API is documented using the OpenAPI Specification. You can access the documentation via:

- **Swagger UI:** `/swagger`
- **OpenAPI JSON:** `/openapi.json`

## Project Structure

```
open-hands-web-api/
├── src/
│   ├── controllers/
│   │   └── openhandsController.ts
│   ├── lib/
│   │   └── wsClient.ts
│   ├── app.ts
│   ├── config.ts
│   └── main.ts
├── swagger.json
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).
