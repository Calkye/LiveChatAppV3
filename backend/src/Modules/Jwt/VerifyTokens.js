import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

dotenv.config(); 

const VerifyTokens = async (req, res, next) => {
  const refreshTokenSecret = process.env.REFRESH_SECRET; 
  const accessTokenSecret = process.env.ACCESS_SECRET; 

  const AccessToken = req.cookies['AccessToken']; 
  const RefreshToken = req.cookies['RefreshToken']; 

  // Setting expiration times properly
  const refreshTokenExpirationTime = new Date(); 
  refreshTokenExpirationTime.setHours(refreshTokenExpirationTime.getHours() + 1); // Add 1 hour

  const accessTokenExpirationTime = new Date(); 
  accessTokenExpirationTime.setDate(accessTokenExpirationTime.getDate() + 15); // Add 15 days
  
  try {
    if (RefreshToken || AccessToken) {
      if (RefreshToken && AccessToken) {
        // Both RefreshToken and AccessToken are present
        jwt.verify(RefreshToken, refreshTokenSecret, (error, decoded) => {
          if (error && error.name === 'TokenExpiredError') {
            // Refresh token expired, create a new one
            const newRefreshToken = jwt.sign(decoded, refreshTokenSecret);
            res.cookie('RefreshToken', newRefreshToken, {
              httpOnly: true, 
              sameSite: 'Strict', 
              expires: refreshTokenExpirationTime
            });

            // Now verify the AccessToken
            jwt.verify(AccessToken, accessTokenSecret, (error, decoded) => {
              if (error) {
                return res.status(401).json({ error: 'Access denied' });
              }
              next();
            });
          } else {
            // Refresh token is valid, verify AccessToken
            jwt.verify(AccessToken, accessTokenSecret, (error, decoded) => {
              if (error) {
                return res.status(401).json({ error: 'Access denied' });
              }
              next();
            });
          }
        });
      } else if (AccessToken) {
        // Only AccessToken present, create new RefreshToken
        jwt.verify(AccessToken, accessTokenSecret, (error, decoded) => {
          if (error) {
            return res.status(401).json({ error: 'Unauthorized' });
          }
          
          const newRefreshToken = jwt.sign(decoded, refreshTokenSecret);
          res.cookie('RefreshToken', newRefreshToken, {
            httpOnly: true, 
            sameSite: 'Strict', 
            expires: refreshTokenExpirationTime
          });
          next();
        });
      } else {
        // Only RefreshToken present, create new AccessToken
        jwt.verify(RefreshToken, refreshTokenSecret, (error, decoded) => {
          if (error) {
            return res.status(401).json({ error: 'Unauthorized' });
          }

          const newAccessToken = jwt.sign(decoded, accessTokenSecret);
          res.cookie('AccessToken', newAccessToken, {
            httpOnly: true, 
            sameSite: 'Strict', 
            expires: accessTokenExpirationTime
          });
          next();
        });
      }
    } else {
      return res.status(401).json({ error: 'No tokens found' });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

export default VerifyTokens;
