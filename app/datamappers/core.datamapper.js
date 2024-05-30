export default class CoreDatamapper {
  static tableName = null;

  constructor(client) {
    this.client = client;
  }

  async findAll() {
    const result = await this.client.query(`SELECT * FROM ${this.constructor.tableName}`);
    return result.rows;
  }

  async findById(id) {
    const result = await this.client.query(`SELECT * FROM ${this.constructor.tableName} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async create(input) {
    const keys = Object.keys(input).map((column) => `"${column}"`);
    const placeholders = Object.keys(input).map((_, index) => `$${index + 1}`);
    const values = Object.values(input);
    console.log(`
    INSERT INTO "${this.constructor.tableName}"
    (${keys})
    VALUES (${placeholders})
  `)
    const result = await this.client.query(`
      INSERT INTO "${this.constructor.tableName}"
      (${keys})
      VALUES (${placeholders})
      RETURNING *
    `, values);
    return result.rows[0];
  }

  async update(id, input) {
    const keyValues = Object.keys(input).map((column, index) => `"${column}" = $${index + 1}`);
    const values = Object.values(input);

    const result = await this.client.query(`
      UPDATE ${this.constructor.tableName} SET
        ${keyValues},
        updated_at = now()
      WHERE id = $${keyValues.length + 1}
      RETURNING *
    `, [
      ...values,
      id,
    ]);
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.client.query(`DELETE FROM ${this.constructor.tableName} WHERE id = $1`, [id]);
    return !!result.rowCount;
  }
}
