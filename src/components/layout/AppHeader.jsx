import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import { CoinInfoModal } from '../CoinInfoModal';
import AddAssetFrom from '../AddAssetFrom';

const headerStyle = {
   width: '100%',
   textAlign: 'center',
   height: 60,
   backgroundColor: '#2D25CF',
   padding: '1rem',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
};

export default function AppHeader() {
   const [select, setSelect] = useState(false);
   const [modal, setModal] = useState(false);
   const [draw, setDraw] = useState(false);
   const [coin, setCoin] = useState(null);
   const { crypto } = useCrypto();

   useEffect(() => {
      const keypress = e => {
         if (e.key === '/') {
            setSelect(prev => !prev);
         }
      };

      document.addEventListener('keypress', keypress);

      return () => document.removeEventListener('keypress', keypress);
   }, []);

   function handleSelect(value) {
      setCoin(crypto.find(c => c.id === value));
      setModal(true);
   }

   return (
      <Layout.Header style={headerStyle}>
         <Select
            style={{
               width: 250,
            }}
            open={select}
            onSelect={handleSelect}
            onClick={() => setSelect(prev => !prev)}
            value='press / to open'
            options={crypto.map(coin => ({
               label: coin.name,
               value: coin.id,
               icon: coin.icon,
            }))}
            optionRender={option => (
               <Space>
                  <img
                     style={{ width: 20 }}
                     src={option.data.icon}
                     alt={option.data.label}
                  />
                  {option.data.label}
               </Space>
            )}
         />
         <Button
            type='primary'
            onClick={() => {
               setDraw(true);
            }}>
            Add asset
         </Button>
         <Modal
            open={modal}
            onCancel={() => {
               setModal(false);
            }}
            footer={null}>
            <CoinInfoModal coin={coin} />
         </Modal>
         <Drawer
            title='Add Asset'
            width={400}
            onClose={() => {
               setDraw(false);
            }}
            open={draw}
            destroyOnClose>
            <AddAssetFrom onClose={() => setDraw(false)} />
         </Drawer>
      </Layout.Header>
   );
}
