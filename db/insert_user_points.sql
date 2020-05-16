insert into glp_points (points, users_id, business_id)
values ($1, $2, $3)
returning *;