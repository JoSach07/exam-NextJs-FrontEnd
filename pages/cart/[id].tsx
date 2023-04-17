// import { WithDefaultLayout } from '@/components/DefautLayout';
// import { Title } from '@/components/Title';
// import { CartGridModels } from '@/functions/swagger/BelajarNextJsBackEnd';
// import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
// import { Page } from '@/types/Page';
// import { Alert } from 'antd';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import useSwr from 'swr';

// // C- Create
// // R- Read
// // U- Update
// // D- Delete

// const CartItemTableRow: React.FC<{
//     cartItem: CartDetail
// }> = ({ cartItem }) => {
//     return (
//         <div></div>
//     );
// };

// const IndexPage: Page = () => {
//     const router = useRouter();
//     const { id } = router.query;

//     const swrFetcher = useSwrFetcherWithAccessToken();
//     const { data, error } = useSwr<CartGridModels[]>(`/api/be/api/Carts/${id}`, swrFetcher);

//     return (
//         <div>
//             <Title>Cart</Title>
//             <h2 className='mb-5 text-3xl'>Cart</h2>

//             {Boolean(error) && <Alert type='error' message='Cannot get Cart data' description={String(error)}></Alert>}
//             <table className='table-auto mt-5'>
//                 <thead className='bg-slate-700 text-white'>
//                     <tr>
//                         <th className='px-4 py-2'>Name</th>
//                     </tr>
//                     <tr>
//                         <th className='px-4 py-2'>Qty</th>
//                     </tr>
//                     <tr>
//                         <th className='px-4 py-2'>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data?.map((x, i) => <CartItemTableRow key={i} cartDetail={x}></CartItemTableRow>)}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// IndexPage.layout = WithDefaultLayout;
// export default IndexPage;
