drop database if exists todo;
create database todo;
use todo;
create table task(
    id int primary key auto_increment,
    description varchar(255) not null
);

insert into task (description) values('my test task');
insert into task (description) values('my another task');