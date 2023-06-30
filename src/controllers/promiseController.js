const pool = require("../../middleware/db");

exports.promise = async(req,res)=>{
	console.log('promise 실행')
	try{
		const {roomId} = req.body;
		const selectPromise = await pool.query("select * from promise where roomId = ?",[roomId])
		res.status(200).send(selectPromise[0])
	}catch(error){
		console.log("promiseError", error)
	}
}

exports.promiseDate = async(req,res) =>{
	try{
		console.log("promiseDate 실행")
		const { roomId, promiseDate } = req.body;
		const selectPromise = await pool.query("select * from promise where roomId = ? and promiseDate = ?", [roomId, promiseDate])
		res.status(200).send(selectPromise[0])
		
	}catch(error){
		console.log("promiseDateError", error)
	}
}

exports.createPromise = async(req, res) =>{
	try{
		console.log("createPromise 실행")	
		var {roomId, promiseDate, promiseTime, promiseMaxPrice, lat, lng} = req.body;		
		
		console.log(roomId, promiseDate, promiseTime, promiseMaxPrice, lat, lng)
		console.log("위도경도",lat, lng)
		var roomName = await pool.query("select roomName from room where roomId = ?",[roomId])
		var roomName = roomName[0][0].roomName
		const insertPromise = await pool.query("insert into promise (roomId, roomName, promiseDate, promiseTime, promiseMaxPrice, lat, lng) values  (?,?,?,?,?,?, ?)",[roomId, roomName, promiseDate, promiseTime, promiseMaxPrice, lat, lng])
		
		const selectPromise = await pool.query("select * from promise where roomId = ?",[roomId])
		res.status(200).json({promise:selectPromise[0]})
		
		
	}catch(error){
		console.log("promiseError", error)
		res.status(500).send("실패했습니다.")
	}
}

exports.joinPromise = async(req, res) =>{
	try{
		const {promiseId, userId} = req.body;
		console.log("joinPromise")
		const insertJoin = await pool.query("insert into joinPromise (promiseId, userId) values (?,?)",[promiseId, userId]);
		const insertSetGPS = await pool.query("insert into promiseGps (promiseId, userId) values (?,?)",[promiseId, userId]);
		res.status(200).send("참석 추가가 완료되었습니다.")
	}catch(error){
		console.log("joinPromise", error)
		res.status(500).send("참석 추가가 실패했습니다.")
	}
}

exports.gps = async(req,res) =>{
	try{
		var { promiseId, userId, lat,  lng } = req.body;
		console.log("이거보세요",promiseId, userId, lat,  lng)
		const selectTarget = await pool.query("select lat, lng from promise where promiseId = ?",[promiseId])
		const tlat = selectTarget[0][0].lat
		const tlng = selectTarget[0][0].lng
		
		const distance =(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)))*1000;
		const selectUsers = await pool.query("select * from promiseGps where promiseId = ?",[promiseId])
		if (distance < 30){
			const updateArrive = await pool.query("update promiseGps set arriveOX = o")
			res.status(200).json({"status":"도착", "users": selectUsers[0]})
		}else{
			const updateGps = await pool.query("update promiseGps set lat = ?, lng = ? where promiseId = ? and userId = ?",[lat, lng, promiseId, userId])
			res.status(200).json({"status":"가는중", "users":selectUsers[0]})
		}
		
	}catch(error){
		console.log("gpsError", error)
	}
}