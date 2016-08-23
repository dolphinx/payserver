create table UNIT(
	ID integer primary key autoincrement,
	NAME text unique,
	RATE real
);

create table ORIGINATOR(
	ID integer primary key autoincrement,
	NAME text unique,
	GROUPNAME text,
	TYPE integer,
	CREATE_TIME timestamp not null default (datetime('now','localtime'))
);

create table BASE_ACCOUNT(
	ID integer primary key autoincrement,
	NAME text not null,
	PID integer not null,
	TYPE integer,
	CREATE_TIME timestamp not null default (datetime('now','localtime'))
);

create table ACCOUNT(
	ID integer primary key autoincrement,
	NAME text not null,
	PID integer not null,
	WTL integer,
	IL integer,
	UID integer default 1,
	CREATE_TIME timestamp not null default (datetime('now','localtime'))
);

create table BASE_CATEGORY(
	ID integer primary key autoincrement,
	NAME text unique,
	REMARK text,
	CREATE_TIME timestamp not null default (datetime('now','localtime'))
);

create table CATEGORY(
	ID integer primary key autoincrement,
	NAME text not null,
	PID integer not null,
	REMARK text,
	CREATE_TIME timestamp not null default (datetime('now','localtime'))
);

create table TRADE0(
	ID integer primary key autoincrement,
	TIME timestamp not null,
	LOCATION text,
	SPLIT integer,
	AID integer,
	PAYAMOUNT integer,
	CID integer,
	OID integer,
	MID integer,
	AMOUNT integer,
	DISCOUNT integer,
	COUPON integer,
	REMARK text,
	CREATE_TIME timestamp not null default (datetime('now','localtime'))
);
create table TRADE1(
	ID integer primary key autoincrement,
	TID integer,
	TIME timestamp not null,
	LOCATION text,
	SPLIT integer,
	AID integer,
	PAYAMOUNT integer,
	CID integer,
	OID integer,
	MID integer,
	AMOUNT integer,
	DISCOUNT integer,
	COUPON integer
);
create table CHARGE(
	ID integer primary key autoincrement,
	TID integer,
	OID integer,
	CID integer,
	MID integer,
	AMOUNT integer,
	DISCOUNT integer,
	COUPON integer,
	REMARK text
);
create table PAY(
	ID integer primary key autoincrement,
	TID integer,
	AID integer,
	PAYAMOUNT integer
);
