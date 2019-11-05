module.exports = {
    insert_item: `INSERT INTO tbl_item(text) VALUES(?)`,
    read_item: `SELECT * FROM tbl_item`,
    create_table: `CREATE TABLE if not exists tbl_item(
        id int primary key auto_increment,
        text varchar(255) not null
    )`
}