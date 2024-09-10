const db = require('../models/index')

const findAllHomesRelatedToUser = async (req, res) => {
    try {
        const homes = await db.User.findAll({
            where: {id: req.query.user_id},
            include: {
                model: db.Home
            }
        });
        res.status(200).json({homes: homes[0]? homes[0].Homes: []});
    } catch (error) {
        
    }
}

module.exports = { findAllHomesRelatedToUser }