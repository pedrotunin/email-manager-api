create table email_queue (
	email_id serial,
	email_from text not null,
	email_to text not null,
	email_subject text not null,
	email_text text,
	email_html text,
	sent_at timestamp default null,
	sent boolean default false
);

create table users(
	id serial,
	email text not null,
	pwd text not null,
	unique(email)
);

create table secret (
	secret text default null
);
