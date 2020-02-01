create table glp_users_info(
users_id serial primary key,
email varchar(150),
phone_number varchar(25),
password varchar(200)
);

create table glp_business(
business_id serial primary key,
business_name varchar,
business_img text
);

create table glp_users_business_list(
users_id int references glp_users_info(users_id),
business_id int references glp_business(business_id)
);

create table glp_promotions(
promotion_id serial primary key,
business_id int references glp_business(business_id),
promotion_name varchar,
point_value int
);

create table glp_admin(
is_employee boolean,
is_admin boolean,
super_admin boolean,
business_id int references glp_business(business_id),
users_id int references glp_users_info(users_id)
);

create table glp_points(
points int,
users_id int references glp_users_info(users_id),
business_id int references glp_business(business_id)
);