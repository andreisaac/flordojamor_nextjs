import { signIn, getCsrfToken, getProviders } from 'next-auth/react'
import Image from 'next/image'
import styles from './index.module.sass'

const Signin = ({ csrfToken, providers }) => {
  return (
    <div className={styles.auth}>
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardContent}>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <input placeholder='Email (Not Setup - Please Use Github)' size='large' />
            <button className={styles.primaryBtn}>
              Submit
            </button>
            <hr />
            {providers &&
              Object.values(providers).map(provider => (
                <div key={provider.name}>
                  <button onClick={() => signIn(provider.id)} >
                    Sign in with{' '} {provider.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      //<img src='/login_pattern.svg' alt='Pattern Background' layout='fill' className={styles.styledPattern} />
    </div>
  )
}

export default Signin

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
