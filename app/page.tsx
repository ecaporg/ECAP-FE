import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to dashboard if authenticated, otherwise to sign in
  redirect('/auth/signin');
}
