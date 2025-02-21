import { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog | Smash&Fun',
  description: 'Blog o radzeniu sobie ze stresem i emocjami w pracy i życiu codziennym',
  openGraph: {
    title: 'Blog | Smash&Fun',
    description: 'Blog o radzeniu sobie ze stresem i emocjami w pracy i życiu codziennym',
    url: 'https://smashandfun.pl/blog',
    siteName: 'Smash&Fun',
    images: [
      {
        url: 'https://smashandfun.pl/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogListClient posts={[...blogPosts]} />;
}
