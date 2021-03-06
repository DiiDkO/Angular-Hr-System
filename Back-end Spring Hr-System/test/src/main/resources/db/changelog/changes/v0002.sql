CREATE TABLE "users" (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR (100) NOT NUll,
    active BOOLEAN DEFAULT false,
    first_name VARCHAR (50) NOT NULL,
    middle_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    email VARCHAR (255) NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY("manager_id") REFERENCES "users"(id)
);


CREATE TABLE "groups" (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR (255) NULL,
    manager_id INTEGER,
    FOREIGN KEY ("manager_id") REFERENCES "users"(id)
);

CREATE  TABLE "roles"(
    id BIGSERIAL PRIMARY KEY NOT NUll,
    name VARCHAR (255) NOT NULL
);

CREATE TABLE "leave_types"(
    id BIGSERIAL PRIMARY KEY NOT NUll,
    name VARCHAR (255) NOT NULL
);

CREATE TABLE "users_groups" (
    "users_id" INTEGER NOT NULL,
    "groups_id" INTEGER NOT NULL,
    FOREIGN KEY ("users_id") REFERENCES "users"(id) ON DELETE CASCADE,
    FOREIGN KEY ("groups_id") REFERENCES "groups"(id) ON DELETE CASCADE
);

CREATE TABLE "groups_roles" (
    "groups_id" INTEGER NOT NULL,
    "roles_id" INTEGER  NOT NULL,
    FOREIGN KEY ("groups_id") REFERENCES "groups"(id) ON DELETE CASCADE,
    FOREIGN KEY ("roles_id") REFERENCES "roles"(id) ON DELETE CASCADE
);

CREATE TABLE "leave_requests"(
    id BIGSERIAL PRIMARY KEY NOT NUll,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    requested_days INTEGER NOT NULL,
    status VARCHAR (255) NOT NULL,
    leave_type_id INTEGER NOT NULL,
    requestor_id INTEGER  NOT NULL,
    approver_id INTEGER  NOT NULL,
    FOREIGN KEY ("leave_type_id") REFERENCES "leave_types"(id),
    FOREIGN KEY ("requestor_id") REFERENCES "users"(id),
    FOREIGN KEY ("approver_id") REFERENCES "users"(id)
);

INSERT INTO users(username, password, active, first_name, middle_name, last_name, email, manager_id)
VALUES ('admin','$2a$10$l44Zd4yeEWBh7Ie5qCP07.YpHQiUJzA1GohNPEmt6JXv5ClO0VvJe',true,'DSS','Test','Admin','dssAdmin@dss.bg', null);

INSERT INTO groups(name, email, manager_id)
VALUES ('DSS Admin','dssAdminGroup@dss.bg',  null);

INSERT INTO roles(name)
VALUES ('admin');

INSERT INTO roles(name)
VALUES ('user');

INSERT INTO groups_roles(groups_id, roles_id)
VALUES (1,1);

INSERT INTO users_groups(users_id, groups_id)
VALUES (1,1);