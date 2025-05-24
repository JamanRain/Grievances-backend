require('dotenv').config();

exports.login = (req, res) => {
  const { name, password } = req.body;

  if (name === "Mimansa" && password === process.env.MIMANSA_PASSWORD) {
    return res.status(200).json({ success: true, role: "Mimansa" });
  }

  if (name === "Raman" && password === process.env.RAMAN_PASSWORD) {
    return res.status(200).json({ success: true, role: "Raman" });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
};
