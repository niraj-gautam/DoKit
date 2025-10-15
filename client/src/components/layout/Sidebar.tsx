import { NavLink } from 'react-router-dom';
import { CheckSquare, FileText, BookOpen, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export const AppSidebar = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { state } = useSidebar();

  const navItems = [
    { to: '/todos', icon: CheckSquare, label: 'ToDos' },
    { to: '/notes', icon: FileText, label: 'Notes' },
    { to: '/wiki', icon: BookOpen, label: 'Wiki' },
  ];

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">Organize your work</p>
            </div>
          )}
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavLink to={item.to}>
                    {({ isActive }) => (
                      <SidebarMenuButton 
                        asChild 
                        tooltip={isCollapsed ? item.label : undefined}
                        isActive={isActive}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          {!isCollapsed && <span>{item.label}</span>}
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleTheme} tooltip={isCollapsed ? (theme === 'light' ? 'Dark Mode' : 'Light Mode') : undefined}>
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4" />
                  {!isCollapsed && <span>Dark Mode</span>}
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                  {!isCollapsed && <span>Light Mode</span>}
                </>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
