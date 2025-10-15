import { ReactNode } from 'react';
import { AppSidebar } from './Sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AppSidebar />
        <SidebarInset>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-auto"
          >
            {children}
          </motion.main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
