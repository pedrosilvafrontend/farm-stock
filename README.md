# FarmStock

This project was generated using Angular 19.1.2.

## Development server

To start the JSON server, run:

```bash
npm run api
```

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

# Api endpoints
baseUrl: http://localhost:3000

### Farms
- `GET /farms` - Get all farms
- `POST /farms` - Create a farm
- `PUT /farms/:id` - Update a farm
- `DELETE /farms/:id` - Delete a farm

### Stocks
- `GET /stocks` - Get all stocks
- `POST /stocks` - Create a stock
- `PUT /stocks/:id` - Update a stock
- `DELETE /stocks/:id` - Delete a stock

### Stock Items
- `GET /stockItems` - Get all stock items
- `POST /stockItems` - Create a stock item
- `PUT /stockItems/:id` - Update a stock item
- `DELETE /stockItems/:id` - Delete a stock item

### Stock Movements
- `GET /stockMovements` - Get all stock movements
- `POST /stockMovements` - Create a stock movement
- `PUT /stockMovements/:id` - Update a stock movement
- `DELETE /stockMovements/:id` - Delete a stock movement


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

