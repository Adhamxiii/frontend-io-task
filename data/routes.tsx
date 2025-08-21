"use client";

import type { NavItem, FooterLink } from '@/types';

export const getNavLinks = (t: (key: string) => string): NavItem[] => [
  {
    title: t("home"),
    url: "/",
  },
  {
    title: t("about"),
    url: "/about",
  },
  {
    title: t("services"),
    url: "/services",
    items: [
      { title: t("services1"), url: "/services/1" },
      { title: t("services2"), url: "/services/2" },
      { title: t("services3"), url: "/services/3" },
      { title: t("services4"), url: "/services/2" },
      { title: t("services5"), url: "/services/5" },
    ],
  },
  {
    title: t("blog"),
    url: "/blog",
  },
  {
    title: t("ourTeam"),
    url: "/our-team",
  },
  {
    title: t("contact"),
    url: "/contact",
  },
];

export const getFooterLinks = (t: (key: string) => string): FooterLink[] => {
  return [
    {
      title: t("about"),
      link: "#",
    },
    {
      title: t("ourStrategy"),
      link: "#",
    },
    {
      title: t("ourAdvantages"),
      link: "#",
    },
    {
      title: t("socialResponsibility"),
      link: "#",
    },
    {
      title: t("ourServices"),
      link: "#",
    },
  ];
};
