const app = require('./app')
const port = process.env.PORT || 5000

app.listen(port, () => console.info(`Server has been started on port ${port}`))

app.all('*', ensureSecure)


function ensureSecure(req, res, next) {

    console.log("request: ", req)

    if (req.secure) {
        return next()
    }

    res.redirect('https://' + req.hostname + req.url)
}
