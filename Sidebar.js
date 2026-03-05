import { LayoutDashboard, Package, ShoppingCart, UserCheck, MessageSquare, Megaphone, Settings, LogOut, Store } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
        { name: 'Products', icon: Package, href: '/products' },
        { name: 'Orders', icon: ShoppingCart, href: '/orders' },
        { name: 'Customers', icon: UserCheck, href: '/customers' },
        { name: 'Messages', icon: MessageSquare, href: '/messages' },
        { name: 'Marketing', icon: Megaphone, href: '/marketing' },
        { name: 'Store Profile', icon: Store, href: '/profile' },
    ];

    return (
        <aside className="w-64 h-screen sticky top-0 bg-slate-900 text-slate-400 p-6 flex flex-col justify-between border-r border-slate-800">
            <div>
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-primary-500 p-2 rounded-xl">
                        <ShoppingCart className="text-white w-6 h-6" />
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">Seller Center</span>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all cursor-pointer group">
                                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="space-y-4 pt-10 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all cursor-pointer">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer text-red-400/80">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
