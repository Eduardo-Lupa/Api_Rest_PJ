import Books from "../model/books-model";
import db from "../database/postgres";

class booksController {
    
    async findAllBooks(): Promise<Books[]> {
        const query = `
            SELECT * FROM books
        `;
        const result = await db.query(query);

        return result.rows || []; // retornando todas as linhas
    }

    async findByUuid(uuid: string): Promise<Books> {
        const query = `
            SELECT * FROM books 
            WHERE uuid = $1
        `;
        const values = [uuid];

        const result = await db.query(query, values);
        
        return result.rows[0]; // a lista terá  apenas 1 valor
    }

    async addBook(name: string, author: string): Promise<string> {
        const query = `INSERT INTO books(name, author) VALUES ($1, $2)
            RETURNING uuid    
        `;
        const values = [name, author];

        const result = await db.query<{uuid: string}>(query, values);
        
        return result.rows[0].uuid; // resultado > linhas na posicao 0 > uuid dessa linha(row)
    };

    async updateBook(uuid: string, name: string, author: string): Promise<void> {
        const query = `UPDATE books 
                SET name = $1, 
                author = $2
            WHERE uuid = $3    
        `; 
        const values = [name, author, uuid];

        await db.query(query,values);
    };

    async removeBook(uuid: string): Promise<void> {
        const query = `DELETE FROM books 
            WHERE uuid = $1    
        `; 
        const values = [uuid];
        await db.query(query, values);
    };

};


export default new booksController();
