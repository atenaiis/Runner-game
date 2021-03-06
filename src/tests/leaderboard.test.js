import leaderboard from '../leaderboard';

const array = [{ score: 6000, user: 'karmaester' },
  { score: 6000, user: 'karmaester' },
  { score: 6000, user: 'karmaester' },
  { score: 6000, user: 'karmaester' },
  { score: 6000, user: 'karmaester' },
  { score: 6000, user: 'karmaester' }];

leaderboard.getInfo = jest.fn().mockImplementationOnce(() => {
  const result = Promise.resolve(array);
  return result;
});

leaderboard.addScore = jest.fn().mockImplementationOnce(() => {
  const result = Promise.resolve({ ok: true });
  return result;
});


describe('Test add score response', () => {
  const success = leaderboard.addScore('karmaester', 6000);
  test('Test if return an object', () => success.then(data => {
    expect(data.ok).toBeTruthy();
  }));
});


describe('Testing get Info', () => {
  const result = leaderboard.getInfo();
  test('Test if return an object', () => result.then(data => {
    expect(typeof data).toBe('object');
  }));

  test('Test if the objects has a property called score', () => result.then(data => {
    expect(data[0]).toHaveProperty('score');
  }));

  test('Test if the objects has a property user', () => result.then(data => {
    expect(data[0]).toHaveProperty('user');
  }));

  test('Test if the property score is the type number', () => result.then(data => {
    expect(typeof data[0].score).toBe('number');
  }));

  test('Test if return just 6 elements', () => result.then(data => {
    expect(data.length).toBe(6);
  }));
});
