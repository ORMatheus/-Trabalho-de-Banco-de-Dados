ModelManager.exports = (sequelize,DataTypes) =>{
    const ADM =sequelize.define('adm',{
        id_admin:{
            type:DataTypes.INTEGER,
            primakey: true,
            autoincrement:true,
            field:'id_admin'
        },
        nome_admin:{
            type:DataTypes.STRING(100),
            allowNull:false,
            field:'nome_admin'
        },
        email_admin:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true,
            field:'email_admin'
        },
        hash_senha_admin:{
            type: DataTypes.STRING(255),
            allowNull:false,
            field: 'hash_senha_admin'
        }
    },{
        tableName:'adm',
        timestamps:false
    });
    return  ADM
}