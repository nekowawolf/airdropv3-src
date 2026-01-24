
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AirdropsContent from './AirdropsContent';
import { dashboardMetadata } from '@/constants/metadataTemplates';

export const metadata = dashboardMetadata('Airdrops', 'Explore ongoing and completed airdrops.');

export default function AirdropsPage() {
    return (
        <>
            <Header />
            <AirdropsContent />
            <Footer />
        </>
    );
}