import { render, screen } from '@testing-library/react'
import Table from './Table'

test('Check if table was render', () => {
   render(<Table />)
   const tabble = screen.getByTestId('mainTable')
   expect(tabble).toBeTruthy()
})
