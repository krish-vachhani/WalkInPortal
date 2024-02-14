const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

const connection = require('./Database/database').connection;
const SECRET = 'my-secret-key';

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
app.post('/login', (req, res) => {
    try {
        const {email, password} = req.body;
        const queryparams = [email];
        const query = "SELECT * FROM tbl_personal_info WHERE email_addr = ?";
        console.log('SQL Query:', query);
        connection.query(query, queryparams, (err, result) => {
            if (err) {
                console.error("Error occurred:", err);
                return res.sendStatus(403);
            }
            if (result[0] != null && result[0].password === password) {
                const token = jwt.sign({email, userId: result[0].id}, SECRET, {expiresIn: '1h'});
                const user = {
                    id: result[0].id,
                    token
                }
                res.status(200).send(user);
            } else {
                res.status(401).send("Unauthorized");
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/test',authenticateJwt ,(req, res) => {
    let sql = 'select * from tbl_personal_info';

    connection.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})


app.listen(port, () => console.log('Server running on port ' + port));