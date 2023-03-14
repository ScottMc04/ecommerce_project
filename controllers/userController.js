const pool = require('../db/index');


const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY userId', (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.userId);
    pool.query('SELECT * FROM users WHERE userId = $1', [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows?.length) {
        return result.rows[0]
    }
  
    return null;
};

const addUser = (req, res) => {
    const {userId, first_name, last_name, password, email} = req.body;

    // Check if email exists
    pool.query('SELECT u from users u WHERE u.email = $1', [email], (error, results) => {
        if (results.rows.length){
            res.send('Email already registered');
        }
        // Add new user
        pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5)', [userId, first_name, last_name, password, email], (error, results) => {
            if (error) throw error;
            res.status(201).send('User successfully added')
        })
    }
)};

const updateUser = (req, res) => {
    const userId = parseInt(req.params.userId)
    const {password} = req.body;
    //Check if user exist
    pool.query('SELECT * FROM users WHERE userId = $1', [userId] ,(error, results) => {
        if(!results.rows.length){
            console.log(results.rows.length)
            res.send('User does not exist')
        }
       
        // Update user
        pool.query('UPDATE users SET password = $2 WHERE userId = $1', [userId, password] , (error, results) => {
            if (error) throw error;
            res.status(200).send('User sccessfully updated')
        })
    })
}
    

module.exports = {
    getUsers,
    getUserByEmail,
    getUserById,
    addUser,
    updateUser
}