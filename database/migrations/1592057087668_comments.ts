import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('message')
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('cascade')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
