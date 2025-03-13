import Link from 'next/link';

const Sidebar = () => {
  const navItems = [
    { href: '/dashboard', label: 'داشبورد' },
    { href: '/dashboard/orders', label: 'سفارش‌ها' },
    { href: '/dashboard/foods', label: 'منو' },
    { href: '/dashboard/create-food', label: 'ایجاد غذا' },
    { href: '/dashboard/analytics', label: 'آمار' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">پنل رستوران</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className="block p-2 rounded hover:bg-gray-700 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
