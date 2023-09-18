import test from 'ava';
import { createLogger, transports, format } from 'winston';

import { newFilePlugin } from "./plugin.js"
import { getTableName, getTables } from "./tables.js"

test("loads a csv", async (t) => {
    const plugin = newFilePlugin();
    plugin.setLogger(createLogger({ level: "debug", format: format.simple(), transports: [new transports.Console({})]}));
    const tables = await getTables(plugin.getLogger(), "./test_data/sample.csv", 1, ",");
    t.is(tables.length, 1);
    t.deepEqual(tables[0].columns.map((c)=>c.name),["Name", "Count"]);
});

test("getTableName returns file name without extension", (t) => {
    const name = getTableName("test_data/sample.csv");
    t.is(name, "sample");
});