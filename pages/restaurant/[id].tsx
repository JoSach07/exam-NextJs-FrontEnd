import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { BelajarNextJsBackEndClient, Restaurant, FoodItemDetailModel } from '@/functions/swagger/BelajarNextJsBackEnd';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import { Page } from '@/types/Page';
import { faBackward, faCartPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, notification } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSwr from 'swr';
import { useState } from 'react';
import { useAuthorizationContext } from '@/functions/AuthorizationContext';

// C- Create
// R- Read
// U- Update
// D- Delete

const FoodItemTableRow: React.FC<{
    foodItem: FoodItemDetailModel,
    onDeleted: () => void
}> = ({ foodItem }) => {

    const [qty, setQty] = useState(1);

    const { accessToken } = useAuthorizationContext();

    async function addToCart() {
        const client = new BelajarNextJsBackEndClient('http://localhost:3000/api/be', {
            fetch(url, init) {
                if (init && init.headers){
                    init.headers['Authorization'] = `Bearer ${accessToken}`
                }
                return fetch(url, init);
            }
        });
        try {
            await client.addItem({
                restaurantId: foodItem.restaurantId,
                foodItemId: foodItem.id,
                qty: qty
            });
            notification.success({
                type: 'success',
                placement: 'bottomRight',
                message: 'Added to cart',
                description: `Added ${qty} ${foodItem.name} to cart`
            });
        } catch (err) {
            notification.error({
                type: 'error',
                placement: 'bottomRight',
                message: 'Failed to add to cart',
                description: String(err)
            });
        }
    }

    return (
        <tr>
            <td className="border px-4 py-2">{foodItem.name}</td>
            <td className="border px-4 py-2">{foodItem.price}</td>
            <td className="border px-4 py-2">
                <div className='flex-[1]'>
                    <input value={qty} type='number' onChange={t => setQty(t.target.valueAsNumber)}
                        className='block w-full p-1 text-sm rounded-md border-gray-500 border-solid border'></input>
                </div>
                <button onClick={addToCart} className='block w-full p-1 text-sm rounded-md bg-blue-500 active:bg-blue-700 text-white' type='button'>
                    <FontAwesomeIcon icon={faCartPlus} className='mr-3'></FontAwesomeIcon>
                    Add to cart
                </button>
            </td>
        </tr>
    );
};

const RestaurantHeader: Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const swrFetcher = useSwrFetcherWithAccessToken();
    const { data, error } = useSwr<Restaurant>(`/api/be/api/Restaurants/${id}`, swrFetcher);

    if(data == null){
        return(
            <h2>Restaurant not found!</h2>
        )
    }

    return (
        <div>
            {data.name && <Title>{data.name}</Title>}
            <h2 className='mb-5 text-3xl'>{data.name}</h2>
            
            {Boolean(error) && <Alert type='error' message='Cannot get Restaurants data' description={String(error)}></Alert>}
        </div>
    );
}

const IndexPage: Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const swrFetcher = useSwrFetcherWithAccessToken();
    const { data, error, mutate } = useSwr<FoodItemDetailModel[]>(`/api/be/api/FoodItems/${id}`, swrFetcher);

    return (
        <div>
            <RestaurantHeader></RestaurantHeader>
            <div>
                <Link href='/restaurant' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block'>
                    <FontAwesomeIcon icon={faBackward} className='mr-2'></FontAwesomeIcon>
                    Back
                </Link>
            </div>

            {Boolean(error) && <Alert type='error' message='Cannot get fooditems data' description={String(error)}></Alert>}
            <table className='table-auto mt-5 mb-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Price</th>
                        <th className='px-4 py-2'></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <FoodItemTableRow key={i} foodItem={x} onDeleted={() => mutate()}></FoodItemTableRow>)}
                </tbody>
            </table>

            <div>
                <Link href='/restaurant' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block'>
                    <FontAwesomeIcon icon={faShoppingCart} className='mr-2'></FontAwesomeIcon>
                    Cart
                </Link>
            </div>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
