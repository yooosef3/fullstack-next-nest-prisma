'use client';

import Link from 'next/link';
import { Container, Grid, Stack, Text, Title } from '@mantine/core';

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <Container size="lg" py="xl">
        <Grid>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Stack>
              <Title order={4} className="text-gray-500 uppercase">شرکت</Title>
              <Stack gap="md">
                <Link href="/about" className="text-gray-600 hover:text-orange-600">
                  درباره ما
                </Link>
                <Link href="/careers" className="text-gray-600 hover:text-orange-600">
                  فرصت‌های شغلی
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-orange-600">
                  تماس با ما
                </Link>
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 3 }}>
            <Stack>
              <Title order={4} className="text-gray-500 uppercase">پشتیبانی</Title>
              <Stack gap="md">
                <Link href="/faq" className="text-gray-600 hover:text-orange-600">
                  سوالات متداول
                </Link>
                <Link href="/help" className="text-gray-600 hover:text-orange-600">
                  راهنما
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-orange-600">
                  حریم خصوصی
                </Link>
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 3 }}>
            <Stack>
              <Title order={4} className="text-gray-500 uppercase">خدمات</Title>
              <Stack gap="md">
                <Link href="/restaurants" className="text-gray-600 hover:text-orange-600">
                  رستوران‌ها
                </Link>
                <Link href="/delivery" className="text-gray-600 hover:text-orange-600">
                  سرویس تحویل
                </Link>
                <Link href="/offers" className="text-gray-600 hover:text-orange-600">
                  تخفیف‌ها
                </Link>
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 3 }}>
            <Stack>
              <Title order={4} className="text-gray-500 uppercase">دانلود اپلیکیشن</Title>
              <Stack gap="md">
                <Link href="/android" className="text-gray-600 hover:text-orange-600">
                  اندروید
                </Link>
                <Link href="/ios" className="text-gray-600 hover:text-orange-600">
                  آی‌او‌اس
                </Link>
                <Link href="/desktop" className="text-gray-600 hover:text-orange-600">
                  نسخه دسکتاپ
                </Link>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        <Text ta="center" mt="xl" c="dimmed" size="sm">
          &copy; {new Date().getFullYear()} FoodDelivery. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
