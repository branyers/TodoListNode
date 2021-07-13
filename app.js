const express = require("express")
const path = require("path")
const authRouter = require("./routes/auth.routes")
const catRouter = require("./routes/category.route")
const session = require('./utils/session.conf')
const passport = require("passport")
require("./config/passport");
const app = express()


// Set up engine veiws and Route engine views
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// Middleware session config
app.use(session);
  
// Middleware set up public directory static
app.use(express.static(path.join(__dirname, "public")))

// Middleware unenconded and encode response Json
app.use(express.urlencoded({ extended: true }))

// Middleware response Json
app.use(express.json())

// Initializer Passport and Passport Session
app.use(passport.initialize())
app.use(passport.session())

// Routers
app.use(authRouter)
app.use(catRouter)




// Middleware handler home pages application
app.get("/", (request, response) => {
  response.render("pages/homePages", { title: "Home Pages" })
})



// Middleware handler when the pages not found
app.use((request, response) => {
    let pathnotfound = path.join(__dirname, "public", "404.html");
    response.status(404).sendFile(pathnotfound)
})

// Middleware handler erroros from data bases
app.use((error, request, response, next) => {
    console.log(error.stack);
    let errorTracker = require("./utils/errorMessages")
    response.status(404).send(errorTracker[error.name])
})


module.exports = app
