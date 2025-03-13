import DashboardData from '@/shared/modules/dashboard/dashboard-data'
import DashboardOverview from '@/shared/modules/dashboard/dashboard-overview'
import React from 'react'

export default function RestaurantDashboard() {
  return (
    <>
    <DashboardOverview/>
    <DashboardData />
    </>
  )
}
