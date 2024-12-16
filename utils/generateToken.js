import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production', 
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 86400000, 
  });
  return res.sendStatus(200);
};

export default generateToken; 