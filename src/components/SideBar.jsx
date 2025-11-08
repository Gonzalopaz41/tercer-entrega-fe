import { useState } from "react";
import '../styles/SideBar.css';
import {
  LogoIcon,
  HomeIcon,
  BookIcon,
  UsersIcon,
  FileIcon,
  ApiIcon,
  MenuIcon,
  CloseIcon
} from './Icons';

export default function SideBar({ onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (e, path) => {
    e.preventDefault();
    if (typeof onNavigate === 'function') return onNavigate(path);
    window.location.href = path;
  };

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    document.body.classList.toggle('sidebar-collapsed', next);
  };

  const navItems = [
    { path: '/', label: 'Portada', Icon: HomeIcon },
    { path: '/bitacora', label: 'Bitácora', Icon: BookIcon },
    { path: '/integrantes', label: 'Integrantes', Icon: UsersIcon },
    { path: '/json-data', label: 'JSON Data', Icon: FileIcon },
    { path: '/api-data', label: 'API Data', Icon: ApiIcon },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-expanded={!collapsed}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <LogoIcon />
        </div>
        <div className="sidebar-title">Grupo 6</div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map(({ path, label, Icon }) => (
          <a
            key={path}
            href={path}
            onClick={(e) => handleClick(e, path)}
            className="sidebar-link"
            title={label}
          >
            <span className="icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="label">{label}</span>
            <span className="link-glow"></span>
          </a>
        ))}
      </nav>

      <button
        onClick={toggleCollapse}
        aria-pressed={collapsed}
        aria-label="Toggle sidebar"
        className="sidebar-toggle"
      >
        {collapsed ? <MenuIcon /> : <CloseIcon />}
      </button>
    </div>
  );
} 