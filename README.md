# AUDIT-WEB

clone the project

install RethinkDB `docker run -P --name rethink-server -p 8080:8080 -p 28015:28015 -p 29015:29015 -d rethinkdb`

build the project `docker build -t audit-web .`

run the project `docker run --name audit-web --link rethink-server:rethink-server -it --rm -p 3000:3000 audit-web`

open web `localhost:3000`

open rethinkdb web `localhost:8080`

insert to rethinkdb...

`
r.db('moip').table('validate').insert(
	{
		"id": "KEY-01",
		"app": "beckenbauer",
		"data_begin": "JSON-DATA-END",
		"data_end": null
	});
`

update register...

`
r.db('moip').table('validate').filter({id: "KEY-01"}).update(
	{
		"data_end": "JSON-DATA-BEGIN"
	}
);
`

see the change on page.