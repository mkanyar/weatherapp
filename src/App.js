import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import Weather from './components/weather/Weather'
import { store } from './redux/store'

function App() {
  const client = new ApolloClient({
    uri: `https://graphql-weather-api.herokuapp.com/`,
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Weather />
      </Provider>
    </ApolloProvider>
  )
}

export default App
