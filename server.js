const app = require("./src/app");

const server = app.listen(3055, () => {
    console.log("running server")
})

process.on('SIGINT', () => {
    server.close(() => console.log('Exit Server Express'))
})