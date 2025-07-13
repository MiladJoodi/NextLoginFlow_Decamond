'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/Home.module.scss';

type User = {
  name: {
    first: string;
    last: string;
  };
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    const confirmed = window.confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟');
    if (confirmed) {
      localStorage.removeItem('user');
      router.push('/auth');
    }
  };


  const goToDashboard = () => {
    router.push('/dashboard');
  };

  if (!user) return null;

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>این صفحه‌ی نخست است.</h2>

      <p className={styles.greeting}>
        خوش اومدی {user.name.first} {user.name.last} 👋
      </p>

      <div className={styles.buttons}>
        <button onClick={goToDashboard} className={styles.button}>
          برو به داشبورد
        </button>

        <button onClick={handleLogout} className={styles.button}>
          خروج
        </button>
      </div>
    </main>
  );
}
