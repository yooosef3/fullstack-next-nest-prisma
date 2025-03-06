'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Group, Text, Button, Menu, Avatar, Modal, ActionIcon, Tabs } from '@mantine/core';
import { IconLogout, IconUser, IconPackage, IconBuildingStore, IconMenu2, IconX } from '@tabler/icons-react';
import Cookies from "js-cookie";
import { useDisclosure } from '@mantine/hooks';
import AuthScreen from '@/screens/auth';
import useUser from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MobileSidebar from './MobileSidebar';

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { user, loading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsSignedIn(!!user)
    }
  }, [user, loading])

  const logoutHandler = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    toast.success("با موفقیت خارج شدید!");
    window.location.reload();
  }

  const navLinks = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/aboutus', label: 'درباره ما' },
    { href: '/restaurant', label: 'رستوران‌ها' },
    { href: '/popularfoods', label: 'غذاهای محبوب' },
    { href: '/contactus', label: 'تماس با ما' },
  ];

  const menuItems = [
    {
      id:1,
      label: "پروفایل",
      icon: IconUser,
      href: "/profile",
      onClick: null,
    },
    {
      id:2,
      label: "سفارش‌های من",
      icon: IconPackage,
      href: "/orders",
      onClick: null,
    },
    {
      id:3,
      label: "درخواست حساب فروشنده",
      icon: IconBuildingStore,
      href: "/become-seller",
      onClick: null,
    },
    {
      id:4,
      label: "خروج از حساب",
      icon: IconLogout,
      href: null,
      onClick: logoutHandler,
      color: "red"
    },
  ];

  return (
    <header className="bg-white shadow-sm sticky z-50 top-0 w-full">
      <Container size="lg">
        <Group justify="space-between" h="4rem">
          <Group gap="md">
            <ActionIcon 
              variant="subtle" 
              size="lg" 
              onClick={() => setMobileMenuOpen(true)}
              hiddenFrom="sm"
            >
              <IconMenu2 color="teal" size={24} />
            </ActionIcon>
            <Link href="/" className="text-2xl font-bold text-teal-600">
              <Text>FoodDelivery</Text>
            </Link>
          </Group>
          
          <Group gap="lg" visibleFrom="sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === link.href
                    ? 'text-teal-600'
                    : 'text-gray-700 hover:text-teal-600'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </Group>

          <Group>
            {isSignedIn ? (
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <Button variant="subtle" c="teal" leftSection={
                    <Avatar color="teal" radius="xl" size="34">
                    </Avatar>
                  }>
                  <span>{user?.name}</span>
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>حساب کاربری</Menu.Label>
                  {menuItems.map((item, index) => (
                    <Menu.Item
                      key={index}
                      {...(item.href ? { component: Link, href: item.href } : { component: 'button' as any })}
                      onClick={item.onClick || (() => {})}
                      color={item.color}
                      leftSection={<item.icon size={14} />}
                      className={`whitespace-nowrap text-slate-800 ${item.id === 4 ? 'hover:text-red-500' : 'hover:!text-teal-500'} duration-200`}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            ) : (
              <ActionIcon variant="subtle" size="lg" onClick={open}>
                <IconUser color="teal" size={24} />
              </ActionIcon>
            )}
          </Group>
        </Group>
      </Container>

      <MobileSidebar
        navLinks={navLinks}
        pathname={pathname}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Modal
        opened={opened}
        onClose={close}
        centered
        size="md"
      >
        <AuthScreen setOpen={close} />
      </Modal>
    </header>
  );
}
