import { Typography, Drawer, Form, Input, Button,message } from 'antd';
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext'

const { Text } = Typography


const LoginForm = props => {
  const { logIn } = useAuth()

  const handleOnFinish = (values) => {
    logIn(values.email, values.password).catch( error => {
      let errorCode = error.code
      let errorMessage = error.message
      if (errorCode === 'auth/wrong-password') {
        message.error("Wrong password.")
      }else{
        message.error(errorMessage)
      }
    })
  }

  return (
    <Drawer
      title={
        <Text style={{ color: '#f5c518' }}>Login</Text>
      }
      visible={props.visible}
      closable={true}
      onClose={props.onClose}
      width={400}
    >
      <Form onFinish={handleOnFinish}>
        <Form.Item name="email">
          <Input type="email" placeholder="Email" size="large" prefix={<UserOutlined style={{ color: '#f5c518' }} />} />
        </Form.Item>
        <Form.Item name="password">
          <Input type="password" placeholder="Password" size="large" prefix={<LockOutlined style={{ color: '#f5c518' }} />} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" size="large" block>Submit</Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}


export default LoginForm