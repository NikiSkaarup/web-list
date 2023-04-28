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
--> statement-breakpoint
CREATE UNIQUE INDEX `ix__id` ON `items` (`id`);--> statement-breakpoint
CREATE INDEX `ix__title` ON `items` (`title`);--> statement-breakpoint
CREATE INDEX `ix__dt` ON `items` (`dt`);--> statement-breakpoint
CREATE INDEX `ix__cat` ON `items` (`cat`);--> statement-breakpoint
CREATE INDEX `ix__size` ON `items` (`size`);--> statement-breakpoint
CREATE INDEX `ix__ext_id` ON `items` (`ext_id`);--> statement-breakpoint
CREATE INDEX `ix__imdb` ON `items` (`imdb`);
