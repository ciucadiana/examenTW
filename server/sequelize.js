const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('examen', 'postgres', 'dianasql', {
    host: 'localhost',
    dialect: 'postgres'
  });

  
sequelize.sync({alter:true}).then(() =>{
    console.log("modele sincronizate");
});

module.exports = sequelize;