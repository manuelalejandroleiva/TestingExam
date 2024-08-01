const config = {
    "development": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB,
      "host": process.env.DB_IP,
      "port": process.env.DB_PORT,
      "dialect": "mysql"
    },
    // Otras configuraciones para otros entornos
  };
  
  export = config;