import Sidebar from '../components/Sidebar';
import { Bell, Search, UserCircle } from 'lucide-react';
import '../globals.css';

export default function SellerLayout({ children }) {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/70">
                    <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl group transition-all hover:bg-white hover:ring-2 hover:ring-primary-500">
                        <Search className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                        <input type="text" placeholder="Search orders, products..." className="bg-transparent border-none focus:outline-none text-slate-600 font-medium placeholder:font-normal placeholder:text-slate-400" />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative cursor-pointer hover:bg-slate-100 p-2 rounded-full transition-all">
                            <Bell className="w-6 h-6 text-slate-600" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl hover:bg-white transition-all cursor-pointer group">
                            <div className="flex flex-col text-right">
                                <span className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">UltraStore</span>
                                <span className="text-[10px] font-bold text-primary-500 uppercase tracking-tighter">Verified Seller</span>
                            </div>
                            <UserCircle className="w-10 h-10 text-slate-300 group-hover:text-primary-500 transition-colors" />
                        </div>
                    </div>
                </header>

                <main className="p-8 pb-16">
                    {children}
                </main>
            </div>
        </div>
    );
}
