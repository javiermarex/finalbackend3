const register = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.json401("Email ya esta en uso");
    }
    res.json201(user);
  } catch (error) {
    console.error(error);
    res.json500("Internal Server Error");
  }
};

const login = async (req, res) => {
    const { token, user } = req;
    const opts = { maxAge: 60 * 60 * 24 * 7 * 1000 };
    res.cookie("token", token, opts).json200({
        message: "Logged in",
        user_id: user._id,
        token  // ✅ DEVOLVER EL TOKEN AQUÍ
    });
};

const signout = (req, res) => {
  try {
    res.clearCookie("token").json200("Signed out");
  } catch (error) {
    console.error(error);
    res.json500("Internal Server Error");
  }
};

const online = (req, res) => {
  try {
    res.json200("It's online");
  } catch (error) {
    console.error(error);
    res.json500("Internal Server Error");
  }
};

const google = async (req, res) => {
  try {
    const { token, user } = req;
    const opts = {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000,
    };
    res.cookie("token", token, opts).json200("Logged in with google");
  } catch (error) {
    console.error(error);
    res.json500("Internal Server Error");
  }
};

const failure = (req, res) => {
  return res.json401("Auth failed");
};

export { register, login, signout, online, google, failure };
