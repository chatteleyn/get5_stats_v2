# get5_matchs_stats_v2

A WIP project to display get5 CS:GO matches statitistics in a browser

## Usage

### SQL tables

Follow the [official instructions](https://github.com/splewis/get5/wiki/Stats-system) to activate statistics in get5

You can use `generate_tables.sql` to generate the tables needed by get5 and `tables_filler.sql` to fill the database tables with test data if you want

### Connexion

In `app.js`, modify the var `connexionInfos` with your mysql connexion infos to connect to the database

### Execution

```bash
node app.js
```
Default URL to access the stats is `localhost:8000`

## License

[MIT](https://choosealicense.com/licenses/mit/)