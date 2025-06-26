const db = require('../config/database');

class Product {
    static async create(productData) {
        const { name, price, quantity } = productData;
        
        const [result] = await db.execute(
            'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
            [name, price, quantity]
        );
        
        return result.insertId;
    }
    
    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
        return rows;
    }
    
    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }
    
    static async update(id, productData) {
        const { name, price, quantity } = productData;
        
        const [result] = await db.execute(
            'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
            [name, price, quantity, id]
        );
        
        return result.affectedRows > 0;
    }
    
    static async delete(id) {
        const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Product;