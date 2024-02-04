import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

test('has correct welcome text', () => {
  render(
    <div>
      hello
      <div><div>hello world!</div></div>
    </div>
  )
  expect(screen.getByText(/hello world!/)).toBeInTheDocument()
})