import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Restaurant } from '@/functions/swagger/BelajarNextJsBackEnd';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import { Page } from '@/types/Page';
import { Alert } from 'antd';
import Link from 'next/link';
import useSwr from 'swr';

// C- Create
// R- Read
// U- Update
// D- Delete

const RestaurantTableRow: React.FC<{
    restaurant: Restaurant
}> = ({ restaurant }) => {
    return (
        <tr>
            <td className="border px-4 py-2">
                <Link href={`/restaurant/${restaurant.id}`}>
                    {restaurant.name}
                </Link>
            </td>
        </tr>
    );
};

const IndexPage: Page = () => {

    const swrFetcher = useSwrFetcherWithAccessToken();
    const { data, error } = useSwr<Restaurant[]>('/api/be/api/Restaurants', swrFetcher);

    return (
        <div>
            <Title>List of Restaurant</Title>
            <h2 className='mb-5 text-3xl'>List of Restaurant</h2>

            {Boolean(error) && <Alert type='error' message='Cannot get Restaurants data' description={String(error)}></Alert>}
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <RestaurantTableRow key={i} restaurant={x}></RestaurantTableRow>)}
                </tbody>
            </table>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
