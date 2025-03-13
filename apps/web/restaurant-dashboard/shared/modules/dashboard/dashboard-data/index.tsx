import OrderChart from "@/shared/components/data/order-chart";
import OrdersData from "@/shared/components/data/order-data";

const DashboardData = () => {
  return (
    <div className="w-full flex p-8 items-center justify-between">
      <div className="w-[56%]">
        <h3 className="text-2xl pb-2">سفارش‌های اخیر</h3>
        <OrdersData isDashboard={true} />
      </div>
      <div className="w-[43%]">
        <h3 className="text-2xl mb-[-2rem]">آمار سفارش‌ها</h3>
        <OrderChart />
      </div>
    </div>
  );
};

export default DashboardData;