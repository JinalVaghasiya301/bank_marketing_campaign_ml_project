import Link from 'next/link';
import { Github, Linkedin, Mail, TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4 max-w-6xl mx-auto text-center md:text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="font-bold text-lg">Bank Marketing</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Predicting customer subscription to term deposits using machine
              learning for better marketing strategies.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/loan"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Analysis
                </Link>
              </li>
                <li>
                <Link
                  href="/analysis"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Term Deposit
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/JinalVaghasiya301"
                className="h-9 w-9 rounded-md border bg-background flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/jinal-vaghasiya-0b7669313/"
                className="h-9 w-9 rounded-md border bg-background flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jinalvaghasiya301@gmail.com"
                className="h-9 w-9 rounded-md border bg-background flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2026 Bank Marketing Prediction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}