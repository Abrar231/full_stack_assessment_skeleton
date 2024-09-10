const { Op } = require("sequelize");
const db = require("../models/index");

const findAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
    }
};

const findAllUsersRelatedToHome = async (req, res) => {
    try {
        const users = await db.Home.findAll({
            where: { id: req.query.home_id },
            include: {
                model: db.User,
            },
        });
        res.status(200).json({ users: users[0].Users });
    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
    }
};

const updateUsersForHome = async (req, res) => {
    try {
        const {checkList, home_id} = req.body;
    
        const selectedUsers = checkList.filter(user => user.checked);
        const selectedUserIds = selectedUsers.map(user => user.id);
    
        const currentUsers = await db.UserHomeJoin.findAll({where: {home_id}, attributes: ['user_id'], raw: true});
        const currentUserIds = currentUsers.map(user => user.user_id);

        const usersToAdd = selectedUserIds.filter(id => !currentUserIds.includes(id)).map(id => ({home_id, user_id: id}));
        const usersToRemove = currentUserIds.filter(id => !selectedUserIds.includes(id));

        await db.sequelize.transaction(async t => {
            await db.UserHomeJoin.bulkCreate(usersToAdd);

            await db.UserHomeJoin.destroy({
                where :{
                    home_id,
                    user_id: {
                        [Op.in]: usersToRemove
                    }
                }
            });

        });
    
        res.status(200).json({message: 'Users successfully updated'});
    } catch (error) {
        res.status(500).json({ error: 'Internal Error Occurred' });
    }
}

module.exports = { findAllUsers, findAllUsersRelatedToHome, updateUsersForHome };
