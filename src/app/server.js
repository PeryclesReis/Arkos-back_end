const PORT = process.env.PORT || 3004;
const app = require('./app');

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

module.exports = app;
