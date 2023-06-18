import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Vote from './../Vote';

test('should call onVote function and navigate after clicking the Vote button', () => {
  // Mock the onVote function
  const mockOnVote = jest.fn();

  // Render the component within a Router
  const { getByRole } = render(
      <BrowserRouter>
        <Vote optionText="Option 1" onVote={mockOnVote} />
      </BrowserRouter>
  );

  // Find the Vote button and click it
  const voteButton = getByRole('button');
  fireEvent.click(voteButton);

  // Verify that the onVote function is called
  expect(mockOnVote).toHaveBeenCalledTimes(1);

});
