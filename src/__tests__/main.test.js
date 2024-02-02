import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Main } from '../todo/components/main';

test('renders main component with visible todos', async () => {
  const todos = [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: true },
  ];

  const { getByTestId, getByLabelText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Main todos={todos} dispatch={() => {}} />
    </MemoryRouter>
  );

  const mainElement = getByTestId('main');
  const toggleAllCheckbox = getByTestId('toggle-all');
  const todoList = getByTestId('todo-list');

  expect(mainElement).toBeInTheDocument();
  expect(toggleAllCheckbox).toBeInTheDocument();
  expect(todoList).toBeInTheDocument();

  // Check if the toggle-all checkbox is not checked initially
  expect(toggleAllCheckbox).not.toBeChecked();

  // Check if the todos are rendered correctly
  const todoItems = todoList.querySelectorAll('[data-testid="todo-item"]');
  expect(todoItems.length).toBe(2);
});



test('toggles all todos when toggle-all checkbox is clicked', async () => {
  const todos = [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: false },
  ];

  const dispatchMock = jest.fn();

  const { getByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <Main todos={todos} dispatch={dispatchMock} />
    </MemoryRouter>
  );

  const toggleAllCheckbox = getByTestId('toggle-all');

  fireEvent.click(toggleAllCheckbox);

  await waitFor(() => {
    // Check if the dispatch function was called with the correct action
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'TOGGLE_ALL',
      payload: { completed: true },
    });
  });
});
