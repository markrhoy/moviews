import {Card, Image, Space, Rate, Typography, Drawer,Divider } from 'antd';
import {
    CalendarOutlined,
    TeamOutlined,
    EyeOutlined
} from '@ant-design/icons';
import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const {Text, Paragraph} = Typography
const {Meta} = Card

const BASE_URL = "https://api.themoviedb.org/3"
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"

const Movie = props => {
    const movieId = props.id
    const [details, setDetails] = useState({})
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        axios.get(
            BASE_URL + `/movie/${movieId}`,
            { params: { 'api_key': process.env.REACT_APP_KEY } }
        ).then(res => {
            setDetails(res.data)
        })
    }, [])

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    
    return (
        <div>
            <Card
                bordered={false}
                cover={
                    <Image
                        width={'auto'}
                        alt={details.title}
                        src={BASE_IMAGE_URL + details.poster_path}
                    />
                }
                
            >
                <Meta
                    title={
                        <Text className="card-title" onClick={showDrawer}>{details.original_title}</Text>
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
                        <Text style={{color:'#f5c518'}}>{details.title}</Text>
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
                        alt={details.title}
                        src={BASE_IMAGE_URL + details.poster_path}
                    />
                    <Paragraph>{details.overview}</Paragraph>
                    
                </Space>
                
            </Drawer>
        </div>
    )
}

export default Movie