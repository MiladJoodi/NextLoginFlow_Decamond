'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.scss';

type User = {
  name: {
    first: string;
    last: string;
  };
};

export default function DashboardPage() {
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
    if (window.confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
      localStorage.removeItem('user');
      router.push('/auth');
    }
  };

  const goHome = () => {
    router.push('/');
  };

  if (!user) return null;

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>این صفحه‌ی داشبورد است.</h2>
      <p className={styles.greeting}>
        خوش اومدی {user.name.first} {user.name.last} 👋
      </p>
      <div className={styles.buttons}>
        <button onClick={goHome} className={styles.button}>
          صفحه‌ی نخست
        </button>
        <button onClick={handleLogout} className={styles.button}>
          خروج
        </button>
      </div>
    </main>
  );
}
