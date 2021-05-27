import { Image, Space, Rate, Drawer, Divider, Typography, Descriptions } from 'antd';
import {
    CalendarOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import '../App.css';

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"
const FALLBACK_IMAGE_URL = "https://www.virginmediastore.com/media/tile-placeholder-poster.2769cb5f.png"

const { Text, Link } = Typography

const DetailDrawer = props => {
    
    return (
        <div>
            <Drawer
                title={
                    <div>
                        <Space>
                            <Text style={{ color: '#f5c518' }}>{props.details.title}</Text>
                            <Text style={{ fontWeight: 'normal' }} type="secondary">
                                <blockquote>{props.details.tagline}</blockquote>
                            </Text>
                        </Space>

                    </div>
                }
                width={600}
                placement="right"
                closable={true}
                onClose={props.onClose}
                visible={props.visible}
            >

                <Space direction="vertical" align="center">
                    <Image
                        width={'auto'}
                        placeholder={
                            <Image
                                width={"auto"}
                                src={FALLBACK_IMAGE_URL}
                            />
                        }
                        alt={props.details.title}
                        src={BASE_IMAGE_URL + props.details.poster_path}
                        fallback={FALLBACK_IMAGE_URL}
                    />

                    <Space>
                        <Space>
                            <Text type="secondary"><TeamOutlined /> Popularity: </Text>
                            <Text type="secondary">{props.details.popularity}</Text>
                        </Space>
                        <Divider type="vertical" />
                        <Space>
                            <Text type="secondary"><CalendarOutlined /> Release Date: </Text>
                            <Text type="secondary">{props.details.release_date}</Text>
                        </Space>
                        <Divider type="vertical" />
                        <Rate disabled value={props.details.vote_average / 2} allowHalf={true} />
                    </Space>
                    <Descriptions bordered={true}>
                        <Descriptions.Item label={<Text type="warning" strong>Overview</Text>} span={3}>
                            {props.details.overview}
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text type="warning" strong>Status</Text>} span={3}>
                            {props.details.status}
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text type="warning" strong>Homepage</Text>} span={3}>
                            <Link href={props.details.homepage} type="warning">{props.details.homepage}</Link>
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text type="warning" strong>Runtime</Text>} span={3}>
                            {props.details.runtime} minutes
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text type="warning" strong>Budget</Text>}>
                            $ {props.details.budget}
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text type="warning" strong>Revenue</Text>}>
                            $ {props.details.revenue}
                        </Descriptions.Item>
                        
                    </Descriptions>

                </Space>

            </Drawer>

        </div>
    )
}

export default DetailDrawer