import { Store, Globe, MapPin, Phone, Mail, Camera, ShieldCheck, CheckCircle2, TrendingUp, DollarSign, Package, Users, ChevronRight, Settings, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';

export default function SellerProfile() {
    const storeStats = [
        { name: 'Global Rank', value: '#128', icon: Globe, color: 'indigo' },
        { name: 'Store Reputation', value: '4.9/5.0', icon: ShieldCheck, color: 'emerald' },
        { name: 'Active Users', value: '1.2M+', icon: Users, color: 'blue' },
    ];

    return (
        <div className="space-y-12">
            <div className="flex flex-wrap items-center justify-between gap-8 pb-10 border-b border-slate-100 italic">
                <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] p-4 text-white font-black text-3xl flex items-center justify-center rotate-6 hover:rotate-0 transition-all shadow-2xl shadow-indigo-100">
                        US
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">UltraStore <span className="text-primary-600">Official</span></h1>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="w-12 h-1 bg-indigo-600 rounded-full"></span>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] leading-none">Global Seller Protocol // VERIFIED</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md p-3 rounded-[2.5rem] border border-slate-100 ring-8 ring-slate-100/50 shadow-sm">
                    <button className="flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 hover:scale-[1.03] active:scale-95 transition-all group">
                        <Settings className="w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />
                        Sync Metadata
                    </button>
                    <button className="px-10 py-5 rounded-3xl text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-[0.3em]">View Public View</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-10 order-2 lg:order-1">
                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-10 group hover:shadow-2xl hover:shadow-indigo-100/30 transition-all duration-700 relative overflow-hidden">
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic underline decoration-indigo-500/20 decoration-8 underline-offset-8">Store Protocol</h3>
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group/item">
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center p-4 border border-indigo-100 group-hover/item:bg-indigo-600 transition-all shadow-sm">
                                    <MapPin className="w-6 h-6 text-indigo-600 group-hover/item:text-white" />
                                </div>
                                <div>
                                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic leading-none mb-1">Base HQ</p>
                                    <span className="text-slate-900 font-black text-sm uppercase tracking-wide">DHA Phase 5, Lahore, PK</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group/item">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center p-4 border border-emerald-100 group-hover/item:bg-emerald-600 transition-all shadow-sm">
                                    <Phone className="w-6 h-6 text-emerald-600 group-hover/item:text-white" />
                                </div>
                                <div>
                                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic leading-none mb-1">Comm Vector</p>
                                    <span className="text-slate-900 font-black text-sm uppercase tracking-wide">+92 300 1234567</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group/item">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center p-4 border border-blue-100 group-hover/item:bg-blue-600 transition-all shadow-sm">
                                    <Mail className="w-6 h-6 text-blue-600 group-hover/item:text-white" />
                                </div>
                                <div>
                                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic leading-none mb-1">Digital Mesh</p>
                                    <span className="text-slate-900 font-black text-sm uppercase tracking-wide">ops@ultrastore.pk</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden h-96 group">
                        <div className="absolute top-0 right-0 w-64 h-full pointer-events-none -z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 to-transparent"></div>
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex items-center gap-4">
                                <ShieldCheck className="w-10 h-10 text-indigo-400 animate-pulse bg-indigo-500/10 p-2 rounded-xl border border-indigo-400/20" />
                                <h3 className="text-2xl font-black text-white italic tracking-tight">Security Lock</h3>
                            </div>
                            <div className="space-y-4">
                                <p className="text-indigo-300 font-bold text-xs leading-relaxed uppercase tracking-widest">Two-Factor Authentication: <span className="text-white">DEPLOYED</span></p>
                                <p className="text-indigo-300 font-bold text-xs leading-relaxed uppercase tracking-widest">Withdrawal Address: <span className="text-white">PK-BANK-0319</span></p>
                            </div>
                            <button className="w-full bg-white/10 hover:bg-white text-white hover:text-slate-950 py-5 rounded-3xl font-black text-xs transition-all uppercase tracking-[0.3em] border border-white/10 shadow-xl group-hover:scale-[1.02]">Audit Firewall</button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-10 order-1 lg:order-2">
                    <div className="bg-white p-12 rounded-[4.5rem] border border-slate-100 shadow-sm space-y-12 group hover:shadow-2xl hover:shadow-indigo-100/30 transition-all duration-700 relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-4">
                                Visual Identity
                                <span className="bg-indigo-50 text-indigo-600 text-[8px] font-black px-4 py-1.5 rounded-full border border-indigo-100/50 uppercase tracking-widest leading-none">CUSTOM ASSETS SYNCED</span>
                            </h2>
                            <SlidersHorizontal className="w-6 h-6 text-slate-300" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block px-4 opacity-70">Store Banner Matrix</label>
                                <div className="aspect-[21/9] bg-slate-50 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center p-8 group/box cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-inner overflow-hidden relative">
                                    <ImageIcon className="w-12 h-12 text-slate-200 mb-4 group-hover/box:text-indigo-400 transition-all group-hover/box:scale-110" />
                                    <span className="text-xs font-black text-slate-300 uppercase tracking-widest group-hover/box:text-indigo-600 transition-all">Upload High-Res Canvas</span>
                                    <div className="absolute inset-0 bg-slate-100/50 opacity-0 group-hover/box:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block px-4 opacity-70">Logotype Interface</label>
                                <div className="aspect-square w-full max-w-[200px] bg-slate-50 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center p-8 group/box cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-inner overflow-hidden relative">
                                    <Camera className="w-10 h-10 text-slate-200 mb-4 group-hover/box:text-indigo-400 transition-all group-hover/box:scale-110" />
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center group-hover/box:text-indigo-600 transition-all">Update Avatar Matrix</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 pt-8 border-t border-slate-50">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Platform Parameters</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block px-4 group-focus-within:text-indigo-600 transition-colors">Display Nominee</label>
                                    <input type="text" defaultValue="UltraStore Official" className="w-full bg-slate-50/50 border border-slate-100 p-6 rounded-[2.5rem] focus:outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-200 font-black text-sm uppercase tracking-widest text-slate-900 transition-all shadow-inner" />
                                </div>
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block px-4 group-focus-within:text-indigo-600 transition-colors">Digital Handle</label>
                                    <input type="text" defaultValue="ultrastore_global" className="w-full bg-slate-50/50 border border-slate-100 p-6 rounded-[2.5rem] focus:outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-200 font-black text-sm lowercase tracking-widest text-slate-900 transition-all shadow-inner" />
                                </div>
                                <div className="md:col-span-2 space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block px-4 group-focus-within:text-indigo-600 transition-colors">Mission Core (Bio)</label>
                                    <textarea className="w-full bg-slate-50/50 border border-slate-100 p-8 rounded-[3rem] focus:outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-200 font-bold text-sm text-slate-900 transition-all shadow-inner min-h-[160px]" defaultValue="We deliver specialized AI hardware and premium electronics across the global marketplace with 256-bit secure encryption and tracked logistics."></textarea>
                                </div>
                            </div>
                            <button className="w-full bg-indigo-600 text-white py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all">Save Core Parameters</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
