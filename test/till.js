let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Till', () => {
  describe('PUT /api/till', () => {
    it('should replace current till object with submitted coins', () => {
      let coins = {
        dimes: 10,
        pennies: 34
      };
      chai.request(server)
        .put('/api/till')
        .send(coins)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.coins.should.have.property('quarters').eq(0);
          response.body.coins.should.have.property('dimes').eq(10);
          response.body.coins.should.have.property('nickels').eq(0);
          response.body.coins.should.have.property('pennies').eq(34);
          response.body.should.have.property('value').eq(1.34);
        });

    });

    it('should replace current till object with submitted coins', () => {
      let coins = {
        dimes: 10,
        nickels: 3,
        pennies: 9
      };
      chai.request(server)
        .put('/api/till')
        .send(coins)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.coins.should.have.property('quarters').eq(0);
          response.body.coins.should.have.property('dimes').eq(10);
          response.body.coins.should.have.property('nickels').eq(3);
          response.body.coins.should.have.property('pennies').eq(9);
          response.body.should.have.property('value').eq(1.24);
        }) 
    });

    it('should replace current till object with submitted coins', () => {
      let coins = {
        dimes: 10,
      };
      chai.request(server)
        .put('/api/till')
        .send(coins)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('coins');
          response.body.coins.should.have.property('quarters').eq(0);
          response.body.coins.should.have.property('dimes').eq(10);
          response.body.coins.should.have.property('nickels').eq(0);
          response.body.coins.should.have.property('pennies').eq(0);
          response.body.should.have.property('value').eq(1);
        })          
    });

  });

  describe('PATCH /api/till', () => {
    it('should add to the till object with submitted coins', () => {
      let coins = {
        quarters: 4,
        nickels:  3,
        pennies: 3, 
      };
      chai.request(server)
        .patch('/api/till')
        .send(coins)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('coins');
          response.body.coins.should.have.property('quarters').eq(4);
          response.body.coins.should.have.property('dimes').eq(10);
          response.body.coins.should.have.property('nickels').eq(3);
          response.body.coins.should.have.property('pennies').eq(3);
          response.body.should.have.property('value').eq(2.18);
        }) 
    })
  });

  describe('POST /api/till', () => {
    it('should return minimum number of coins for change request', () => {
      let coins = {
        quarters: 3,
        dimes: 10,
        nickels: 3,
        pennies: 9
      };
      chai.request(server)
        .put('/api/till')
        .send(coins)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.coins.should.have.property('quarters').eq(3);
          response.body.coins.should.have.property('dimes').eq(10);
          response.body.coins.should.have.property('nickels').eq(3);
          response.body.coins.should.have.property('pennies').eq(9);
          response.body.should.have.property('value').eq(1.99);
        }) 
        
      let change = { value: 0.99 };
      chai.request(server)
        .post('/api/till')
        .send(change)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('coins');
          console.log('response.body.coins', response.body.coins);
          response.body.coins.should.have.property('quarters').eq(3);
          response.body.coins.should.have.property('dimes').eq(2);
          response.body.coins.should.have.property('nickels').eq(0);
          response.body.coins.should.have.property('pennies').eq(4);
        })

      chai.request(server)
        .get('/api/till')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('coins');
          console.log('response.body.coins', response.body.coins);
          response.body.coins.should.have.property('quarters').eq(0);
          response.body.coins.should.have.property('dimes').eq(8);
          response.body.coins.should.have.property('nickels').eq(3);
          response.body.coins.should.have.property('pennies').eq(5);
          response.body.should.have.property('value').eq(1);
        })       
    })
  });
})
