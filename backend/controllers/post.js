const { pool } = require('../config/db');

exports.getByHoursBegin = (req, res, next) => {
    // Ordre des activités sur le tableau
    let sql = "SELECT * FROM activity WHERE idLibelle ORDER BY hoursBegin ASC LIMIT 50;";
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getByHoursBeginVerso = (req, res, next) => {
    // Ordre des activités sur le tableau
    let sql = "SELECT * FROM activity WHERE idLibelle ORDER BY hoursBegin DESC LIMIT 50;";
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getByHoursEnd = (req, res, next) => {
    // Ordre des activités sur le tableau par heures de fin
    let sql = "SELECT * FROM activity WHERE idLibelle ORDER BY hoursEnd ASC LIMIT 50;";
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getByHoursEndVerso = (req, res, next) => {
    // Ordre des activités sur le tableau par heures de fin
    let sql = "SELECT * FROM activity WHERE idLibelle ORDER BY hoursEnd DESC LIMIT 50;";
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getByName = (req, res, next) => {
    // Recupére les données par prénom
    let sql = `SELECT * FROM activity WHERE idLibelle ORDER BY name ASC LIMIT 50;`;
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getByNameVerso = (req, res, next) => {
    // Recupére les données par prénom
    let sql = `SELECT * FROM activity WHERE idLibelle ORDER BY name DESC LIMIT 50;`;
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getByLibelle = (req, res, next) => {
    // Recupére les données par prénom
    let sql = `SELECT * FROM activity WHERE idLibelle ORDER BY libelle ASC LIMIT 50;`;
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.getByLibelleVerso = (req, res, next) => {
    // Recupére les données par prénom
    let sql = `SELECT * FROM activity WHERE idLibelle ORDER BY libelle DESC LIMIT 50;`;
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.create = (req, res, next) => {
    // Definition des champs
    const post = {
        ...req.body
    }
    // Post add formulaire
    let sql = `INSERT INTO activity (name, libelle, hoursBegin, hoursEnd) VALUES (?,?,?,?);`;
    pool.execute(sql, [post.name, post.libelle, post.hoursBegin, post.hoursEnd], function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Activité ajouté` });
    })
};

exports.delete = (req, res, next) => {
    let sql = `SELECT * FROM activity WHERE idLibelle = ?`;
    pool.execute(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json({ err });
        if (!result[0]) res.status(400).json({ message: "Aucun id ne correspond dans la table" });
        else {
            if (req.body.userId) {
                // supp post dans bdd
                let sql2 = `DELETE FROM activity WHERE idLibelle = ?`;
                pool.execute(sql2, [req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Post supprimé` });
                });
            } else {
                res.status(401).json({message : "Bien essayé petit malin"});
            }

        }
    });
};