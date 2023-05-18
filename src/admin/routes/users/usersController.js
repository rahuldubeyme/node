const { Users } = require('../../../../models');   

class usersController{

    async userPage(req, res) {  

        res.render('users/list');   
        
    };  


    async list(req, res) {
        let reqData = req.query;
        let columnNo = parseInt(reqData.order[0].column);
        let sortOrder = reqData.order[0].dir === 'desc' ? -1 : 1;

        let query = {
        };
        let filterCondition = {};
      
 
        let sortCond = { created: sortOrder };
        let response = {};
        switch (columnNo) {
            case 1:
                sortCond = {
                    fullName: sortOrder,
                };
                break;
            case 5:
                sortCond = {
                    isSuspended: sortOrder,
                };
                break;
            default:
                sortCond = { created: sortOrder };
                break;
        }

        let skip = parseInt(reqData.start);
        let limit = parseInt(reqData.length);
        let userData = await Users.aggregate([
            {
                $match: query,
            },


            { $match: filterCondition },
            {
                $sort: sortCond,
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    items: { $push: '$$ROOT' },
                },
            },
            {
                $project: {
                    count: 1,
                    items: {
                        $slice: ['$items', skip, limit],
                    },
                },
            },
        ]);
        const count = userData.length ? userData[0].count : 0;
        response.draw = 0;
        if (reqData.draw) {
            response.draw = parseInt(reqData.draw) + 1;
        }
        response.recordsTotal = count;
        response.recordsFiltered = count;

        let users = userData.length ? userData[0].items : [];

        if (users.length) {
            users = users.map(user => {
                let actions = '';

                actions = `<a href="/users/view/${user._id}" title="View"><i class="fa fa-eye"></i> </a>`;
                
                if(user.isDeleted == false){
                   
                    actions = `${actions}<a href="/users/delete/${user._id}" title="Remove" class="deleteItem"> <i class="fas fa-trash"></i> </a>`;
                    if (user.isSuspended) {
                        actions = `${actions}<a class="statusChange" href="/users/update-status?id=${user._id}&status=false" title="Activate"><i class="fa fa-check"></i></a>`;
                    }
                    else {
                        actions = `${actions}<a class="statusChange" href="/users/update-status?id=${user._id}&status=true" title="Inactivate"><i class="fa fa-ban"></i> </a>`;
                    }
    
                }
               
               

                return {
                    0: (skip += 1),
                    1: user.fullName || 'N/A',
                    2: user.userName || 'N/A',
                    3: user.email || 'N/A',
                    4: user.mobile ? `${user.countryCode}${user.mobile}` : 'N/A',
                    5: user.isSuspended ? `<span class="badge label-table badge-secondary">${req.__("IN_ACTIVE")}</span>` : `<span class="badge label-table badge-success">${req.__("ACTIVE")}</span>`,
                    6: showDateAccordingTimezone(user.created),
                    7: actions ? actions : '<span class="badge label-table badge-secondary">N/A</span>',
                };
            });
        }
        response.data = users;
        return res.send(response);
    }  


}

module.exports = new usersController()