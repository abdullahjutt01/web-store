import { Shield, Users, Store, Package, ShoppingCart, MessageCircle, BarChart3, Settings, LogOut, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const AdminSidebar = () => {
    const menuItems = [
        { name: 'Overview', icon: BarChart3, href: '/' },
        { name: 'Seller Requests', icon: UserCheck, href: '/sellers', badge: 3 },
        { name: 'Products', icon: Package, href: '/products' },
        { name: 'Customers', icon: Users, href: '/users' },
        { name: 'Global Orders', icon: ShoppingCart, href: '/orders' },
        { name: 'Disputes', icon: MessageCircle, href: '/disputes', badge: 1 },
        { name: 'Platform Settings', icon: Settings, href: '/settings' },
    ];

    return (
        <aside className="w-72 h-screen sticky top-0 bg-white border-r border-slate-200 p-8 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-12">
                    <div className="bg-indigo-600 p-2.5 rounded-2xl rotate-3">
                        <Shield className="text-white w-7 h-7" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-black text-xl leading-none">UltraMart AI</span>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">Super Admin</span>
                    </div>
                </div>

                <nav className="space-y-3">
                    {menuItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <div className="flex items-center justify-between px-5 py-4 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold text-sm text-slate-600 group-hover:text-indigo-700 transition-colors uppercase tracking-wide">{item.name}</span>
                                </div>
                                {item.badge && (
                                    <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-indigo-200">{item.badge}</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-red-50 p-4 rounded-2xl transition-all">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center p-2 group-hover:bg-red-500 transition-colors">
                        <LogOut className="w-5 h-5 text-slate-500 group-hover:text-white" />
                    </div>
                    <span className="font-bold text-slate-600 group-hover:text-red-600 transition-colors">Sign Out</span>
                </div>
            </div>
        </aside>
    );
};

// Mock UserCheck icon since it wasn't imported in line 1
const UserCheck = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></svg>
);

export default AdminSidebar;
