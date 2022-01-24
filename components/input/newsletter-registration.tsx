import Error from 'next/error';
import { FormEvent, useContext, useRef } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration = () => {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef<HTMLInputElement>(null);

  async function registrationHandler(event: FormEvent) {
    event.preventDefault();

    notificationCtx.showNotification({
      title: 'Signing up',
      message: 'Registering for newsletter',
      status: 'pending',
    });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: emailInputRef.current?.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let data: any;
      if (res.ok) {
        data = await res.json();
        console.log(data);

        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully registered for newsletter',
          status: 'success',
        });
      } else {
        data = await res.json();
        throw new Error(data?.message || 'Something went wrong');
      }
    } catch (error: any) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
