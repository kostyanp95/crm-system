const app = require('./app')
const port = process.env.PORT || 5000

app.listen(port, () => console.info(`Server has been started on port ${port}`))
