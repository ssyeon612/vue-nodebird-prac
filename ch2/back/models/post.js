module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {             // 테이블 명 posts
       content: {
        type: DataTypes.TEXT,        // 매우 긴 글
        allowNull: false,
       },       // createAt, updateAt 자동 생성
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Post.associate = (db) => {
        db.User.hasMany(db.Post);      // 게시글은 사용자에 속해있다
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    };
    return Post;
};