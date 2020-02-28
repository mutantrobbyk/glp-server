module.exports = {
    changePoints: async (req, res) => {
        const db = req.app.get('db')
        const{phone_number, business_id} = req.params
        let user = await db.find_user_by_phone(phone_number)
        if(user.length < 1) {
            res.status(400).send("user not found")
        }
        let id = user[0].users_id
        let points = await db.get_user_points([id, business_id])
        if (points === null){
            await db.update_user_points([points,id,business_id]).then(result => {
                res.status(200).send(result)
            })
        }
        points += req.body.points
        await db.update_user_points([points, id, business_id]).then(result => {
            res.status(200).send(result)
        })
    }
}