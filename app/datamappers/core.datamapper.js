export default class CoreDatamapper {
  static readTableName = null;
  static writeTableName = null;
  static _instance;

  constructor(client) {
    this.client = client;
    // Afin d'optimiser la mémoire du processus on peut faire en sorte de retourneer toujours la même instance a partir de la première instanciation (Singleton)
    if(!this.constructor._instance){
      this.constructor._instance = this;
    }
    return this.constructor._instance;
  }

  async findAll() {
    const result = await this.client.query(`SELECT * FROM ${this.constructor.readTableName}`);
    return result.rows;
  }

  async findById(id) {
    const result = await this.client.query(`SELECT * FROM ${this.constructor.readTableName} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async create(input) {
    const columns = Object.keys(input).map((column) => `"${column}"`);
    const placeholders = Object.keys(input).map((_, index) => `$${index + 1}`); // 0 => $1, 1 => $2
    const values = Object.values(input);

    /*
    columns ==> ['"label"', '"route"']
    explication : `${columns}` ==> columns.toString() ==> columns.join() ==> 'label,route'

    placeholders ==> ['$1', '$2']

    values ==> ['Angular','/angular']
    */

    const result = await this.client.query(`
      INSERT INTO "${this.constructor.writeTableName}"
      (${columns})
      VALUES (${placeholders})
      RETURNING *
    `, values);
    return result.rows[0];
  }

  async update(id, input) {
    const fieldPlaceholders = Object.keys(input).map((column, index) => `"${column}" = $${index + 1}`);
    const values = Object.values(input);
    /*
    fieldPlaceholders ==> ['"label" = $1', '"route" = $2']
    values ==> ['Angular','/angular']
    */
    const result = await this.client.query(`
      UPDATE ${this.constructor.writeTableName} SET
        ${fieldPlaceholders},
        updated_at = now()
      WHERE id = $${fieldPlaceholders.length + 1}
      RETURNING *
    `, [
      ...values,
      id,
    ]);
    /*
    On aurai pu faire la requête :
    values.id = id;
    */
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.client.query(`DELETE FROM ${this.constructor.writeTableName} WHERE id = $1`, [id]);
    // On transforme 0 ou 1 en false ou true
    // Donc on s'assure que la méthode renvoi une valeur de type boolean
    return !!result.rowCount;
  }
}
