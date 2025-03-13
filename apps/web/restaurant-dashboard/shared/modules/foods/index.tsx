"use client";
import React from 'react'
import { Box, Table, Image, Text, Group, Button } from '@mantine/core';
import { Icons } from "@/utils/icon";

interface FoodDataType {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  created_at: string;
}

export default function FoodsList() {
  const records = [...Array(10)].map((_, index) => ({
    id: `food-${index + 1}`,
    name: "همبرگر دوبل",
    category: "فست فود",
    price: "180,000 تومان",
    description: "همبرگر دوبل با سس مخصوص",
    imageUrl: "https://placehold.co/100x100",
    created_at: "2 روز پیش",
  }));

  const columns = [
    { key: 'imageUrl', label: 'تصویر' },
    { key: 'name', label: 'نام غذا' },
    { key: 'category', label: 'دسته‌بندی' },
    { key: 'price', label: 'قیمت' },
    { key: 'description', label: 'توضیحات' },
    { key: 'created_at', label: 'تاریخ ثبت' },
    { key: 'actions', label: 'عملیات' },
  ];

  const handleDelete = (id: string) => {
    console.log('Deleting food:', id);
    // Add your delete logic here
  };

  return (
    <Box mt={40}>
      <Table.ScrollContainer h="85vh" minWidth={800}>
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          styles={{
            table: {
              backgroundColor: '#1F2A40',
            },
            thead: {
              backgroundColor: '#3e4396',
            },
            th: {
              color: 'white !important',
              borderBottom: 'none !important',
              backgroundColor: '#3e4396 !important',
            },
            tbody: {
              'tr td': {
                color: 'white',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2) !important',
              }
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              {columns.map((column) => (
                <Table.Th key={column.key}>{column.label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {records.map((record) => (
              <Table.Tr key={record.id}>
                {columns.map((column) => (
                  <Table.Td key={`${record.id}-${column.key}`}>
                    {column.key === 'actions' ? (
                      <Button
                        variant="subtle"
                        color="red"
                        size="xs"
                        onClick={() => handleDelete(record.id)}
                      >
                        {Icons.delete}
                      </Button>
                    ) : column.key === 'imageUrl' ? (
                      <Image src={record.imageUrl} alt={record.name} w={50} h={50} radius="sm" />
                    ) : column.key === 'description' ? (
                      <Text lineClamp={1}>{record[column.key]}</Text>
                    ) : (
                      record[column.key as keyof FoodDataType]
                    )}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Box>
  );
}
