"use client";
import React from 'react';
import { Paper, Title, Box, Group, Text } from '@mantine/core';

const data = [
  { month: 'فروردین', sales: 4000, orders: 240 },
  { month: 'اردیبهشت', sales: 3000, orders: 190 },
  { month: 'خرداد', sales: 2000, orders: 150 },
  { month: 'تیر', sales: 2780, orders: 185 },
  { month: 'مرداد', sales: 1890, orders: 142 },
  { month: 'شهریور', sales: 2390, orders: 178 },
  { month: 'مهر', sales: 3490, orders: 220 },
];

const maxValue = Math.max(...data.map(d => d.orders));

function AnalyticsChart() {
  return (
    <Paper p="xl" radius="md" bg="#111C42">
      <Title order={2} c="white" mb="xl">تحلیل فروش</Title>
      <Box h={400} pos="relative">
        {/* Grid Lines */}
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
        
        {/* Line Chart */}
        <Group h="100%" gap={0} align="flex-end" pt={20}>
          {data.map((item, index) => {
            const height = (item.orders / maxValue) * 80;
            const prevHeight = index > 0 ? (data[index - 1].orders / maxValue) * 80 : height;
            
            return (
              <Box
                key={item.month}
                style={{
                  flex: 1,
                  height: '100%',
                  position: 'relative',
                }}
              >
                {/* Line Connection */}
                {index > 0 && (
                  <Box
                    style={{
                      position: 'absolute',
                      bottom: `${prevHeight}%`,
                      left: '-50%',
                      width: '100%',
                      height: '2px',
                      background: '#46CBA0',
                      transform: `rotate(${Math.atan2(height - prevHeight, 100) * (180 / Math.PI)}deg)`,
                      transformOrigin: '0 50%',
                      opacity: 0.7,
                    }}
                  />
                )}
                
                {/* Data Point */}
                <Box
                  className="animate-fadeIn"
                  style={{
                    position: 'absolute',
                    bottom: `${height}%`,
                    left: '50%',
                    transform: 'translate(-50%, 50%)',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#46CBA0',
                    zIndex: 2,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    ':hover': {
                      transform: 'translate(-50%, 50%) scale(1.5)',
                    },
                  }}
                >
                  <Text
                    c="white"
                    size="xs"
                    style={{
                      position: 'absolute',
                      top: -25,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.orders.toLocaleString('fa-IR')}
                  </Text>
                </Box>
                
                {/* X-axis Label */}
                <Text
                  c="dimmed"
                  size="sm"
                  ta="center"
                  style={{
                    position: 'absolute',
                    bottom: -25,
                    width: '100%',
                  }}
                >
                  {item.month}
                </Text>
              </Box>
            );
          })}
        </Group>
      </Box>
    </Paper>
  );
}

export default AnalyticsChart;