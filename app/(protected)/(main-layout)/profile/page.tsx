import { ProfileContent } from '@/components/pages/profile/content';
import { ProfileHeader } from '@/components/pages/profile/header';
import { getUser } from '@/lib/get-user';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

// todo: move this page to the role layout in feature
export default async function ProfilePage() {
  const user = await getUser();
  return (
    <>
      <ProfileHeader user={user!} />
      <ProfileContent user={user!} />
    </>
  );
}
