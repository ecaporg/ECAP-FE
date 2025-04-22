import { routes } from '@/constants/routes';
import { redirect } from 'next/navigation';
export default function Home() {
  redirect(routes.dashboard.root);
}
