import { _saveQuestion } from '../../utils/_DATA';

describe('_saveQuestion', () => {
  test('should save the question and return the saved question with all fields populated', async () => {
    //Arrange
    const question = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'sarahedo',
    };

    //Act
    const savedQuestion = await _saveQuestion(question);

    //Assert
    expect(savedQuestion).toHaveProperty('id');
    expect(savedQuestion).toHaveProperty('timestamp');
    expect(savedQuestion).toHaveProperty('author', 'sarahedo');
    expect(savedQuestion).toHaveProperty('optionOne');
    expect(savedQuestion).toHaveProperty('optionTwo');
    expect(savedQuestion.optionOne).toHaveProperty('votes');
    expect(savedQuestion.optionOne).toHaveProperty('text', 'Option One');
    expect(savedQuestion.optionTwo).toHaveProperty('votes');
    expect(savedQuestion.optionTwo).toHaveProperty('text', 'Option Two');
  });

  test('should return an error if incorrect data is passed', async () => {
    //Arrange
    const question = {
      optionOneText: '',
      optionTwoText: '',
      author: 'sarahedo',
    };

    //Act & Assert
    await expect(_saveQuestion(question)).rejects.toMatch(
      'Please provide optionOneText, optionTwoText, and author',
    );
  });
});
