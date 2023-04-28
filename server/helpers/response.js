const response = (res, statusCode, status, message, data) => {
    const result = {
        status,
        message,
        data,
    };
    res.status(statusCode).json(result);
};

const responseError500 = (res, error) => {
    // const result = {
    //     status: "Internal server error",
    //     message: "Internal server error",
    //     data: error
    // };
    console.log(error);
    res.status(500).json(error);
};

module.exports = { response, responseError500 };