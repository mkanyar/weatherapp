import { gql } from '@apollo/client'

export const GET_WEATHER_QUERY = gql`
  query getCityByName($name: String!) {
    getCityByName(name: $name, config: { units: metric }) {
      weather {
        temperature {
          actual
          feelsLike
        }
        wind {
          speed
        }
      }
    }
  }
`
