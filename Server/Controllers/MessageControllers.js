import MessageModel from "../Models/MessageModel.js";

const fetchMessages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const contactId = req.params.id;

    const messages = await MessageModel.find({
      $or: [
        { sender: userId, reciever: contactId },
        { sender: contactId, reciever: userId },
      ],
    }).sort({ createdAt: 1 }); // oldest → newest

    res.status(200).send({ message: "Messages fetched", messages });
  } catch (error) {
    console.log(error);
  }
};

export { fetchMessages };
