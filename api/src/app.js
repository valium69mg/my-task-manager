require('dotenv').config({ path: '../.env' });
const express = require('express');
const morgan = require('morgan');
const { initDatabase, getPool } = require('../config/database');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Initialize DB
initDatabase()
  .then(() => {
    return getPool().getConnection();
  })
  .then(conn => {
    console.log(`DB connected at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    conn.release();

    // auth routes
    const authRoutes = require('./routes/authRoutes');
    app.use('/api/auth', authRoutes);

    // user routes
    const userRoutes = require('./routes/userRoutes');
    app.use('/api/users', userRoutes);

    // project routes
    const projectRoutes = require('./routes/projectRoutes');
    app.use('/api/projects', projectRoutes);

    // task routes 
    const taskRoutes = require('./routes/taskRoutes');
    app.use('/api/tasks', taskRoutes);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to DB:', err.message);
    process.exit(1);
  });
