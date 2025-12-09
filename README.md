# Mentra Student Portal

A modern placement management system for students to track jobs, applications, and interviews.

## Features

- **Dashboard**: Overview of jobs, applications, and interviews
- **Jobs Listing**: Browse and apply for available positions
- **Application Tracking**: Monitor application status
- **Interview Schedule**: View and manage interview appointments

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd Mentra

# Install dependencies
npm install

# Create frontend files
node create-frontend.js
node create-css.js
node create-js.js

# (Optional) Clean up old files
node cleanup-old-files.js

# Start the server
npm start
```

## Quick Start

1. Install dependencies: `npm install`
2. Run setup scripts: `node create-frontend.js && node create-css.js && node create-js.js`
3. Start server: `npm start`
4. Open browser: `http://localhost:5000`

## Project Structure

- `public/` - Frontend static files (HTML, CSS, JS)
- `api/` - API route definitions
- `controller/` - Business logic
- `model/` - Database models
- `config/` - Configuration files

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: Based on Figma specifications

## API Endpoints

- `GET /` - Dashboard
- `GET /v1/Mentra/vendors` - Get jobs
- `GET /v1/Mentra/categories` - Get applications
- `GET /v1/Mentra/cloudkitchen/:id` - Get interviews

See SETUP-INSTRUCTIONS.md for detailed documentation.

