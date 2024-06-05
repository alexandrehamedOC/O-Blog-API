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
    const result = await this.client.query(`SELECT * FROM insert_${this.constructor.writeTableName}($1)`, [input]);
    return result.rows[0];
  }

  async update(id, input) {
    const result = await this.client.query(`SELECT * FROM update_${this.constructor.writeTableName}($1, $2)`, [id, input]);
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.client.query(`DELETE FROM ${this.constructor.writeTableName} WHERE id = $1`, [id]);
    // On transforme 0 ou 1 en false ou true
    // Donc on s'assure que la méthode renvoi une valeur de type boolean
    return !!result.rowCount;
  }
}
