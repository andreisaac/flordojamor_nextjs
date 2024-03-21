"use client";
import Image from 'next/image';
import Layout from '../layout';
import {useState} from 'react';
import styles from './index.module.sass';
import EmailInput from '../components/form/EmailInput';
import PasswordInput from '../components/form/PasswordInput';
import { useFormState, useFormStatus } from 'react-dom';
import { signIn, getCsrfToken, getProviders } from 'next-auth/react'


const Auth = (props, csrfToken, providers) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const disableSubmit = () => {
    return (!email || !password) || (emailError||passwordError)
  }

  const sign = ()=> {
    signIn("credentials", {username: email, password: password, callbackUrl: 'http://localhost:3000/office'})
  }

  const keyDown = (event) => {
    if(event.key === 'Enter' && !disableSubmit()) {
      sign();
    }
  }

  return (
    <Layout>
    <main className={styles.auth}>
        <div className={styles.container}>
          <h3>Login:</h3>
          <form onKeyPress={keyDown}>

            <EmailInput name="email" label="E-mail" placeholder="email@email.com.." value={email} inputUpdate={setEmail} error={emailError} errorUpdate={setEmailError}/>

            <PasswordInput name="password" label="Palavra-passe:" value={password} inputUpdate={setPassword} error={passwordError} errorUpdate={setPasswordError}/>

            <a className={styles.btnGreen} disabled={disableSubmit()} onClick={()=> sign()}>Entrar</a>

          </form>


          {false  ? (
            <div className="input-error-alert">{user.error}</div>
          ) : null}
        </div>

    </main>
    </Layout>
  )
};
export default Auth;

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken
    },
  }
}
