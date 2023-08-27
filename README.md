# Project Qr-code menu

The Order and Table Management System is a full-stack application designed to optimize and simplify restaurant operations, streamlining the customer order flow to enhance service efficiency. The application offers an integrated solution for restaurants aiming to enhance customer experiences and improve internal management.

The deployment of this application can be found at the following address: [Deploy-frontend](https://i.imgur.com/0HaVJGv.gif).

The link to the backend repository that serves this application can be found at the following address: [Repo-backend](https://github.com/Megas-MDN/backend-q-menu). As for the backend deployment link, it can be accessed at the following address: [Deploy-backend](https://backend-q-menu.vercel.app/).

<hr>

## Application flow

![application-running](https://i.imgur.com/0HaVJGv.gif)

### Description:

The Orders and Tables Management System is a fullstack application designed to optimize and simplify restaurant operations, allowing for streamlined customer order flows and facilitating efficient service. The application provides an integrated solution for restaurants aiming to enhance customer experiences and improve internal management.

#### Key Features:

![application-running](https://i.imgur.com/Lir8IXE.gif)

##### Dashboard:

The main dashboard serves as the control center for the restaurant. Managers can monitor and manage all tables and orders in real time. The intuitive interface visually displays table orders, enabling the staff to identify tables that require attention.

##### Table Creation and QR Codes:

Tables can be created and deleted directly from the dashboard. Each table is associated with a unique QR code that customers can scan to access the restaurant's menu on their mobile devices.

##### Interactive Menu:

Through the QR code, customers can access the restaurant's digital menu on their smartphones. This provides a convenient and contactless experience, allowing customers to browse the menu and place orders according to their preferences.

##### Real-time Orders via Socket:

When a customer places an order using the digital menu, order details are instantly sent via socket to the main dashboard. This enables the restaurant staff to track orders in real time and respond to customer needs promptly.

##### Order Tracking and History:

Each order is recorded in the database, ensuring a complete history of customer interactions with the restaurant. This not only assists with inventory and production management but also enables the restaurant to better understand customer preferences and offer personalized service.

![application-running](https://i.imgur.com/psJrR4M.gif)

<hr>

## 🛠️ Install project

1. Clone the repository

```bash
git clone https://github.com/Megas-MDN/q-menu.git
```

2. Enter the cloned folder

```bash
cd q-menu
```

3. Install the dependencies

```bash
npm install
```

4. Build the project

```bash
npm start
```

5. Run in development mode

```bash
npm run dev
```

<hr>

## 📦 Environment variables

To run this project, you will need to add the following environment variables to your .env file.

`VITE_URL`= Backend.

`VITE_SOCKET_URL`= Socket server

🌟 Ready to use!

<hr>

## 💻 Built with:

- [javascript](https://www.w3schools.com/js/js_es6.asp) : Language
- [Vite](https://vitejs.dev/) : Frontend build tooling
- [React](https://expressjs.com/pt-br/) : Framework
- [Mongo DB Atlas](https://www.mongodb.com/atlas/database) : Data base
- [Socket.io](https://socket.io/) : WebSocket
- [Vercel](https://vercel.com/) : Deploy developer mode

<hr>
<p align="center">
Developed with ❤️ by Megas
</p>
