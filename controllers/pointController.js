module.exports = {
    changePoints: async (req, res) => {
        const db = req.app.get('db')
        const{phone_number, business_id} = req.params
        let user = await db.find_user_by_phone(phone_number)
        if(user.length < 1) {
            res.status(400).send("user not found")
        }
        console.log(user)
        let id = user[0].users_id
        let points = await db.get_user_points([id, business_id])
        if (points === []){
            await db.insert_user_points([points,id,business_id]).then(result => {
                res.status(200).send(result)
            })
        }else {
            points[0] += req.body.points
            await db.update_user_points([points[0], id, business_id]).then(result => {
                res.status(200).send(result)
            })
        }
    }
}