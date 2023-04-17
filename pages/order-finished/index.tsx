import Link from 'next/link';
import { WithDefaultLayout } from '../../components/DefautLayout';
import { Title } from '../../components/Title';
import { Page } from '../../types/Page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const IndexPage: Page = () => {
    return (
        <div className='flex'>
            <Title>Order Complete</Title>
            <FontAwesomeIcon icon={faThumbsUp} className='ml-24 fixed'></FontAwesomeIcon>
            <Link href='/restaurant' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mt-5'>Thankyou For Your Purchase!</Link>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
