import NotificationModel from "../Models/NotificationModel.js";

const getNotifications = async (req, res) => {
  const userId = req.user.userId;

  try {
    const notifications = await NotificationModel.find({ reciever: userId })
      .populate("sender", "username avatar")
      .sort({
        createdAt: -1,
      }); // Optional: sort by latest first

    return res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching notifications",
    });
  }
};

export { getNotifications };
