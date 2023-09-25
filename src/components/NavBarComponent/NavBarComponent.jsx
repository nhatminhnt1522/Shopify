import { Checkbox, Col, Rate, Row } from 'antd';
import React from 'react';
import {
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from './style';
import * as ProductService from '../../services/ProductService';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBarComponent = () => {
  const onChange = () => {};
  const navigate = useNavigate();
  const [typeProducts, setTypeProducts] = useState([]);
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === 'OK') {
      setTypeProducts(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case 'checkbox':
        return (
          <Checkbox.Group
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case 'star':
        return options.map((option) => {
          return (
            <div style={{ dispaly: 'flex' }}>
              <Rate
                style={{ fontSize: '12px' }}
                disabled
                defaultValue={option}
              />
              <span> {`tu ${option}  sao`}</span>
            </div>
          );
        });
      case 'price':
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };

  return (
    <div>
      <WrapperLableText>Lable</WrapperLableText>
      <div className='flex-col'>
        {typeProducts.map((type) => (
          <>
            <div className='my-2'>
              <a
                className='mr-2'
                onClick={() => {
                  navigate(
                    `/product/${type
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      ?.replace(/ /g, '_')}`,
                    { state: type }
                  );
                }}
              >
                {type}
              </a>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default NavBarComponent;