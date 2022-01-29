import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import './style.css'
import { generatePublicUrl } from '../../urlConfig';

const ProductListPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under10k: 10000,
        under15k: 15000,
        under20k: 20000
    });

    useEffect(() => {

        document.title ='eDuka | Products';
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug))
 
    });

    return (
        <Layout>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className='card'>
                            <div className='cardHeader'>
                                <div>{props.match.params.slug} Mobile Phones Under {priceRange[key]}</div>
                                <button>View All</button>
                            </div>
                            <div style={{ display: 'flex'}}>
                                {
                                    product.productsByPrice[key].map(product => 
                                        <div>
                                            <div className='productContainer'>
                                                <div className='productImgContainer'>
                                                    <img src={generatePublicUrl(product.productPictures[0].img)} alt='Product'  />
                                                </div>
                                            </div>
                                            <div className='productInfo'>
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                    <span>3533</span>
                                                </div>
                                                <div className='productPrice'>KES/- {product.price}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    );
                })
            }
        </Layout>
    )
}

export default ProductListPage;
