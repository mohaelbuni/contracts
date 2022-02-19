import React, {useState,useEffect } from 'react'
import {Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch , useSelector} from 'react-redux'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom';
function LoginScreen() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const {error,loading , userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            navigate('/home');
        }
    },[navigate,userInfo])
    const submitHandler = (e)=>{
        e.preventDefault()
        console.log('submitted!!')
        dispatch(login(username,password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId = 'email'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder = 'Enter Username'
                        value = {username} 
                        onChange={(e)=>setUsername(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId = 'password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder = 'Enter Password'
                        value = {password} 
                        onChange={(e)=>setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Button className="my-3"type='submit' variant='primary'>Sign In</Button>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen

