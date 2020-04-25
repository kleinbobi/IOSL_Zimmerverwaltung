create table Hotelzimmer
(
    ZimmerNr     int        not null
        primary key,
    Typ          varchar(2) null,
    Betten       int        null,
    Zusatzbetten int        null
);

create table alloggiato
(
    Codice      int         not null
        primary key,
    Descrizione varchar(30) null
);

create table ausweis
(
    ausweis_nr varchar(30)  not null
        primary key,
    typ        varchar(100) not null,
    land       varchar(100) not null
);

create table buchung
(
    buchungid int auto_increment
        primary key,
    ankunft   varchar(10) not null,
    abfahrt   varchar(10) not null,
    name      varchar(70) null
);

create table buchung_zimmer
(
    buchungid int not null,
    zimmerID  int null,
    constraint buchung_zimmer_buchung_buchungid_fk
        foreign key (buchungid) references buchung (buchungid)
            on update cascade on delete cascade
);

create index buchung_zimmer_Hotelzimmer_ZimmerNr_fk
    on buchung_zimmer (zimmerID);

create table comuni
(
    Codice      int         not null
        primary key,
    Descrizione varchar(40) null,
    Provincia   varchar(40) null,
    DataInizio  varchar(40) null,
    DataFine    varchar(40) null
);

create table documento
(
    Codice      varchar(10) not null
        primary key,
    Descrizione varchar(30) null
);

create table gast
(
    id           int auto_increment
        primary key,
    vorname      varchar(150)     not null,
    nachname     varchar(150)     not null,
    geburtdatum  varchar(10)      null,
    geburtsort   varchar(150)     null,
    tel          varchar(20)      null,
    ausweis      varchar(30)      null,
    email        varchar(100)     null,
    wohnland     varchar(150)     null,
    str          varchar(50)      null,
    PLZ          varchar(20)      null,
    wohnort      varchar(150)     null,
    gender       char default 'm' not null,
    geburtsortIT varchar(150)     null,
    constraint gast_ausweis_ausweis_nr_fk
        foreign key (ausweis) references ausweis (ausweis_nr)
            on update cascade on delete cascade
);

create table gruppe
(
    gruppeID int auto_increment
        primary key,
    familie  tinyint(1)           not null,
    gesendet tinyint(1) default 0 not null
);

create table buchung_gruppe
(
    buchung int null,
    gruppe  int null,
    constraint buchung_gruppe_buchung_buchungid_fk
        foreign key (buchung) references buchung (buchungid)
            on update cascade on delete cascade,
    constraint buchung_gruppe_gruppe_gruppeID_fk
        foreign key (gruppe) references gruppe (gruppeID)
            on update cascade on delete cascade
);

create table gruppe_gast
(
    gruppeID int null,
    gastID   int null,
    constraint gastID
        foreign key (gastID) references gast (id)
            on update cascade on delete cascade,
    constraint gruppeID
        foreign key (gruppeID) references gruppe (gruppeID)
            on update cascade on delete cascade
);

create table stati
(
    Codice      int         not null
        primary key,
    Descrizione varchar(40) null,
    Provincia   varchar(40) null,
    Datainizio  varchar(40) null,
    DataFine    varchar(40) null
);

create table user
(
	username varchar(50) not null,
	passhash varchar(200) not null
);

create unique index user_username_uindex
	on user (username);

alter table user
	add constraint user_pk
		primary key (username);

