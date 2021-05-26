import { Badge, Col, Row, Typography, List, Card, Image, Space, Rate, Pagination } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Movie from './components/Movie';

const {Text} = Typography

const BASE_URL = "https://api.themoviedb.org/3"

const App = () => {
  const [trendingMovies, setTrendingMovies]  = useState({})

  useEffect(() => {
    axios.get(
      BASE_URL + '/trending/movie/day', 
      {params: {'api_key': process.env.REACT_APP_KEY}}
    ).then( res => {
      setTrendingMovies(res.data)
    })
  }, [])

  console.log(trendingMovies)
  return (
    <div className="app">
      <header>
        <Row justify="center" className="nav" align="middle">
          <Col span={18}>
            <Text>Moviews</Text>
          </Col>
        </Row>
      </header>
      <main className="main-content">
        <Row justify="center">
          <Col span={18} >
            <List
              grid={{
                gutter: 16,
                column: 4
              }}
              dataSource={trendingMovies.results}
              renderItem={ item => (
                <List.Item>
                  <Movie id={item.id}/>
                </List.Item>
              )}
            />

            <Row justify="center">
              <Col>
                <Pagination
                total={trendingMovies.total_pages}
                responsive={true}/>
              </Col>
            </Row>
          </Col>
        </Row>

      </main>

    </div>
  )
}
  

export default App
