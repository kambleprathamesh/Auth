const userAuth = (req, res) => {
  res.status(200).json({
    status: true,
    message: "user Auhentication",
  });
};


export {userAuth}