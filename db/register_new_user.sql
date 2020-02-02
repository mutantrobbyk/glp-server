insert into glp_users_info
(email, phone_number, password)
values($1, $2, $3)
returning *;