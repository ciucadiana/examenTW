const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize')
const VirtualShelf = require('./VirtualShelf')

const Book = sequelize.define('book', {
   idBook: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
   titluBook: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
           len: [5, 30]
       }
   },
   genBook: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
           isIn: [['COMEDY', 'TRAGEDY', 'ROMANCE', 'THRILLER', 'HORROR']]

       }
   },
   urlBook: {
       type: DataTypes.STRING,
       allowNull: false
   },

    virtualShelfIdVirtualShelf: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
           model: VirtualShelf,
           key: 'idVirtualShelf'
        },
    },
},
   {
       tableName: 'Book'
   }
);
VirtualShelf.hasMany(Book, { onDelete: 'CASCADE', hooks: true });
module.exports = Book;