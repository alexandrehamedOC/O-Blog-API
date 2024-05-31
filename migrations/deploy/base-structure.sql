-- Deploy oblog:base-structure to pg

BEGIN;

CREATE TABLE "categories" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" text NOT NULL UNIQUE,
  "route" text NOT NULL UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "posts" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" text NOT NULL UNIQUE,
  "slug" text NOT NULL UNIQUE,
  "excerpt" text,
  "content" text,
  "categories_id" int NOT NULL REFERENCES "categories" ("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

COMMIT;
