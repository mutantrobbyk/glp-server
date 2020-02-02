select * from glp_users_info 
where email like $1
or phone_number like $2;