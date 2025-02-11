'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Group, Text, Button, Menu, Avatar, Modal, ActionIcon, Tabs } from '@mantine/core';
import { IconChevronDown, IconLogout, IconUser, IconPackage, IconBuildingStore } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import AuthScreen from '@/screens/auth';

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();
  // TODO: Replace with actual auth state
  const isSignedIn = true;
  const user = {
    name: 'کاربر تست',
    email: 'test@example.com',
    avatar: null
  };

  const navLinks = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/aboutus', label: 'درباره ما' },
    { href: '/restaurant', label: 'رستوران‌ها' },
    { href: '/popularfoods', label: 'غذاهای محبوب' },
    { href: '/contactus', label: 'تماس با ما' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <Container size="lg">
        <Group justify="space-between" h="4rem">
          <Link href="/" className="text-2xl font-bold text-orange-600">
            <Text>FoodDelivery</Text>
          </Link>
          <Group gap="lg" visibleFrom="sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-orange-600'
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </Group>
          <Group>
            {!isSignedIn ? (
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <Button variant="subtle" c="orange" leftSection={
                    <Avatar color="orange" radius="xl" size="sm">
                      {user.name.charAt(0)}
                    </Avatar>
                  }>
                    {user.name}
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>حساب کاربری</Menu.Label>
                  <Menu.Item leftSection={<IconUser size={14} />}>
                    پروفایل
                  </Menu.Item>
                  <Menu.Item leftSection={<IconPackage size={14} />}>
                    سفارش‌های من
                  </Menu.Item>
                  <Menu.Item leftSection={<IconBuildingStore size={14} />}>
                    درخواست حساب فروشنده
                  </Menu.Item>
                  
                  <Menu.Divider />
                  
                  <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
                    خروج از حساب
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <ActionIcon variant="subtle" size="lg" onClick={open}>
                <IconUser color="orange" size={24} />
              </ActionIcon>
            )}
          </Group>
        </Group>
      </Container>

      <Modal 
        opened={opened} 
        onClose={close} 
        title="حساب کاربری" 
        centered
        size="md"
      >
        <AuthScreen setOpen={close} />
      </Modal>
    </header>
  );
}
