// __tests__/input.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Input } from '../todo/components/input';

test('calls onSubmit callback when Enter key is pressed with valid input', () => {
  const mockOnSubmit = jest.fn();
  const { getByTestId } = render(<Input onSubmit={mockOnSubmit} placeholder="Test Placeholder" label="Test Label" />);

  const input = getByTestId('text-input');
  const validInput = 'Valid Input';

  fireEvent.change(input, { target: { value: validInput } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(mockOnSubmit).toHaveBeenCalledWith(validInput);
});

test('does not call onSubmit callback when Enter key is pressed with invalid input', () => {
  const mockOnSubmit = jest.fn();
  const { getByTestId } = render(<Input onSubmit={mockOnSubmit} placeholder="Test Placeholder" label="Test Label" />);

  const input = getByTestId('text-input');
  const invalidInput = 'I';

  fireEvent.change(input, { target: { value: invalidInput } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(mockOnSubmit).not.toHaveBeenCalled();
});

test('sanitizes input value before calling onSubmit', () => {
  const mockOnSubmit = jest.fn();
  const { getByTestId } = render(<Input onSubmit={mockOnSubmit} placeholder="Test Placeholder" label="Test Label" />);

  const input = getByTestId('text-input');
  const inputValue = 'Input with special characters: &<>"\'/';

  fireEvent.change(input, { target: { value: inputValue } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  // Ensure the sanitized value is passed to onSubmit
  expect(mockOnSubmit).toHaveBeenCalledWith('Input with special characters: &amp;&lt;&gt;&quot;&#x27;&#x2F;');
});

// Add more tests as needed
