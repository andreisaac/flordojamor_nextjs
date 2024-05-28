"use client";
import {useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Layout from '../layout';
import styles from './index.module.sass';
import EmailInput from '@/components/form/EmailInput';
import PasswordInput from '@/components/form/PasswordInput';
import validateRequest from "@/util/validateSession"

const Auth = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState(false);

  const disableSubmit = () => {
    return (!email || !password) || (emailError||passwordError)
  }

  const sign = async(formElement, formTarget)=> {
    formElement ? formElement.preventDefault() : null;
    const data = {email: email, password: password};
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    });

    if(response.ok) {
      router.push("/office");
    } else {
      setFormError("Email ou password errado.")
    }
  }


  const keyDown = (event) => {
    if(event.key === 'Enter' && !disableSubmit()) {
      sign(null, event.target);
    }
  }

  return (
    <Layout>
    <Head>
        <title>Login</title>
        <meta name="robots" content="noindex"></meta>
    </Head>
    <main className={styles.auth}>
        <div className={styles.container}>
          <h3>Login:</h3>
          <form onKeyDown={keyDown} onSubmit={sign}>

            <EmailInput name="email" label="E-mail" placeholder="email@email.com.." value={email} inputUpdate={setEmail} error={emailError} errorUpdate={setEmailError}/>

            <PasswordInput name="password" label="Palavra-passe:" value={password} inputUpdate={setPassword} error={passwordError} errorUpdate={setPasswordError}/>
            
            {formError  ? (
            <div className={styles.inputErrorAlert}>Email ou password errado.</div>
          ) : null}

            <button className={styles.btnGreen} disabled={disableSubmit()}>Entrar</button>

          </form>


          
        </div>

    </main>
    </Layout>
  )
};
export default Auth;

export async function getServerSideProps(context) {
	const user = await validateRequest(context.req, context.res);

	if (user) {
		return {
			redirect: {
				destination: "/office",
				permanent: false
			}
		};
	}

  return {props: {user}};

}