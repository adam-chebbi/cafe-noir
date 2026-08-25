/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { EssenceSection } from './components/EssenceSection';
import { MenuCtaSection } from './components/MenuCtaSection';
import { EnvironmentSection } from './components/EnvironmentSection';
import { ValuesSection } from './components/ValuesSection';
import { FooterSection } from './components/FooterSection';
import GradualBlur from './components/GradualBlur';
import { MenuPage } from './components/MenuPage';

interface RouteInfo {
  isMenu: boolean;
  tableNumber?: string;
  tableToken?: string;
}

function getRouteInfo(): RouteInfo {
  if (typeof window === 'undefined') return { isMenu: false };
  const pathname = window.location.pathname.replace(/\/$/, '');
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();

  const isMenu = pathname === '/menu' || pathname.startsWith('/menu/') || hash === '#/menu' || hash === '#menu';
  
  let tableNumber: string | undefined = undefined;
  let tableToken: string | undefined = searchParams.get('token') || undefined;

  // Extract from path like /menu/table-1, /menu/table-10, /menu/table-terrasse-1
  const tableMatch = pathname.match(/^\/menu\/table-([a-zA-Z0-9_-]+)$/i);
  if (tableMatch) {
    const raw = tableMatch[1];
    // e.g. "1" -> "Table 1", "terrasse-1" -> "Table Terrasse 1"
    tableNumber = `Table ${raw.replace(/^table-?/i, '')}`.replace(/-/g, ' ');
  } else if (searchParams.get('table')) {
    tableNumber = searchParams.get('table')!;
  }

  return { isMenu, tableNumber, tableToken };
}

export default function App() {
  const [routeInfo, setRouteInfo] = useState<RouteInfo>(getRouteInfo);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setRouteInfo(getRouteInfo());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (routeInfo.isMenu) return;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Disappear when scroll reaches the bottom of the page (within 40px)
      const atBottom = windowHeight + scrollY >= documentHeight - 40;
      setIsAtBottom(atBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [routeInfo.isMenu]);

  // If user navigated to /menu, render the dedicated Menu Page
  if (routeInfo.isMenu) {
    return (
      <MenuPage
        tableNumber={routeInfo.tableNumber}
        tableToken={routeInfo.tableToken}
        onNavigateHome={() => {
          window.history.pushState({}, '', '/');
          setRouteInfo(getRouteInfo());
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F0] selection:bg-[#8FC1A6] selection:text-[#0E0E0E] relative overflow-x-hidden font-sans">
      {/* 
        The only navigation element: fixed hamburger icon + "Menu" label in top-left 
        Present and interactive across the entire scroll on both desktop and mobile
      */}
      <Navigation onOpenChange={setIsNavOpen} />

      {/* 
        Strict Single Vertical Scroll: 
        1. Hero 
        2. L'Essence 
        3. Carte & Dégustation (Call to Action)
        4. L'Environnement (Warm light beige contrast)
        5. Nos Valeurs 
        6. Footer
      */}
      <main>
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: L'Essence */}
        <EssenceSection />

        {/* Call to Action: Découvrir la Carte / Menu Page */}
        <MenuCtaSection
          onNavigateToMenu={() => {
            window.history.pushState({}, '', '/menu');
            setRouteInfo(getRouteInfo());
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />

        {/* Section 3: L'Environnement (The warm light beige/taupe #E9E2D6 section) */}
        <EnvironmentSection />

        {/* Section 4: Nos Valeurs */}
        <ValuesSection />
      </main>

      {/* Section 5: Footer */}
      <FooterSection />

      {/* 
        Gradual Blur across the entire page (fixed bottom).
        Smoothly fades out when scroll hits the last position of the page or when navigation menu is opened.
      */}
      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={isAtBottom || isNavOpen ? 0 : 1}
        duration="0.4s"
        easing="ease-out"
        zIndex={40}
      />
    </div>
  );
}
