'use client';

import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './Auth.module.scss';
import { useRouter } from 'next/navigation';
import { ToPersianNumber } from 'topersiannumber';
import { UserData } from '../../types/types';

// regex for iran phone number
const iranPhoneRegex = /^09\d{9}$/;

const AuthPage = () => {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone) {
      setError('شماره تلفن نمی‌تواند خالی باشد');
      return;
    }

    if (!/^\d+$/.test(phone)) {
      setError('شماره تلفن باید فقط شامل عدد باشد');
      return;
    }

    if (phone.length !== 11) {
      setError('شماره تلفن باید 11 رقم باشد');
      return;
    }

    if (!iranPhoneRegex.test(phone)) {
      setError('شماره تلفن وارد شده معتبر نیست');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://randomuser.me/api/?results=1&nat=us');
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const userData: UserData = {
          name: data.results[0].name,
          email: data.results[0].email,
          picture: data.results[0].picture,
          loginUuid: data.results[0].login.uuid,
        };

        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/dashboard');
      } else {
        setError('دریافت اطلاعات کاربر با مشکل مواجه شد');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.container}>
      <h1>ورود به داشبورد</h1>
      <Input
        label="لطفا شماره تلفن خود را وارد کنید:"
        name="phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder={ToPersianNumber('09xxxxxxxxx')}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? 'در حال ورود...' : 'ورود'}
      </Button>
    </div>
  );
};

export default AuthPage;
