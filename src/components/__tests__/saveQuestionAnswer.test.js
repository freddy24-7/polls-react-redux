import { _saveQuestionAnswer } from '../../utils/_DATA';

describe('_saveQuestionAnswer()', () => {
  test('returns true when correctly formatted data is passed', async () => {
    //Arrange
    const authedUser = 'sarahedo';
    const qid = '8xf0y6ziyjabvozdd253nd';
    const answer = 'optionOne';

    //Act
    const result = await _saveQuestionAnswer({ authedUser, qid, answer });

    //Assert
    expect(result).toBe(true);
  });

  test('returns an error when incorrect data is passed', async () => {
    //Arrange
    const authedUser = null; //Passing null to trigger an error
    const qid = '8xf0y6ziyjabvozdd253nd';
    const answer = 'optionOne';

    //Act & Assert
    await expect(
      async () => await _saveQuestionAnswer({ authedUser, qid, answer }),
    ).rejects.toThrowError('Please provide authedUser, qid, and answer');
  });
});
