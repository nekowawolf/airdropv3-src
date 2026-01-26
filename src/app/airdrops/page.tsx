import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AirdropsContent from './AirdropsContent';
import { dashboardMetadata } from '@/constants/metadataTemplates';
import { Spinner } from "@/components/ui/spinner";

export const metadata = dashboardMetadata('Airdrops', 'Explore ongoing and completed airdrops.');

export default function AirdropsPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Spinner className="text-blue-500 size-10" /></div>}>
                <AirdropsContent />
            </Suspense>
            <Footer />
        </>
    );
}