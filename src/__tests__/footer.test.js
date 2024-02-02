// __tests__/footer.test.js
import React from 'react';
import { render ,fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // Import MemoryRouter for testing
import {Footer} from '../todo/components/footer';



test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <Footer todos={[]} dispatch={() => {}} />
    </MemoryRouter>
  );
});

test('displays the correct number of active todos', () => {
  const mockDispatch = jest.fn();
  const activeTodos = [
    { id: 1, title: 'Active Todo 1', completed: false },
    { id: 2, title: 'Active Todo 2', completed: false },
  ];

  const { getByTestId } = render(
    <MemoryRouter>
      <Footer todos={activeTodos} dispatch={mockDispatch} />
    </MemoryRouter>
  );

  const todoCount = getByTestId('footer').querySelector('.todo-count');
  expect(todoCount.textContent).toBe('2 items left!');
});

test('clears completed todos when "Clear Completed" button is clicked', () => {
  const mockDispatch = jest.fn();
  const completedTodos = [
    { id: 1, title: 'Completed Todo 1', completed: true },
    { id: 2, title: 'Completed Todo 2', completed: true },
  ];

  // Wrap the component with MemoryRouter
  const { getByTestId } = render(
    <MemoryRouter>
      <Footer todos={completedTodos} dispatch={mockDispatch} />
    </MemoryRouter>
  );

  const clearButton = getByTestId('footer').querySelector('.clear-completed');
  fireEvent.click(clearButton);

  expect(mockDispatch).toHaveBeenCalledWith({ type: 'REMOVE_COMPLETED_ITEMS' });
});