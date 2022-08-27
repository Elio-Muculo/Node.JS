const verify = (req, res, next) => {   
    const token = req.headers.token;
    if (!token) return res.sendStatus(403);
    console.log(token);
    next();
}


module.exports = verify 