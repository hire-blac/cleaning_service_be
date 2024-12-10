// import jwt from 'jsonwebtoken';

// const refreshAccessToken = (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) {
//     return res.status(401).json({ message: 'No refresh token provided' });
//   }

//   // Verify the refresh token
//   jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid refresh token' });
//     }

//     // Create a new access token
//     const newAccessToken = jwt.sign(
//       { userId: decoded.userId },
//       process.env.JWT_SECRET,
//       { expiresIn: '15m' }
//     );

//     // Send the new access token to the client
//     res.json({ accessToken: newAccessToken });
//   });
// };

// export default refreshAccessToken;
