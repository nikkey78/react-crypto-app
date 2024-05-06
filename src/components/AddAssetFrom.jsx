/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { useCrypto } from '../context/crypto-context';
import {
   Select,
   Space,
   Divider,
   Form,
   Button,
   InputNumber,
   DatePicker,
   Result,
} from 'antd';
import { CoinTitle } from './CoinTitle';

export default function AddAssetFrom({ onClose }) {
   const [coin, setCoin] = useState(null);
   const [submitted, setSubmitted] = useState(false);
   const assetRef = useRef();
   const { crypto, addAsset } = useCrypto();
   const [form] = Form.useForm();

   if (submitted) {
      return (
         <Result
            status='success'
            title='New Asset Added!'
            subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
            extra={[
               <Button type='primary' key='close' onClick={onClose}>
                  Close
               </Button>,
            ]}
         />
      );
   }

   if (!coin) {
      return (
         <Select
            style={{
               width: '100%',
            }}
            onSelect={value => setCoin(crypto.find(c => c.id === value))}
            placeholder='Select coin'
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
                  />{' '}
                  {option.data.label}
               </Space>
            )}
         />
      );
   }

   const validateMessages = {
      required: '${label} is required!',
      types: { number: '${label} in not valid number!' },
      number: { range: '${label} must be between in ${min} and ${max}!' },
   };

   function onFinish(value) {
      const newAsset = {
         id: coin.id,
         amount: value.amount,
         price: value.price,
         date: value.date?.$d ?? new Date(),
      };
      assetRef.current = newAsset;
      addAsset(newAsset);
      setSubmitted(true);
   }

   function handleAmountChange(value) {
      const price = form.getFieldValue('price');

      form.setFieldsValue({
         total: +(value * price).toFixed(2),
      });
   }

   function handlePriceChange(value) {
      const amount = form.getFieldValue('amount');
      form.setFieldsValue({
         total: +(amount * value).toFixed(2),
      });
   }

   return (
      <Form
         form={form}
         name='basic'
         labelCol={{
            span: 6,
         }}
         wrapperCol={{
            span: 16,
         }}
         style={{
            maxWidth: 400,
         }}
         initialValues={{ price: +coin.price.toFixed(2) }}
         onFinish={onFinish}
         autoComplete='off'
         validateMessages={validateMessages}>
         <CoinTitle coin={coin} />

         <Divider />

         <Form.Item
            label='Amount'
            name='amount'
            rules={[
               {
                  required: true,
                  type: 'number',
                  min: 0,
               },
            ]}>
            <InputNumber
               style={{ width: '100%' }}
               placeholder='Enter coin amount'
               onChange={handleAmountChange}
            />
         </Form.Item>

         <Form.Item label='Price' name='price'>
            <InputNumber
               style={{ width: '100%' }}
               onChange={handlePriceChange}
            />
         </Form.Item>

         <Form.Item label='Date & Time' name='date'>
            <DatePicker showTime style={{ width: '100%' }} />
         </Form.Item>

         <Form.Item label='Total' name='total'>
            <InputNumber style={{ width: '100%' }} disabled />
         </Form.Item>

         <Form.Item>
            <Button type='primary' htmlType='submit'>
               Add Asset
            </Button>
         </Form.Item>
      </Form>
   );
}
