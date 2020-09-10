exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){          // 로그인을 한 사람
        return next();                  // next : 다음 미들웨어로 넘어가는 것. 단 인수가 없을 경우
    }
    return res.status(401).send('로그인이 필요합니다.');         // 로그인을 하지 않은 사람
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    return res.status(401).send('로그인한 사람은 할 수 없습니다.');
};