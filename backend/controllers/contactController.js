import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  const msg = await Contact.create(req.body);
  res.json(msg);
};