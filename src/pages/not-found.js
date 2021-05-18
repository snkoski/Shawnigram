import { useEffect } from 'react';
import Header from '../components/header';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - Shawnigram';
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-2xl">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
}
