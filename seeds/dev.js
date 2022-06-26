const tUser = 'user';
const tProduct = 'product';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(tUser).del();
  await knex(tUser).insert([
    {name: '홍길동', addr: '서울시 종로구 종동'},
    {name: '임꺽정', addr: '부산시 해운대구 재송동'},
    {name: '장길산', addr: '대구시 수성구 황금동'}
  ]);

  await knex(tProduct).del();
  await knex(tProduct).insert([
    {name: '라디오', price: 1000},
    {name: '테레비', price: 2000},
    {name: '비디오', price: 3000}
  ]);
};
