# Hostel Reservation System

This is a simple Hostel Reservation System built with Node.js and Express. It allows users to view room types, book rooms, and see all bookings.

---
### Prerequisites
Before running the server, ensure you have the following installed on your machine:

- Node.js (v14 or higher)

- npm (usually comes with Node.js)

---
### Installation

1. Clone the repository
```
 git clone https://github.com/rehna-jp/HostelRez.git 
 cd hostel-reservation-system
```
2. Install dependencies:
    Install dependencies:

 Run the following command to install the required packages:

 ```
 npm install express
 ```
3. This will:

    1. Add express to the dependencies section of your package.json.

    2. Create a node_modules folder where all the installed packages are stored.

    3. Create a package-lock.json file, which locks the versions of the installed dependencies.

---
### Running the server
1. Start the server
 - Run the following command
    ```
    npm start
    ```
 - This will start the server on http://localhost:3000.

2. Access the application:
 - Open your browser and paste this url:
 ```
 http://localhost:3000
 ```
 - The page will appear

---
### Project Structure
Here’s an overview of the project structure:

```
hostel-reservation-system/
├── public/             # Static files served to the client
│   ├── index.html      # Homepage
│   ├── bookings.html   # Bookings page
│   ├── style.css       # Stylesheet
│   ├── script.js       # Client-side JavaScript
│   ├── bookings.json   # Bookings data
│   ├── metadata.json   # Room metadata
│   └── images/         # Room images
├── server.js           # Node.js server file
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Locked dependency versions
└── README.md
```
---
### API Endpoints

The server provides the following API endpoint:
Update Bookings

- Method: PUT

- URL: /update-bookings

- Description: Updates the bookings.json file with new bookings.

- Request Body: An array of booking objects.

```
    [
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "roomType": "Single Bed",
    "price": "$100/month"
  }
]
```
- Response: A success message or an error.

---
### License
This project is licensed under the MIT License.

---
Troubleshooting
Port already in use: If port 3000 is already in use, you can change the port in server.js:
```
    const port = 3000; // Change this to another port number
```
Missing dependencies: If you encounter errors, ensure all dependencies are installed by running:
```
    npm install
```

Contributing

### Contributions are welcome! If you'd like to contribute, please follow these steps:

- Fork the repository.

- Create a new branch for your feature or bugfix.

- Submit a pull request.