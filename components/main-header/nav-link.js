'use client';
import Link from 'next/link';
import classes from './nav-link.module.css';
import { usePathname } from 'next/navigation';
export default function NavLink({ children, href }) {
  const path = usePathname();
  return (
    <Link className={path.startsWith(href)? classes['active'] : undefined} href={href}>
      {children}
    </Link>
  );
}
