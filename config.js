module.exports = {
  database: {
    db: process.env.RDB_DB || "moip",
    host: process.env.RETHINK_SERVER_PORT_28015_TCP_ADDR || "localhost",
    port: process.env.RETHINK_SERVER_PORT_28015_TCP_PORT || 28015
  },

  port: process.env.APP_PORT || 3000
}
