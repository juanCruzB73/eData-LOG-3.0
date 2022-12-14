const db = require("../../database/models");
const op = db.sequelize.op

module.exports = {
    list: (req,res)=>{
        db.Usuario.findAll()
        .then(users =>{
            return res.status(200).json({
                meta:{
                    status: 200,
                    total: users.length,
                    url: req.url
                },
                data: users
            })
        })
    },
    last: (req,res) => {
        db.Usuario.findAll().then(products =>{
            return res.status(200).json({
                meta:{
                    status: 200,
                    total: products.length,
                    url: req.url
                },
                 data: products.pop()
            })
        })
    },
    detail: (req,res)=>{
        db.Usuario.findByPk(req.params.id)
        .then(user =>{
            return res.status(200).json({
                meta:{
                    status: 200,
                },
                data: {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email
                }
            })
        }).catch(error => res.send(error)) 
    }
}