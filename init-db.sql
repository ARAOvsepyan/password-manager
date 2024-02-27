CREATE TABLE "users"(
    "id" UUID NOT NULL,
    "login" CHAR(255) NOT NULL,
    "password" CHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) WITH TIME zone NOT NULL,
    "updatedAt" TIMESTAMP(0) WITH TIME zone NOT NULL
);
ALTER TABLE "users" ADD PRIMARY KEY("id");

CREATE TABLE "users_infos"(
    "id" integer NOT NULL DEFAULT nextval('users_infos_id_seq'::regclass),
    "last_name" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "first_name" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "patronymic" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "position" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "departament" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" uuid,
);
ALTER TABLE "users_infos" ADD PRIMARY KEY("id");

CREATE TABLE "jwt_tokens"(
    "id" SERIAL NOT NULL,
    "refreshToken" CHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) WITH TIME zone NOT NULL,
    "updatedAt" TIMESTAMP(0) WITH TIME zone NOT NULL, 
    "userId" UUID NOT NULL
);

ALTER TABLE "jwt_tokens" ADD PRIMARY KEY("id");

ALTER TABLE "jwt_tokens" ADD CONSTRAINT "jwt_tokens_userid_foreign" FOREIGN KEY("userId") REFERENCES "users"("id");

ALTER TABLE "users_infos" ADD CONSTRAINT "users_infos_userid_foreign" FOREIGN KEY("userId") REFERENCES "users"("id");