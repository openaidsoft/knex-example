const user = 'jlch';
const schema = 'knex_pg';

exports.up = function(knex) {
  /*
    pg는 접속시 데이터베이스와 스키마를 지정하여 접속함
    접속 후 스키마 생성 마이그레이션을 진행하면 
    마이그레이션 이력을 추적하는 knex_migrations, knex_migrations_lock 테이블이 기본 스키마인 public에 생성됨 
    이후의 작업은 새로 생성된 스키마 내에 마이그레이션 이력 테이블이 생성하여 진행
    그러므로 스키마를 생성하는 작업만큼은 knex 마이그레이션으로 진행하지 않아야 불필요한 테이블이 생성되지 않음 
  */
  return knex.schema
    // CASCADE 옵션으로 스키마 내의 모든 오브젝트도 함께 삭제
    .raw(`DROP SCHEMA IF EXISTS ${schema} CASCADE`)
    // AUTHORIZATION 옵션으로 현재 접속 계정과 동일한 이름으로 스키마 생성
    .raw(`CREATE SCHEMA IF NOT EXISTS ${schema} AUTHORIZATION ${user}`)
};

exports.down = function(knex) {
  return knex.schema
    // CASCADE 옵션으로 스키마 내의 모든 오브젝트도 함께 삭제
    .raw(`DROP SCHEMA IF EXISTS ${schema} CASCADE`)
};
