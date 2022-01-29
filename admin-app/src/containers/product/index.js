import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap'; 
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions';
import Input from '../../components/ui/input'; 
import './style.css';
import { generatePublicUrl } from '../../urlConfig';

const Products = (props) => {

    
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [productDetailsModal, setProductDetailsModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);

    const [productName, setProductName] = useState(''); 
    const [productQuantity, setProductQuantity] = useState(''); 
    const [productPrice, setProductPrice] = useState(''); 
    const [productDescription, setProductDescription] = useState(''); 
    const [productCategoryId, setProductCategoryId] = useState(''); 
    const [productPictures, setProductPictures] = useState(''); 

    useEffect(() => {

        document.title ='eDuka | Admin | Products'; 
    }, []);

    const createCategoryList = (categories, options = []) => {
        for(let category of categories){
            options.push({ value: category._id, name: category.name });
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options;
    };

    const handleProductPictures = (e) => { 
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    };

    const handleClose = () => {

        const form = new FormData();
        form.append('name', productName);
        form.append('quantity', productQuantity);
        form.append('price', productPrice);
        form.append('description', productDescription);
        form.append('category', productCategoryId);
        
        for(let pic of productPictures){
            form.append('productPicture', pic)
        };

        dispatch(addProduct(form));

        setShow(false);
    };
    const handleShow = () => setShow(true);

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                <tr> 
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th> 
                    <th>Category</th> 
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ? 
                        product.products.map(product => 
                            <tr  key={product._id}> 
                                <td>{product.name}</td> 
                                <td>{product.price}</td> 
                                <td>{product.quantity}</td>  
                                <td>{product.category.name}</td> 
                                <td><button onClick={() => showProductDetailsModal(product)}>View</button></td>
                            </tr>
                        ) : null
                    } 
                </tbody>
            </Table>
        );
    };

    const renderAddProductModal = () => {
        return (
            <Modal show={show} onHide={handleClose}> 
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Input label='Name' value={productName} className='form-control' placeholder={`Product Name`} onChange={(e) => setProductName(e.target.value)}/> 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input label='Quantity' value={productQuantity} className='form-control' placeholder={`Product Quantity`} onChange={(e) => setProductQuantity(e.target.value)}/> 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input label='Price' value={productPrice} className='form-control' placeholder={`Product Price`} onChange={(e) => setProductPrice(e.target.value)}/> 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input label='Description' value={productDescription} className='form-control' placeholder={`Description`} onChange={(e) => setProductDescription(e.target.value)}/> 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>Product Category</label>
                            <select className='form-control' value={productCategoryId} onChange={(e) => setProductCategoryId(e.target.value)}>
                                <option>--Select Category--</option>
                                {
                                    createCategoryList(category.categories).map(option => 
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>                             
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {
                                    productPictures.length > 0 ? 
                                    productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                                }
                                <Input label='Product Image(s)' type='file' name='productImage' onChange={handleProductPictures} className='form-control'/>  
                            </Col>
                        </Row>
                    </Container>                     
                </Modal.Body>
                <Modal.Footer>
                    <Button size='md' style={{ margin: '10px'}} variant="secondary" onClick={handleClose}>Close</Button>
                    <Button size='md' style={{ margin: '10px'}} variant="primary" onClick={handleClose}>Save Changes</Button>   
                </Modal.Footer>     
            </Modal>
        );
    };   
    
    const handleCloseProductDetailsModal = () => {
        setProductDetailsModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailsModal(true);
    }

    const renderProductDetailsModal = () => {

        if(!productDetails){
            return null; 
        }

        return (
            <Modal show={productDetailsModal} onHide={handleCloseProductDetailsModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md='6'>
                            <label className='key'>Name</label>
                            <p className='value'>{productDetails.name}</p>
                        </Col>
                        <Col md='6'>
                            <label className='key'>Price</label>
                            <p className='value'>{productDetails.price}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <label className='key'>quantity</label>
                            <p className='value'>{productDetails.quantity}</p>
                        </Col>
                        <Col md='6'>
                            <label className='key'>Category</label>
                            <p className='value'>{productDetails.category.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='12'>
                            <label className='key'>Description</label>
                            <p className='value'>{productDetails.description}</p>
                        </Col> 
                    </Row>
                    <Row>
                        <Col >
                            <label className='key'>Picture(s)</label>
                            <div style={{ display: 'flex' }}>
                                {productDetails.productPictures.map(picture => 
                                    <div className='productImgContainer'>
                                        <img src={generatePublicUrl(picture.img)} alt='Product'/>
                                    </div>    
                                )}
                            </div>
                        </Col> 
                    </Row> 
                </Modal.Body>
                <Modal.Footer>
                    <Button size='md' style={{ margin: '10px'}} variant="secondary" onClick={handleCloseProductDetailsModal}>Close</Button> 
                </Modal.Footer>
            </Modal>
        )
    };

    return (
        <Layout sidebar>
            <Container>
                <Row> 
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add New</button>
                        </div>  
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container> 
            {renderAddProductModal()}
            {renderProductDetailsModal()}
        </Layout>
    )
}

export default Products;