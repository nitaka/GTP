const { pool } = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

exports.signup = (req, res, next) => {
    // crée compte
    let sql = `SELECT * FROM users WHERE email=?`;
    pool.execute(sql, [req.body.email], function (err, result) {
        let user = result[0];
        if (!user) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        prenom: req.body.prenom,
                        email: req.body.email,
                        password: hash,
                    }
                    let sql = `INSERT INTO users (name, email, password) VALUES (?,?,?)`;
                    pool.execute(sql, [user.prenom, user.email, user.password], function (err, result) {
                        if (err) throw err;
                        res.status(201).json({ message: `Utilisateur ${user.prenom} ajouté` });
                    })
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            res.status(401).json({ message: "Email existe déja" })
        }
    })

};

exports.login = (req, res, next) => {
    // Connexion au site
    let sql = `SELECT * FROM users WHERE email=?`;
    pool.execute(sql, [req.body.email], function (err, result) {
        let user = result[0];
        if (!user) return res.status(401).json({ error: "Email incorrect" });
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: " Mot de passe incorrect !" })
            }
            console.log("utilisateur connecté");
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.SECRET_TOKEN_KEY,
                    { expiresIn: "24h" },
                ),
            })
        })
        .catch(error => res.status(500).json({ message: "Erreur authentification" }));
    })
};

exports.getOne = (req, res, next) => {
    // recupére les données par ID
    let sql = `SELECT * FROM users WHERE users.id=${req.body.userId};`;
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getAll = (req, res, next) => {
    // Récupére toute les données users
    let sql = `SELECT * FROM users WHERE id;`;
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
};
