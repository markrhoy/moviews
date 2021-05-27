import { Skeleton,Card, Image, Space, Rate, Typography, Drawer,Divider, Tag } from 'antd';
import {
    CalendarOutlined,
    TeamOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const {Text, Paragraph} = Typography
const {Meta} = Card

const BASE_URL = "https://api.themoviedb.org/3"
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"
const FALLBACK_IMAGE_URL = "https://www.virginmediastore.com/media/tile-placeholder-poster.2769cb5f.png"

const Movie = props => {
    const movieId = props.id
    const [details, setDetails] = useState({})
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
   

    useEffect(() => {
        axios.get(
            BASE_URL + `/movie/${movieId}`,
            { params: { 'api_key': process.env.REACT_APP_KEY } }
        ).then(res => {
            setDetails(res.data)
            setIsLoading(false)
        })

    }, [movieId])

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    
    
    return (
        <div>
            <Card
                loading={isLoading}
                bordered={false}
                cover={
                    <Image
                        placeholder={
                            <Image
                                width={"auto"}
                                src={FALLBACK_IMAGE_URL}
                            />
                        }
                        width={'auto'}
                        alt={details.title}
                        src={BASE_IMAGE_URL + details.poster_path}
                        fallback={FALLBACK_IMAGE_URL} 
                    />
                }>
                <Meta
                    title={
                        <Text ellipsis={false} className="card-title" onClick={showDrawer}>{details.original_title}</Text>
                    }
                    description={
                        <div>
                            <Space>
                                <Text type="secondary"><TeamOutlined /> Popularity: </Text>
                                <Text type="secondary">{details.popularity}</Text>
                            </Space>
                            <Space>
                                <Text type="secondary"><CalendarOutlined /> Release Date: </Text>
                                <Text type="secondary">{details.release_date}</Text>
                            </Space>
                            <Rate disabled value={details.vote_average / 2} allowHalf={true} />
                        </div>
                    }
                />
            </Card>

            <Drawer
                title={
                    <div>
                        <Space>
                            <Text style={{color:'#f5c518'}}>{details.title}</Text>
                            <Text style={{fontWeight:'normal'}} type="secondary">
                                <blockquote>{details.tagline}</blockquote>
                            </Text>
                        </Space>
                        
                    </div>
                }
                width={600}
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                >
                    
                <Space direction="vertical">
                    <Image 
                        width={'auto'}
                        placeholder={
                            <Image
                                width={"auto"}
                                src={FALLBACK_IMAGE_URL}
                            />
                        }
                        alt={details.title}
                        src={BASE_IMAGE_URL + details.poster_path}
                        fallback={FALLBACK_IMAGE_URL}
                    />

                    <Space>
                    <Space>
                        <Text type="secondary"><TeamOutlined /> Popularity: </Text>
                        <Text type="secondary">{details.popularity}</Text>
                    </Space>
                    <Divider type="vertical" />
                    <Space>
                        <Text type="secondary"><CalendarOutlined /> Release Date: </Text>
                        <Text type="secondary">{details.release_date}</Text>
                    </Space>
                    <Divider type="vertical" />
                    <Rate disabled value={details.vote_average / 2} allowHalf={true} />
                    </Space>
                    <Paragraph>{details.overview}</Paragraph>
                    
                </Space>
                
            </Drawer>
        </div>
    )
}

export default Movie