
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'node_db'
});

exports.register = (req,res) => {
    console.log(req.body);
    // res.send("Form submitted");
    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email FROM users_tbl WHERE email=?',[email],async(error,results)=>{
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register',{
                msg: 'That email is already in used'
            });
        }else if(password != passwordConfirm){
            return res.render('register',{
                msg: 'Password not match'
            });
        }

         let hashedPassword = await bcrypt.hash(password, 8);
        //  console.log(hashedPassword);
        //  res.send('testing');
        db.query('INSERT INTO users_tbl SET ?', {name: name, email: email, password: hashedPassword},(error,results)=>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('register',{
                    msg: 'User registered'
                });
            }
        })
    });
}