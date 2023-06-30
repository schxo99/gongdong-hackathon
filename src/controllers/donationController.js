const pool = require("../../middleware/db");

exports.donation = async (req,res)=>{
	try{
		console.log("donation 실행")
		const {roomId, userId} = req.body;
		const selectUser = await pool.query("SELECT * FROM joinRoom WHERE donateInfo = (SELECT min(donateInfo) FROM joinRoom where roomId = ?)", [roomId])
		console.log(selectUser[0][0].userId)
		if (selectUser[0][0].userId === userId){
			const selectBO = await pool.query("select * from BO")
			
			res.status(200).send(selectBO[0])
		}else{
			res.status(200).send("최대 개근자가 아닙니다.")
		}
		res.status(200).send(selectUser[0][0].userId)
	}catch(error){
		console.log("donationError", error)
	}
}

exports.pick = async(req,res)=>{
	try{
		console.log("pick 실행")
		const {roomId, BOId, userId} = req.body;
		const donationMoney = await pool.query("select hasMoney from room where roomId = ?", [roomId]);
		console.log(donationMoney[0])
		const donation = await pool.query("update BO set benefit = benefit + ? where BOId = ?",[donationMoney[0][0].hasMoney, BOId]);
		const delMondy = await pool.query("update room set hasMoney = 0 where roomId = ?", [roomId]);
		const insertDonation = await pool.query("insert into donateInfo (iddonateInfo, roomId, price, wherePlace) values (?,?,?,?)",[userId, roomId, donationMoney[0][0].hasMoney, BOId])
		const insertRoomUserInfo = (await pool.query("select userId from joinRoom where roomId = ?",[roomId]))[0]
		console.log(insertRoomUserInfo)
		res.status(200).send("기부 성공했습니다.")
	}catch(error){
		console.log("pickError", error)
		res.status(500).send("기부실패했습니다.")
	}
}
