const pool = require("../../middleware/db");

exports.viewRoom = async (req,res)=>{
	try{
		
		const roomInfo = await pool.query("select * from room");

		res.send(roomInfo[0])
		
	}catch(error){
		console.log("viewRoomError", error)
		res.status(500).send("등록된 방이 없습니다.")
	}
}

exports.joinRoom = async(req,res)=>{
	try{
		const { roomId, userId } = req.body;
		console.log(roomId, userId)
		
		const selectJoinInfo = await pool.query("select * from joinRoom where roomId = ? and userId = ?", [roomId, userId]);
		
		try {
			if (selectJoinInfo[0][0].roomId === roomId){
			res.status(500).send("이미 가입한 방입니다.")
			}
		} catch(error) {
			const joinRoom = await pool.query("insert into joinRoom (roomId, userId) values(?, ?)", [roomId, userId])
			res.status(200).send("방 가입 완료")
	
		}		
	}catch(error){
		console.log("joinRoomError", error)
		res.status(500).send("방 가입 실패")
	}
}

exports.myJoinRoom = async(req,res)=>{
	try{
		const {userId} = req.body;
		
		const selectMyJoinRoom = await pool.query("select * from joinRoom where userId = ?", [userId])
		
		res.status(200).send(selectMyJoinRoom[0])
	}catch(error){
		console.log("myJoinRoomError", error)
		res.status(500).send("방조회오류")
	}
}

exports.postChat = async(req,res)=>{
	try{
		
		const {roomId, userId, ment} = req.body;
		console.log(roomId, userId, ment)
		const roomInfo = await pool.query("select * from room where roomId = ?",[roomId])
		if ( typeof ment !== 'undefined' ) {
			
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = String(currentDate.getMonth() + 1).padStart(2, '0');
			const day = String(currentDate.getDate()).padStart(2, '0');
			const hours = String(currentDate.getHours()).padStart(2, '0');
			const minutes = String(currentDate.getMinutes()).padStart(2, '0');
			const seconds = String(currentDate.getSeconds()).padStart(2, '0');
			const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

			const insertChat = await pool.query("insert into chat (roomId, userId, ment, time) values (?, ?, ?, ?)",[roomId, userId, ment, dateTime])
			const selectChat = await pool.query("select * from chat where roomId = ?", [roomId])
		
			res.status(200).json({
				"roomInfo":roomInfo[0],
				"userId" : userId,
				"chatInfo" : selectChat[0]
			})
			
		}else{
			
			const selectChat = await pool.query("select * from chat where roomId = ? and userId = ?", [roomId, userId])
			res.status(200).json({
				"roomInfo":roomInfo[0],
				"chatInfo":selectChat[0]
					 })
		}
		
	}catch(error){
		console.log("postChatError", error)
		res.status(500).send("전송실패")
	}
}

exports.promise = async(req, res) =>{
	try{
		const {roomId, roomName, promiseDate, promiseTime, promiseMaxPrice, promisePlace} = req.body;
		const insertPromise = await pool.query("insert into promise (roomId, roomName, promiseDate, promiseTime, promiseMaxPrice, promisePlace) values  (?,?,?,?,?,?)",[roomId, roomName, promiseDate, promiseTime, promiseMaxPrice, promisePlace])
		
		res.status(200).send("확인되었습니다.")
		
	}catch(error){
		console.log("promiseError", error)
		res.status(500).send("실패했습니다.")
	}
}