CREATE DATABASE centro-edu
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


CREATE TABLE School (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    address VARCHAR,
	code varchar,
	director varchar,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Gender (
    id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL,
    literal VARCHAR
);

INSERT INTO public.gender(
	description, literal)
	VALUES ( 'masculino', 'm');
INSERT INTO public.gender(
	description, literal)
	VALUES ( 'femenino', 'f');

CREATE TABLE Teacher (
    id SERIAL PRIMARY KEY,
    names varchar NOT NULL,
    surnames VARCHAR NOT NULL,
	address varchar,
	birth_date TIMESTAMP NOT NULL,
	speciatization varchar NOT NULL,
	position varchar,
	id_gender integer NOT NULL,
	id_school integer NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_gender) REFERENCES gender (id) ON DELETE CASCADE,
    FOREIGN KEY (id_school) REFERENCES school (id) ON DELETE CASCADE
);

CREATE TABLE Country (
    id SERIAL PRIMARY KEY,
    description varchar NOT NULL,
    nationality VARCHAR,
	literal varchar,
	code integer NOT NULL
);

CREATE TABLE Degree (
    id SERIAL PRIMARY KEY,
    description varchar NOT NULL,
    stage VARCHAR
);

CREATE TABLE School_Period (
    id SERIAL PRIMARY KEY,
    description varchar NOT NULL
);

CREATE TABLE Section (
    id SERIAL PRIMARY KEY,
    description varchar NOT NULL
);

CREATE TABLE Student (
    id SERIAL PRIMARY KEY,
    names varchar NOT NULL,
    surnames varchar NOT NULL,
	address varchar,
	birth_date TIMESTAMP NOT NULL,
	id_gender integer NOT NULL,
	id_school integer NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_gender) REFERENCES Gender (id) ON DELETE CASCADE
    FOREIGN KEY (id_school) REFERENCES School (id) ON DELETE CASCADE
);

CREATE TABLE Document (
    id SERIAL PRIMARY KEY,
    documentid_copy boolean NOT NULL,
    photo_2x2 boolean NOT NULL,
	birth_certificate boolean NOT NULL,
	doctor_certified boolean NOT NULL,
	certified_record boolean NOT NULL,
	id_student integer NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_student) REFERENCES Student (id) ON DELETE CASCADE
);

CREATE TABLE Modality (
    id SERIAL PRIMARY KEY,
    description varchar NOT NULL,
    num_semester integer NOT NULL,
	is_ordenance boolean NOT NULL,
	id_school integer NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_school) REFERENCES School (id) ON DELETE CASCADE
);

CREATE TABLE Inscription (
    id SERIAL PRIMARY KEY,
    id_school integer NOT NULL,
    id_document integer NOT NULL,
	id_student integer NOT NULL,
    FOREIGN KEY (id_school) REFERENCES School (id) ON DELETE CASCADE,
    FOREIGN KEY (id_document) REFERENCES Document (id) ON DELETE CASCADE,
    FOREIGN KEY (id_student) REFERENCES Student (id) ON DELETE CASCADE
);

CREATE TABLE Course (
    id SERIAL PRIMARY KEY,
    id_modality integer NOT NULL,
    id_section integer NOT NULL,
	id_degree integer NOT NULL,
	id_school_period integer NOT NULL,
	id_teacher integer NOT NULL,
	id_school integer NOT NULL,
	description varchar NOT NULL,
	max_quantity integer,
    FOREIGN KEY (id_modality) REFERENCES Modality (id) ON DELETE CASCADE,
    FOREIGN KEY (id_section) REFERENCES Section (id) ON DELETE CASCADE,
    FOREIGN KEY (id_degree) REFERENCES Degree (id) ON DELETE CASCADE,
    FOREIGN KEY (id_school_period) REFERENCES School_Period (id) ON DELETE CASCADE,
    FOREIGN KEY (id_teacher) REFERENCES Teacher (id) ON DELETE CASCADE,
    FOREIGN KEY (id_school) REFERENCES School (id) ON DELETE CASCADE
);

CREATE TABLE Student_List (
    id SERIAL PRIMARY KEY,
    id_student integer NOT NULL,
    id_course integer NOT NULL,
	id_school_period integer NOT NULL,
	id_school integer NOT NULL,
	order_num integer NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_student) REFERENCES Student (id) ON DELETE CASCADE,
    FOREIGN KEY (id_course) REFERENCES Course (id) ON DELETE CASCADE
    FOREIGN KEY (id_school_period) REFERENCES School_Period (id) ON DELETE CASCADE
    FOREIGN KEY (id_school) REFERENCES School (id) ON DELETE CASCADE
);
