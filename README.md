# Vehicle Selection Form

## Overview

This project is a full-stack web application for selecting a vehicle from a set of available options. The frontend is a React-based UI that collects vehicle choices and sends them to backend services for validation, processing, and confirmation.

## What This App Does

- Shows a vehicle selection form in the browser.
- Lets users choose a vehicle type, model, and add optional features.
- Sends the submitted selection to the backend API.
- Displays the backend response with a confirmed selection summary.
- Handles validation, compatibility checks, and response messages.

## How the UI Works

1. Start the frontend and open the browser at `http://localhost:3000`.
2. Use the form fields to select:
   - the vehicle type (for example, car, truck, or SUV)
   - a model or variant for the selected type
   - any additional options or packages
3. Review the chosen selections.
4. Click the submit button.
5. The UI sends the selection to the backend service and waits for the response.
6. The returned response is shown on screen, including confirmed details and any messages.

## Backend Services

The backend service performs:
- receiving the selection payload from the frontend
- validating the selected vehicle type, model, and options
- checking business rules and compatibility constraints
- returning a response with confirmed selection details and warnings if any

The frontend and backend must be running at the same time. The frontend sends the request to the configured API endpoint, and the backend replies with the outcome.

## User Flow and Expected Behavior

1. The user selects vehicle details in the app.
2. On submit, the frontend creates a request containing the selected values.
3. The backend validates the data and applies business logic.
4. The backend returns a response with:
   - confirmed vehicle type and model
   - selected features and packages
   - any validation messages or automatic adjustments
5. The UI displays the final result and status.

## Running the UI App

1. Install dependencies:
   - `npm install`
2. Start the frontend UI:
   - `npm start`
3. Ensure the backend service is running and reachable.
4. Open `http://localhost:3000` in your browser.


## Running the Backend Service

1. Go to service directory
   - `cd backend`
2. Install dependencies:
   - `npm install`
3. Start the backend server:
   - `npm run dev`
4. Ensure the backend service is running on `http://localhost:5000`.
5. To test the service:
   - `npm test`

## Notes

- If the backend is unavailable, the UI should display an error message on submit.
- The app is designed to demonstrate the full selection flow from input to backend response.
- Use the browser developer tools network tab to inspect API requests and responses if needed.
