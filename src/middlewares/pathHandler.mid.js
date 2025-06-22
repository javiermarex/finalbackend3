const pathHandler = (req, res) => {
  const error = "No existe la URL";
  const { method, originalUrl } = req;
  return res.status(404).json({ error, method, originalUrl });
};

export default pathHandler;
