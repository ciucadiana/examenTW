const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize')

const VirtualShelf = sequelize.define('virtualShelf', {
   idVirtualShelf: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
   descriereVS: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
           len: [3, 50]
       }
   },
   dataVS: {
       type: DataTypes.DATE,
       allowNull: false,
   }
},
   {
       tableName: 'VirtualShelf'
   }

)
module.exports = VirtualShelf