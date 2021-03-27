CREATE TABLE public.pines
(
    name character varying(50),
    requirement integer,
    id integer,
    PRIMARY KEY (id)
);

ALTER TABLE public.pines
    OWNER to postgres;

ALTER TABLE public.users
    ADD COLUMN name character varying(50);
    ADD COLUMN pin_id integer REFERENCES pines ( id );


