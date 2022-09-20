INSERT INTO department(name)
VALUES ('Silly things inc');

INSERT INTO role(title, salary, department_id)
VALUES ('vp of goofyness', 100000, 1),
('Intern of funny business', 100, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Lucian', 'Samosata', 1, NULL),
('Homer', 'Troy', 2, 1);
