INSERT INTO department(name)
VALUES ('Silly things inc, HR department'),
        ('Silly things inc, Clown department'),
        ('Silly things inc, Waterballoon department'),
        ('Silly things inc, Danceing department');

INSERT INTO role(title, salary, department_id)
VALUES ('vp of goofyness', 100000, 1),
('Intern of funny business', 100, 4),
('CEO of monkeying around', 4000000, 3),
('CTO of smiles', 130000, 2),
('CFO of HR', 140000, 1),
('Janitor of Clowns', 72546, 2),
('Socal media manager of ice', 56000, 4),
('Mascot of silly things', 34000, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Lucian', 'Samosata', 1, 3),
('Homer', 'Troy', 2, 1),
('Huggy', 'BigButter', 3, NULL),
('Squids', 'Wigglesworth', 4, 3),
('Jeramy', 'Dance', 5, 4),
('Vladamer', 'Wobblewiggle', 6, 8),
('Candy', 'Mike', 7, 5),
('Happy', 'Smith', 8, 3),
('Abon','Fullington', 6, 8),
('Paper', 'Hands', 6, 8);
