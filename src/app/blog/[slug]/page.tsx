import { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import BlogPostClient from './BlogPostClient';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post nie znaleziony | Blog Smash&Fun',
    };
  }

  return {
    title: `${post.title} | Blog Smash&Fun`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Blog Smash&Fun`,
      description: post.excerpt,
      type: 'article',
      url: `https://smashandfun.pl/blog/${post.slug}`,
      images: [{
        url: `https://smashandfun.pl${post.image}`,
      }],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return null;
  }

  return <BlogPostClient post={post} />;
}
