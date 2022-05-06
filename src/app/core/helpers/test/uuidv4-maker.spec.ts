import {uuidv4} from '@app-core';

describe('uuidMaker', () => {
  it('should return a Universal Unique Identifier and match it pattern', () => {
    expect(uuidv4()).toMatch(/[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/);
  });
});
