const config = require("./config");

const getWhere = (where) => {
    const andParams = [];
    let andQuery = "";
    let isFirst = true;


    Object.keys(where).forEach(filter => {
        if (!isFirst) {
            andQuery += " AND ? ";
        } else {
            andQuery += " ? ";
            isFirst = false;
        }
        andParams.push({ [filter]: where[filter] });
    });

    return [andQuery, andParams];
};

class MysqlTool {
    constructor(db) {
        this.db = db;
    }
    getItems(table) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM ??', [table], (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
    getColumns(table) {
        return new Promise((resolve, reject) => {
            this.db.query(
                'SELECT COLUMN_NAME FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`= ? AND `TABLE_NAME`=?',
                [config.db.database, table], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
        });
    }
    getItemsByParams(table, params) {
        return new Promise(async (resolve, reject) => {
            const columns = (await this.getColumns(table)).map(item => item["COLUMN_NAME"]);
            const ans = Object.keys(params).forEach(key => {
                if (!(columns.indexOf(key) + 1)) {
                    reject({ "error": key + " column is not in function." });
                }
            });
            const whereParams = getWhere(params);
            this.db.query('SELECT * FROM ?? WHERE ' + whereParams[0], [table, ...whereParams[1]], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });

        });
    }
    getItemsById(table, id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM ?? WHERE id=?', [table, id], (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
    post(table, data) {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO ?? SET ?", [table, data], (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
    delete(table, id) {
        return new Promise((resolve, reject) => {
            this.db.query('DELETE FROM ?? WHERE id=?', [table, id], (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
    put(table, data, id) {

        return new Promise((resolve, reject) => {
            this.db.query('UPDATE ?? SET ? WHERE id=?', [table, data, id], (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
}
module.exports = MysqlTool;