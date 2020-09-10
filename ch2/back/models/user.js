module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,       // 증복 금지 (중복이 되면 에러를 발생시킴)
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',      //한글 저장
    });
    User.associate = (db) => {
        db.Post.belongsTo(db.User);         //사용자는 게시글을 여러개 작성 가능하다
        db.User.hasMany(db.Comment);
    };
    return User;
}