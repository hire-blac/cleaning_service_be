import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production', 
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 7 * 86400000, 
  });
  return res.sendStatus({token});
};

export default generateToken; 