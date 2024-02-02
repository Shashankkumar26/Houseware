// __tests__/item.test.js
import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Item } from '../todo/components/item';

test('renders todo item correctly', async () => {
    const todo = { id: 1, title: 'Test Todo', completed: false };
    const { getByTestId } = render(<Item todo={todo} dispatch={() => {}} index={0} />);
  
    // Use waitFor to wait for the asynchronous updates
    await waitFor(() => {
      const todoItem = getByTestId('todo-item');
      const todoToggle = getByTestId('todo-item-toggle');
      const todoLabel = getByTestId('todo-item-label');
      const todoButton = getByTestId('todo-item-button');
  
      expect(todoItem).toBeInTheDocument();
      expect(todoToggle).toBeInTheDocument();
      expect(todoLabel).toBeInTheDocument();
      expect(todoButton).toBeInTheDocument();
  
      expect(todoLabel).toHaveTextContent(todo.title);
      expect(todoToggle).not.toBeChecked();
    });
  });

test('calls dispatch with TOGGLE_ITEM action when todo item checkbox is toggled', () => {
  const todo = { id: 1, title: 'Test Todo', completed: false };
  const mockDispatch = jest.fn();
  const { getByTestId } = render(<Item todo={todo} dispatch={mockDispatch} index={0} />);

  const todoToggle = getByTestId('todo-item-toggle');
  fireEvent.click(todoToggle);

  expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_ITEM', payload: { id: todo.id } });
});

test('calls dispatch with REMOVE_ITEM action when todo item button is clicked', () => {
  const todo = { id: 1, title: 'Test Todo', completed: false };
  const mockDispatch = jest.fn();
  const { getByTestId } = render(<Item todo={todo} dispatch={mockDispatch} index={0} />);

  const todoButton = getByTestId('todo-item-button');
  fireEvent.click(todoButton);

  expect(mockDispatch).toHaveBeenCalledWith({ type: 'REMOVE_ITEM', payload: { id: todo.id } });
});

test('displays input for editing when todo item label is double-clicked', async () => {
  const todo = { id: 1, title: 'Test Todo', completed: false };
  const { getByTestId } = render(<Item todo={todo} dispatch={() => {}} index={0} />);
  
  const todoLabel = getByTestId('todo-item-label');
  
  fireEvent.doubleClick(todoLabel);
  
  // Use waitFor to wait for the asynchronous updates
  await waitFor(() => {
    const todoInput = getByTestId('text-input');       
    expect(todoInput).toBeInTheDocument();
    expect(todoInput).toHaveValue(todo.title);
  });
});



  
  

// Add more tests as needed
