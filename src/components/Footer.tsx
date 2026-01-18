'use client';

export default function Footer() {
    return (
        <footer className="relative py-10 mt-20 overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-t after:from-blue-600/30 after:via-blue-500/10 after:to-transparent after:pointer-events-none">
            <div className="max-w-7xl mx-auto px-4">

                {/* Large Text */}
                <div className="flex justify-center items-center select-none pointer-events-none">
                    <h3 className="text-[12vw] font-black text-fill-color opacity-10 mx-2 tracking-tighter">
                        NWW
                    </h3>
                    <h3 className="text-[12vw] font-black text-fill-color opacity-10 mx-2 tracking-tighter">
                        AIRDROP
                    </h3>
                </div>

                {/* Links and Copyright */}
                <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-sm text-fill-color/60 border-t border-white/5 pt-8">

                    <p className="order-2 md:order-1 mt-8 md:mt-0 text-center md:text-left">
                        &copy; Nww Airdrop, 2026.
                    </p>

                    <div className="order-1 md:order-2 flex space-x-6 mt-4 md:mt-0">
                        <a href="#features" className="text-fill-color/60 hover:text-fill-color transition-colors">
                            Features
                        </a>
                        <a href="#heatmap" className="text-fill-color/60 hover:text-fill-color transition-colors">
                            Heatmap
                        </a>
                        <a href="#alpha" className="text-fill-color/60 hover:text-fill-color transition-colors">
                            Alpha
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
}