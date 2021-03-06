jest.unmock('../src/dql');
jest.unmock('../src/ql');
jest.unmock('../src/util');
import {DQL} from '../src/dql'
import {QL} from '../src/ql';


const oneDQL = DQL('testQL', [
  '$id',
  (id) => id 
])

const testDQL = DQL('testhQL', [
  '$id',
  oneDQL,
  ['user', '$id'],
  (user) => user
]);


describe('dynamic query lang test suite', () => {
  it('it should be ok', () => {
    testDQL.context({
      id: 1
    })
    const ql = testDQL.ql()
    expect(1).toEqual(ql.lang()[0]);
    expect(1).toEqual((ql.lang()[1]).lang()[0]);
    expect(['user', 1]).toEqual(ql.lang()[2]);
  });
});

