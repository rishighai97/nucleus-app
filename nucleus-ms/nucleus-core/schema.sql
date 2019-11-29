create database nucleus_db;
create database employee_db;
use nucleus_db;
use employees;

select * from employees limit 100;
desc employees;
select first_name,hire_date from employees where gender='F' order by hire_date limit 100;

select e.first_name as 'FIRST NAME', e.last_name as 'LAST NAME', s.salary as 'SALARY' from employees e join salaries s on s.emp_no = e.emp_no;

select e.first_name as 'NAME', s.salary as 'SALARY' from employees e join salaries s on s.emp_no = e.emp_no order by s.salary desc limit 50;

select * from connection;
select * from shared_resource;
select * from report;
select * from dashboard;
select * from user;
select * from component;
alter table dashboard add column component_id int;

/*
------------------------------------------------------------------------------------------------------------
*/

truncate table connection;
truncate table shared_resource;
truncate table report;
truncate table dashboard;
truncate table user;
truncate table component;
commit;
describe connection;
describe shared_resource;
describe report;
describe dashboard;
describe connection;
describe user;
describe component;

ALTER TABLE dashboard
ADD FOREIGN KEY (component_id) REFERENCES Component(component_id);

insert into user(password,role,username) values('rishi','role_dev','rishi');
insert into user(password,role,username) values('shah','ROLE_DEV','mohit');
insert into connection(data_source_name,database_name,password,type,url,username) values("eat_it","mysql","rishi","jdbc","jdbc:mysql://localhost:3306/eat_it","root")
