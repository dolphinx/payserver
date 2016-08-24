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
create index BASE_ACCOUNT_PID on BASE_ACCOUNT (
	PID
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
create index ACCOUNT_PID on ACCOUNT (
	PID
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
create index CATEGORY_PID on CATEGORY (
	PID
);

create table TRADE0(
	ID integer primary key autoincrement,
	SPLIT integer,
	TIME timestamp not null,
	LOCATION text,
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
create index TRADE0_SPLIT on TRADE0 (
	SPLIT
);

create table TRADE1(
	ID integer primary key autoincrement,
	TID integer,
	TIME timestamp not null,
	LOCATION text,
	AID integer,
	PAYAMOUNT integer,
	CID integer,
	OID integer,
	MID integer,
	AMOUNT integer,
	DISCOUNT integer,
	COUPON integer
);
create index TRADE1_TID on TRADE1 (
	TID
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
create index CHARGE_TID on CHARGE (
	TID
);

create table PAY(
	ID integer primary key autoincrement,
	TID integer,
	AID integer,
	PAYAMOUNT integer
);
create index PAY_TID on PAY (
	TID
);

CREATE VIEW TRADE AS
	SELECT ID,
		   0 TID,
		   TIME,
		   LOCATION,
		   AID,
		   PAYAMOUNT,
		   CID,
		   OID,
		   MID,
		   AMOUNT,
		   DISCOUNT,
		   COUPON
	  FROM TRADE0
	 WHERE SPLIT = 0
	UNION ALL
	SELECT ID,
		   TID,
		   TIME,
		   LOCATION,
		   AID,
		   PAYAMOUNT,
		   CID,
		   OID,
		   MID,
		   AMOUNT,
		   DISCOUNT,
		   COUPON
	  FROM TRADE1;
