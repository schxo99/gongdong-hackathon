const pool = require("../../middleware/db");

exports.signIn = async (req, res) => {
	
    const { userId, userPw } = req.body;
	console.log(userId, userPw)
	
    try {
        
		const userInfo = await pool.query("select * from users where id = ?",[userId])
		console.log(userInfo[0][0])
		
		if (userPw === userInfo[0][0].pw){
			
			res.status(200).json({
				"id":userInfo[0][0].id, 
				"name":userInfo[0][0].name
			})
			
		} else{
			res.status(500).send("로그인 실패")
		}
		
    } catch (error) {
		
		res.status(500).send("로그인 실패")
    }
};