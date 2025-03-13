"use client";
import React from 'react';
import { Paper, Title, Box, Group, Text, Stack } from '@mantine/core';

const data = [
  { date: 'فروردین', orders: 4000 },
  { date: 'اردیبهشت', orders: 3000 },
  { date: 'خرداد', orders: 2000 },
  { date: 'تیر', orders: 2780 },
  { date: 'مرداد', orders: 1890 },
  { date: 'شهریور', orders: 2390 },
  { date: 'مهر', orders: 3490 },
];

const maxValue = Math.max(...data.map(d => d.orders));

const OrderChart = () => {
  return (
    <Paper bg="#111C42" radius="md" p={40}>
      <Box h={400} pos="relative">
        <Box
          pos="absolute"
          top={0}
          left={0}
          right={0}
          bottom={30}
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100% 25%',
            pointerEvents: 'none',
          }}
        />
        
        <Group h="100%" gap="md" align="flex-end" pt={20}>
          {data.map((item, index) => (
            <Stack 
              key={item.date} 
              h="100%" 
              justify="flex-end" 
              style={{ flex: 1 }}
              className="animate-fadeIn"
            >
              <Box
                h={`${(item.orders / maxValue) * 80}%`}
                bg="#46CBA0"
                className="transition-all duration-300 hover:scale-105 hover:opacity-100 opacity-70"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '500ms',
                }}
              >
                <Text 
                  c="white" 
                  ta="center" 
                  size="sm" 
                  pos="absolute" 
                  top={-25} 
                  left={0} 
                  right={0}
                >
                  {item.orders.toLocaleString('fa-IR')}
                </Text>
              </Box>
              <Text c="dimmed" size="sm" ta="center">
                {item.date}
              </Text>
            </Stack>
          ))}
        </Group>
      </Box>
    </Paper>
  );
};

export default OrderChart;
