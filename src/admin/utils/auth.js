
class varifyClass{
 varifyToken = (req, res, next) => {
        const { user } = req;

        console.log('user in verify token==========', user)

        if(!req.session.user){
         res.redirect('/auth-login')
        }
    
        next(user)
    }

}

module.exports = new varifyClass() ;