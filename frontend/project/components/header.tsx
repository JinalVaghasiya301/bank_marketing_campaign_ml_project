'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, TrendingUp, Menu, X, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', description: 'Dashboard' },
    { href: '/about', label: 'About', description: 'Learn more' },
    { href: '/analysis', label: 'Analysis', description: 'Data insights' },
    { href: '/loan', label: 'Term Deposit', description: 'ML predictions' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-xl group"
        >
          <div className="relative">
            <TrendingUp className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all" />
          </div>
          <span className="gradient-text">Bank Marketing</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative px-3 py-2 text-sm font-medium transition-all duration-200',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
              <span className={cn(
                'absolute bottom-0 left-0 h-0.5 w-full bg-primary transform transition-transform duration-200',
                pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              )} />
            </Link>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hover-lift"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover-lift"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        'md:hidden border-t bg-background/95 backdrop-blur',
        isMobileMenuOpen ? 'animate-slide-up' : 'hidden'
      )}>
        <nav className="container py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                pathname === item.href
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                {pathname === item.href && (
                  <div className="h-2 w-2 bg-primary rounded-full" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
