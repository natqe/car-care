const production = process.env.NODE_ENV === 'production'

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`${!production ? 'src' : 'dist'}/**/**.entity.${!production ? `t` : `j`}s`],
  autoSchemaSync: true,
  synchronize: !production,
  logging: !production,
  ssl: production,
  // dropSchema: true
}