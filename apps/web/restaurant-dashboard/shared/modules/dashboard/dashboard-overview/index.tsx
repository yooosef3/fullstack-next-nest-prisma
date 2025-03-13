'use client';

import DashboardCard from "@/shared/components/layout/dashboard/dashboard-card";
import { Icons } from "@/utils/icon";

const DashboardOverview = () => {
  return (
    <div className="w-full flex items-center px-8 py-6 justify-between flex-wrap">
      <DashboardCard
        icon={Icons.overview}
        title="Sells Overview"
        color="red"
        percentenge="24"
        amount={'$2452'}
      />
      <DashboardCard
        icon={Icons.order}
        title="Total Orders"
        color="red"
        percentenge="-10"
        amount={'210'}
      />
      <DashboardCard
        icon={Icons.reviews}
        title="Shop Reviews"
        color="green"
        percentenge="2"
        amount={'34'}
      />
      <DashboardCard
        icon={Icons.reviews}
        title="Shop Reviews"
        color="green"
        percentenge="2"
        amount={'34'}
      />
    </div>
  );
};

export default DashboardOverview;