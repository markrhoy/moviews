import { Typography, Drawer, Form, Input, Button ,message} from 'antd';
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';
import {useAuth} from '../../contexts/AuthContext'
import { useState } from 'react';

const { Text } = Typography

const SignUpForm = props => {
    const [isLoading, setIsLoading] = useState(false)
    const { signUp } = useAuth()

    const handleOnFinish = (values) => {
        setIsLoading(true)

        if(values.password !== values.confirmPassword){
            message.error("Password doesn't match.")
            return
        }

        signUp(values.email, values.password).catch(error=>{
            let errorCode = error.code
            let errorMessage = error.message
            if(errorCode === "auth/weak-password"){
                message.error("Password should be atleast 6 characters.") 
            }else if(errorCode === "auth/email-already-in-use"){
                message.error("Email already in use.")
            }else if(errorCode === "auth/invalid-email"){
                message.error("Invalid email address.")
            }else{
                message.success(errorMessage)
            }
        })
       
        setIsLoading(false)
    }
    
    return(
        <Drawer
            title={
              <Text style={{ color: '#f5c518' }}>Sign Up</Text>
            }
            visible={props.visible}
            closable={true}
            onClose={props.onClose}
            width={400}
          >
                <Form onFinish={handleOnFinish}>
                    <Form.Item  name="email">
                        <Input type="email" placeholder="Email" size="large" prefix={<UserOutlined style={{color:'#f5c518'}}/>}/>
                    </Form.Item>
                    <Form.Item  name="password">
                        <Input type="password" placeholder="Password" size="large" prefix={<LockOutlined style={{color:'#f5c518'}}/>}/>
                    </Form.Item>
                    <Form.Item  name="confirmPassword">
                        <Input type="password" placeholder="Confirm password" size="large" prefix={<LockOutlined style={{color:'#f5c518'}}/>}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" size="large" block  loading={isLoading}>Submit</Button>
                    </Form.Item>
                </Form>
          </Drawer>
    )
}


export default SignUpForm