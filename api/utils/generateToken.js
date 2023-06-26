export const sendToken = (res, user, message, statusCode = 200) => {
  const token = user.getJWTToken();

  const userData = {
    _id: user._id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
  };

  return res
    .status(statusCode)
    .cookie("token", token, {
      secure: process.NODE_ENV === "production" ? true : false,
      httpOnly: process.NODE_ENV === "production" ? true : false,
      sameSite: process.NODE_ENV === "production" ? "none" : false,
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      message: message,
      user: userData,
    });
};
