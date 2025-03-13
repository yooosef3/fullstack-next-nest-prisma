import { Paper, Group, Stack, Text, RingProgress } from '@mantine/core';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  percentenge: string | number;
  amount: string | number;
  color: string;
}

const DashboardCard = ({ title, icon, percentenge, amount, color }: DashboardCardProps) => {
  const progress = Number(percentenge) || 0;

  return (
    <Paper
      p="xl"
      radius="md"
      bg="#111C42"
      className="transition-transform hover:scale-105 duration-200"
      style={{ minWidth: 320 }}
    >
      <Group justify="space-between" align="flex-start">
        <Stack gap="xs">
          <Text c="#46CBA0" size="xl" className="md:text-3xl xl:text-4xl">
            {icon}
          </Text>
          <Text c="white" size="xl" className="xl:text-2xl">
            {Number(amount).toLocaleString('fa-IR')}
          </Text>
        </Stack>
        <RingProgress
          size={80}
          thickness={8}
          roundCaps
          rootColor="rgba(255,255,255,0.1)"
          sections={[{ value: progress, color }]}
          label={
            <Text c={color} fw={700} ta="center" size="sm">
              {progress.toLocaleString('fa-IR')}%
            </Text>
          }
        />
      </Group>
      <Group justify="space-between" mt="md">
        <Text c="#46CBA0" className="text-xl xl:text-2xl">
          {title}
        </Text>
        <Text c="white" className="text-xl xl:text-2xl" dir="ltr">
          {Number(percentenge).toLocaleString('fa-IR')}%
        </Text>
      </Group>
    </Paper>
  );
};

export default DashboardCard;