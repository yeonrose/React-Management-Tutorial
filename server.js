    const fs = require('fs'); //파일에 접근할 수 있는 라이브러리
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    const port = process.env.PORT || 5000;



    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const data = fs.readFileSync('./database.json');
    const conf = JSON.parse(data);
    const {Client} = require('pg');

    const connection = new Client({
        host : conf.host,
        user : conf.user,
        password : conf.password,
        port : conf.port,
        database : conf.database
    });

    connection.connect();

    const multer = require('multer');
    const upload = multer({dest: './upload'});

    app.get('/api/customers', (req,res) => {
        connection.query(
            "SELECT * FROM CUSTOMER",
            (err, rows, fields) => {
                //res.send(rows);
                console.log(err);
                res.json(rows);
            }
            
        )
    });

    app.use('/image', express.static('./upload') );

    app.post('/api/customers', upload.single('image'), (req, res) => {
        let sql = 'INSERT INTO CUSTOMER VALUES (DEFAULT, $1, $2, $3, $4, $5)';
        let image = '/image/' + req.file.filename;
        let name = req.body.name;
        let birthday = req.body.birthday;
        let gender = req.body.gender;
        let job = req.body.job;
        let params = [image, name, birthday, gender, job];
        
        connection.query(sql, params, (err, rows, fields) => {
            if (err) {
                console.error("Insertion error:", err);
                return res.status(500).send(err);
            }
            res.send(rows);
        });
    });
    
    

    app.listen(port, ()=> console.log(`Listening on port ${port}`));