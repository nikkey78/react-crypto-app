import { Table } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { capitalize } from '../../Utils';

const columns = [
   {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
   },
   {
      title: 'Price, $',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
   },
   {
      title: 'Amount',
      dataIndex: 'amount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.amount - b.amount,
   },
];

export default function AssetsTable() {
   const { assets } = useCrypto();

   const data = assets.map(a => ({
      key: a.id,
      name: capitalize(a.id),
      price: a.price,
      amount: a.amount,
   }));

   return <Table pagination={false} columns={columns} dataSource={data} />;
}
