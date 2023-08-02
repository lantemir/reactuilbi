
import React, { useContext } from 'react'
import Myinput from '../components/UI/input/Myinput'
import MyButton from '../components/UI/Button/MyButton'
import { AuthContext } from '../context'

function Login() {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

  return (
    <div>
        <h1>Страница для логина</h1>
        <form onSubmit={login}>
            <Myinput type='text' placeholder='Введите логин'/>
            <Myinput type='password' placeholder='Введите пароль'/>
            <MyButton>Войти</MyButton>
        </form>
        
    </div>
  )
}

export default Login