import { Input, Col, Row, Typography, List, Pagination, } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import {
  SmileOutlined,

} from '@ant-design/icons';
import Movie from './components/Movie';

const { Text, Link } = Typography
const { Search } = Input

const BASE_URL = "https://api.themoviedb.org/3"

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState({})
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    setTrendingMovies({})
    axios.get(
      BASE_URL + '/trending/movie/day',
      {
        params: {
          'api_key': process.env.REACT_APP_KEY,
          'page': pageNumber,
        }
      }
    ).then(res => {
      setTrendingMovies(res.data)
      setTotalPages(res.data.total_pages)
    })
  }, [pageNumber])

  const searchMovie = title => {
    setTrendingMovies({})
    axios.get(
      BASE_URL + '/search/movie',
      {
        params: {
          'api_key': process.env.REACT_APP_KEY,
          'query': title,
          'include_adult': "false"
        }
      }
    ).then(res => {
      setTrendingMovies(res.data)
      setTotalPages(res.data.total_pages)
    })
  }

  const handleOnchange = page => {
    setPageNumber(page)
  }


  return (
    <div className="app">
      <nav>
        <Row justify="center" className="nav" align="middle">
          <Col span={18}>
            <Link href="/" >
              <Text type="warning" strong style={{
                fontSize: '25px',
                textTransform: 'uppercase'
              }}> M<SmileOutlined />views</Text>
            </Link>
          </Col>
        </Row>
      </nav>
      <header>
        <Row justify="center" align="middle" className="search-bar" gutter={6}>
          <Col span={14}>
            <Search
              placeholder="Type movie title ..."
              enterButton="Search"
              size="large"
              onSearch={searchMovie}
            />
          </Col>
        </Row>
      </header>

      <main className="main-content">
        <Row justify="center">
          <Col span={18} >
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                column: 4

              }}
              dataSource={trendingMovies.results}
              renderItem={item => (
                <List.Item>
                  <Movie id={item.id} />
                </List.Item>
              )}
            />
            <Row justify="center">
              <Col>
                <Pagination
                  defaultCurrent={pageNumber}
                  onChange={handleOnchange}
                  total={totalPages}
                  responsive={true} />
              </Col>
            </Row>
          </Col>
        </Row>
      </main>


    </div>
  )
}


export default App
