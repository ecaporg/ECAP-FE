import { redirect } from 'next/navigation';
import { routes } from '@/constants/routes';
export default function Home() {
  // Redirect to dashboard if authenticated, otherwise to sign in
  redirect(routes.dashboard.root);
}
