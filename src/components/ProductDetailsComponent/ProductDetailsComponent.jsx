
import {GrLocation} from 'react-icons/gr'
import { Col, Image, Rate, Row, Button, InputNumber } from 'antd'
import React from 'react'
import { WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice, initFacebookSDK } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import CommentComponent from '../CommentComponent/CommentComponent'

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  useEffect(() => {
    if (order.isSucessOrder) {
      message.success('Đã thêm vào giỏ hàng');
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSucessOrder]);

  const { isLoading, data: productDetails } = useQuery(
    ['product-details', idProduct],
    fetchGetDetailsProduct,
    { enabled: !!idProduct }
  );
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', { state: location?.pathname });
    } else {
      // {
      //     name: { type: String, required: true },
      //     amount: { type: Number, required: true },
      //     image: { type: String, required: true },
      //     price: { type: Number, required: true },
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInstock: productDetails?.countInStock,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <Row
        style={{
          padding: '16px',
          background: '#fff',
          borderRadius: '4px',
          height: '100%',
        }}
      >
        <Col
          span={10}
          style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}
        >
          <Image
            src={productDetails?.image}
            alt='image prodcut'
            preview={false}
          />
          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            <WrapperStyleColImage span={4} className='border-r-2'>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt='image small'
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4} className='border-r-2'>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt='image small'
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4} className='border-r-2'>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt='image small'
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4} className='border-r-2'>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt='image small'
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4} className='border-r-2'>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt='image small'
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={productDetails?.image}
                alt='image small'
                preview={false}
              />
            </WrapperStyleColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }}>
          <div className='text-6xl font-semibold mb-4'>
            {productDetails?.name}
          </div>
          <div className='flex items-center mb-4'>
            <Rate
              className='text-2xl'
              allowHalf
              defaultValue={productDetails?.rating}
              value={productDetails?.rating}
            />
            <div className='ml-4'>
              <Button type='link'>100 đánh giá</Button>
            </div>
          </div>
          <div>
            Thương hiệu:<Button type='link'>Apple</Button>
          </div>
          <div className='text-5xl text-[#f57224] my-4'>
            {productDetails?.price.toLocaleString('de-DE')}₫
          </div>
          <div className='flex my-6 items-center'>
            Khuyến mãi
            <div className='ml-4 bg-[#f57224] p-2 pr-4 text-white'>
              😍 SĂN SALE HÀNG HIÊU - ƯU ĐÃI VOUCHER BÙNG NỔ 😍 <br />
            </div>
          </div>
          <div className='flex items-center'>
            <GrLocation size={20} className='mr-2' />
            <div className='address mr-4'>{user?.address}</div>
            <Button type='primary' danger>
              Thay đổi
            </Button>
          </div>
          <div className='flex items-center mb-4 py-4'>
            <div className='mr-6'>Số lượng</div>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              onChange={onChange}
            />
          </div>
          <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
            <div>
              <ButtonComponent
                size={40}
                styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '220px',
                  border: 'none',
                  borderRadius: '4px',
                }}
                onClick={handleAddOrderProduct}
                textbutton={'Chọn mua'}
                styleTextButton={{
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '700',
                }}
              ></ButtonComponent>
              {errorLimitOrder && (
                <div style={{ color: 'red' }}>Sản phẩm hết hàng</div>
              )}
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: '#fff',
                height: '48px',
                width: '220px',
                border: '1px solid rgb(13, 92, 182)',
                borderRadius: '4px',
              }}
              textbutton={'Mua trả sau'}
              styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
