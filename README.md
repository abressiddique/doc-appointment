# Doctor Appointment Website

This project is a **Doctor Appointment Website** that allows users to book appointments with doctors online. It consists of three main parts:
1. **Backend**: Built with Node.js, Express, and MongoDB for handling APIs, authentication, and database operations.
2. **Admin Frontend**: A React-based admin panel for managing appointments, doctors, and users.
3. **Frontend**: A React-based user interface for booking appointments and interacting with the website.

---

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Bcrypt**: Library for hashing passwords.
- **Cloudinary**: Cloud-based image and video management.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Dotenv**: Module for loading environment variables.
- **JSON Web Token (JWT)**: For authentication and authorization.
- **Multer**: Middleware for handling file uploads.
- **Validator**: Library for string validation and sanitization.

### Admin Frontend & Frontend
- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: For routing in the React application.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Toastify**: For displaying toast notifications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Build tool and development server.

---

## Installation

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the backend directory and add your environment variables (see example below).
4. Start the server:
   ```bash
   npm start
   ```

### Admin Frontend
1. Navigate to the admin directory:
   ```bash
   cd admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

### Backend `.env` Example
```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/doctorappointment
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend `.env` Example
```plaintext
VITE_API_BASE_URL=http://localhost:5000
```

---

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Appointment Booking**: Users can book appointments with doctors.
- **Admin Panel**: Manage doctors, appointments, and users.
- **File Uploads**: Upload doctor profiles and other documents using Cloudinary.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience on all devices.

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

---

## License
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.

---

## Acknowledgments
- Thanks to all the open-source projects and libraries used in this project.
- Special thanks to the contributors and maintainers of the libraries and frameworks used.

---

