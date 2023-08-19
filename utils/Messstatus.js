const sendMessage = async (res, statuscode, Message, messagetitile) => {
    res.status(statuscode).json({
        success: true,
        Message: Message,
    })
}

export default sendMessage