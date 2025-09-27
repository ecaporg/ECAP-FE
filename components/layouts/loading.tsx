import { Loader2 } from 'lucide-react';

export const PageLoading = () => {
  return (
    <section className="flex h-[calc(100vh-var(--header-height))] flex-col items-center justify-center">
      <Loader2 className="animate-spin" />
    </section>
  );
};

export const SectionLoading = () => {
  return (
    <section className="flex size-full flex-col items-center justify-center">
      <Loader2 className="animate-spin" />
    </section>
  );
};
