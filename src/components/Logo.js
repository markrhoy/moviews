import { Typography } from "antd";
import {
    SmileOutlined,
} from '@ant-design/icons';

const { Text } = Typography

const Logo = () => (
    <Text type="warning" strong style={{
        fontSize: '25px',
        textTransform: 'uppercase'
    }}> M<SmileOutlined />views</Text>
)

export default Logo