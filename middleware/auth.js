export const isLoggined = (req, res, next) => {
  console.log(req.session);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send('잘못된 접근입니다.');
  }
};

export const isNotLoggined = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.send('로그인한 유저는 접근할 수 없습니다.');
  }
};

export const isAdministrator = (req, res, next) => {
  if (req.isAuthenticated() && req.session.isAdmin === 1) {
    next();
  } else {
    res.send('관리자가 아니면 접근할 수 없습니다.');
  }
};
