import jwt from 'jsonwebtoken';

const CreateTokens = async (req, res, next) => {
  const RefreshTokenSecret = process.env.REFRESH_SECRET;
  const AccessTokenSecret = process.env.ACCESS_SECRET;

  const StoredRefreshToken = req.cookies['refreshtoken']; 
  const StoredAccessToken = req.cookies['AccessToken']; 

  const sendResponse = () => {
    next(); 
  };

  const { username } = req.body.data;

  try {
    if (StoredRefreshToken || StoredAccessToken) {
      if (StoredRefreshToken && StoredAccessToken) {
        // Verify refresh token
        jwt.verify(StoredRefreshToken, RefreshTokenSecret, (error, decoded) => {
          if (error && error.name === 'TokenExpiredError') {
            // Create new refresh token
            const newRefreshToken = jwt.sign(decoded, RefreshTokenSecret);
            res.setHeader('RefreshToken', newRefreshToken);
            return sendResponse();
          }
          // Verify Stored Access Token
          jwt.verify(StoredAccessToken, AccessTokenSecret, (error, decoded) => {
            // return error if jwt couldn't verify access token
            if (error) return sendResponse();
            return sendResponse();
          });
        });
      } else if (StoredRefreshToken) {
        jwt.verify(StoredRefreshToken, RefreshTokenSecret, (error, decoded) => {
          // return error if error
          if (error) return sendResponse(401, { error: error.message });
          // generate new AccessToken
          const newAccessToken = jwt.sign(decoded, AccessTokenSecret);
          res.cookie('AccessToken', newAccessToken, {
            httpOnly: true,
            sameSite: 'strict'
          });
          return sendResponse();
        });
      } else {
        jwt.verify(StoredAccessToken, AccessTokenSecret, (error, decoded) => {
          if (error) return sendResponse(401, { error: error.message });
          // Generate new refreshToken
          const newRefreshToken = jwt.sign(decoded, RefreshTokenSecret);
          res.setHeader('RefreshToken', newRefreshToken);
          return sendResponse();
        });
      }
    } else {
      const refreshToken = jwt.sign({ username }, RefreshTokenSecret);
      const AccessToken = jwt.sign({ username }, AccessTokenSecret);

      // Setting expiration times properly
      const refreshTokenExpirationTime = new Date(); 
      refreshTokenExpirationTime.setHours(refreshTokenExpirationTime.getHours() + 1); // Add 1 hour

      const accessTokenExpirationTime = new Date(); 
      accessTokenExpirationTime.setDate(accessTokenExpirationTime.getDate() + 15); // Add 15 days

      res.cookie('RefreshToken', refreshToken, {
        httpOnly: true, 
        sameSite: "Strict",
        expires: refreshTokenExpirationTime
      });
      res.cookie('AccessToken', AccessToken, {
        httpOnly: true,
        sameSite: "Strict",
        expires: accessTokenExpirationTime
      });
      return sendResponse();
    }

  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
};

export default CreateTokens;
