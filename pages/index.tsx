import Link from 'next/link';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';

const IndexPage: Page = () => {
    return (
        <div>
            <Title>Home</Title>
            <Link href='/restaurant' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block'>GripFood</Link>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
