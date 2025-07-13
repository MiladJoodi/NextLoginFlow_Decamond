'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    const confirmed = window.confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟');
    if (confirmed) {
      localStorage.removeItem('user');
      router.push('/auth');
    }
  };
  

  const goHome = () => {
    router.push('/');
  };

  if (!user) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-gray-800 text-center">
      <h2 className="text-lg mb-2 font-medium text-gray-700">
        این صفحه‌ی داشبورد است.
      </h2>

      <p className="text-2xl font-semibold mb-8">
        خوش اومدی {user.name.first} {user.name.last} 👋
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={goHome}
          className="px-6 py-2 rounded-md border border-gray-400 bg-transparent text-gray-700 hover:bg-gray-200 transition"
        >
          صفحه‌ی نخست
        </button>

        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-md border border-gray-400 bg-transparent text-gray-700 hover:bg-gray-200 transition"
        >
          خروج
        </button>
      </div>
    </main>
  );
}
