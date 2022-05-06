import {pathMaker} from '@app-core';

describe('pathMaker', () => {
  it('should call the method path-maker with an array of string and match the result', () => {
    const pathArray = ['http://localhost:3000/api', 'user', 'sign-in'];
    expect(pathMaker(pathArray)).toEqual('http://localhost:3000/api/user/sign-in');
  });
});
