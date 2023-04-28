CREATE TABLE `items` (
	`id` integer PRIMARY KEY NOT NULL,
	`hash` text NOT NULL,
	`title` text NOT NULL,
	`dt` text NOT NULL,
	`cat` text NOT NULL,
	`size` integer,
	`ext_id` text,
	`imdb` text
);
