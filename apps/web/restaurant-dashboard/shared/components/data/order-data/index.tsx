"use client";
import { Box, Table, Checkbox } from '@mantine/core';

interface OrdersDataType {
  id: string;
  name: string;
  email: string;
  title: string;
  price: string;
  created_at: string;
}

const OrdersData = ({ isDashboard }: { isDashboard?: boolean }) => {
  const records = [...Array(10)].map((_, index) => ({
    id: `order-${index + 1}`,
    name: "yusef khedri",
    email: "support@becodemy.com",
    title: "همبرگر",
    price: "12$",
    created_at: "2 روز پیش",
  }));

  const columns = [
    { key: 'id', label: 'شناسه' },
    { key: 'name', label: 'نام' },
    ...(isDashboard ? [] : [{ key: 'email', label: 'ایمیل' }]),
    { key: 'title', label: 'غذا' },
    { key: 'price', label: 'قیمت' },
    { key: 'created_at', label: 'تاریخ ثبت' },
  ];

  return (
    <Box mt={isDashboard ? 0 : 40}>
      <Table.ScrollContainer h={isDashboard ? '60vh' : '85vh'} minWidth={800}>
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
              {!isDashboard && <Table.Th w={38}></Table.Th>}
              {columns.map((column) => (
                <Table.Th key={column.key}>{column.label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {records.map((record) => (
              <Table.Tr key={record.id}>
                {!isDashboard && (
                  <Table.Td>
                    <Checkbox color="blue" />
                  </Table.Td>
                )}
                {columns.map((column) => (
                  <Table.Td key={`${record.id}-${column.key}`}>
                    {record[column.key as keyof OrdersDataType]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Box>
  );
};

export default OrdersData;