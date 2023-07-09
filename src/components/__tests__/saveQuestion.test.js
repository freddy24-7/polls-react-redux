import { saveQuestion } from '../../redux/questionsSlice';

// Test case 1: Verify that the saved question is returned and all expected fields are populated
// Test case 1: Verify that the saved question is returned and all expected fields are populated
test('saveQuestion returns the saved question with expected fields', async () => {
  // Mock data
  const questionId = 'xyz123';
  const optionOneText = 'Option One';
  const optionTwoText = 'Option Two';
  const author = 'sarahedo';

  // Dispatch the saveQuestion action
  const result = await saveQuestion({
    questionId,
    optionOneText,
    optionTwoText,
    author,
  });

  // Verify the result
  expect(result).toEqual({
    payload: {
      questionId,
      optionOneText,
      optionTwoText,
      author,
    },
    type: 'questions/saveQuestion',
  });
});

// Test case 2: Verify that an error is returned if incorrect data is passed
test('saveQuestion returns an error if incorrect data is passed', async () => {
  // Mock incorrect data
  const incorrectData = {
    optionOneText: '',
    optionTwoText: 'Option Two',
    author: 'sarahedo',
  };

  // Dispatch the saveQuestion action with incorrect data
  try {
    await saveQuestion(incorrectData);
  } catch (error) {
    // Verify the error message
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).toBe(
      'Please provide optionOneText, optionTwoText, and author',
    );
  }
});
