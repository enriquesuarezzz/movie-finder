CREATE TABLE genres (
    id bigint primary key generated always as identity,
    name text not null
);

CREATE TABLE directors (
    id bigint primary key generated always as identity,
    name text not null
);

CREATE TABLE movies (
    id bigint primary key generated always as identity,
    title text not null,
    release_date date not null,
    genre_id bigint references genres(id),
    director_id bigint references directors(id)
);

CREATE TABLE actors (
    id bigint primary key generated always as identity,
    name text not null
);

CREATE TABLE movie_actors (
    movie_id bigint references movies(id),
    actor_id bigint references actors(id),
    primary key (movie_id, actor_id)
);

CREATE TABLE users (
    id bigint primary key generated always as identity,
    username text not null unique,
    email text not null unique,
    password_hash text not null,
    created_at timestamp with time zone default now()
);

CREATE TABLE user_favorites (
    user_id bigint references users(id),
    movie_id bigint references movies(id),
    added_at timestamp with time zone default now(),
    primary key (user_id, movie_id)
);