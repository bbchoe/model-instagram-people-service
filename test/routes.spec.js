process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testing Get Followers', () => {
  it('should return followers for a given userId', (done) => {
    chai.request('http://localhost:8080')
      .get('/users/5678/followers')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('userId');
        res.body.userId.should.equal(5678);
        res.body.should.have.property('userName');
        res.body.userName.should.equal('Melvin_Blick');
        res.body.should.have.property('followers');
        res.body.followers.length.should.equal(119);
        done();
      });
  });
});
