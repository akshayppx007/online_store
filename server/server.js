const app = require("./app");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDatabase = require("./config/database");

const httpServer = createServer(app);
global.io = new Server(httpServer);

const admins = [];
let activeChats = [];
function get_random(array) {
	return array[Math.floor(Math.random() * array.length)];
}

io.on("connection", (socket) => {
	socket.on("admin connected with server", (adminName) => {
		admins.push({ id: socket.id, admin: adminName });
	});
	socket.on("client sends message", (msg) => {
		if (admins.length === 0) {
			socket.emit("no admin", "");
		} else {
			let client = activeChats.find((client) => client.clientId === socket.id);
			let targetAdminId;
			if (client) {
				targetAdminId = client.adminId;
			} else {
				let admin = get_random(admins);
				activeChats.push({ clientId: socket.id, adminId: admin.id });
				targetAdminId = admin.id;
			}
			socket.broadcast
				.to(targetAdminId)
				.emit("server sends message from client to admin", {
					user: socket.id,
					message: msg,
				});
		}
	});

	socket.on("admin sends message", ({ user, message }) => {
		socket.broadcast
			.to(user)
			.emit("server sends message from admin to client", message);
	});

	socket.on("admin closes chat", (socketId) => {
		socket.broadcast.to(socketId).emit("admin closed chat", "");
		let c = io.sockets.sockets.get(socketId);
		c.disconnect(); // reason:  server namespace disconnect
	});

	socket.on("disconnect", (reason) => {
		// admin disconnected
		const removeIndex = admins.findIndex((item) => item.id === socket.id);
		if (removeIndex !== -1) {
			admins.splice(removeIndex, 1);
		}
		activeChats = activeChats.filter((item) => item.adminId !== socket.id);

		// client disconnected
		const removeIndexClient = activeChats.findIndex(
			(item) => item.clientId === socket.id
		);
		if (removeIndexClient !== -1) {
			activeChats.splice(removeIndexClient, 1);
		}
		socket.broadcast.emit("disconnected", {
			reason: reason,
			socketId: socket.id,
		});
	});
});

// config
dotenv.config();

// database
connectDatabase();

const PORT = process.env.PORT || 9000;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
