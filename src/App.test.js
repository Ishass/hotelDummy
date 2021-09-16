import { render, screen } from '@testing-library/react';
import { MemoryRouter,Router } from "react-router-dom";
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import store from './redux/store';
import SearchLocation from './components/searchLocation/searchLocation'
import DetailPage from './components/hotelDetail/hotelDetail'
import App from './App';
import HotelListing from './components/hotelDetail/hotelListing'



test('renders learn react link', () => {
  render(<Provider store={store}><MemoryRouter><App /></MemoryRouter></Provider>);
  screen.debug()
});

const renderWithRouter = (component) => {
  const history = createMemoryHistory()
  return { 
  ...render (
  <Router history={history}>
      {component}
  </Router>
  )
}
}
it('should render the search page', () => {
  const {  getByTestId } = renderWithRouter(<SearchLocation />) 
  const input = getByTestId('input')
  expect(input).toBeInTheDocument()
})

it('should render the detail page', () => {
  const {  getByTestId } = renderWithRouter(<DetailPage />) 
  const detail = getByTestId('render-detail')
  expect(detail).toBeInTheDocument()
})

it('should render the listing page', () => {
  const {  getByTestId } = renderWithRouter(<HotelListing />) 
  const listing = getByTestId('render-listing')
  expect(listing).toBeInTheDocument()
})