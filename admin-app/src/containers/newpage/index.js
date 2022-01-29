import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout'; 
import { Modal, Button, Col, Row, Container } from 'react-bootstrap'; 
import Input from '../../components/ui/input'; 
import linearCategories from '../../helpers/linearCategories';
import { useSelector } from 'react-redux';
import { IoIosAdd, IoIosCloudUpload } from 'react-icons/io';

const NewPage = (props) => { 

  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [showUpdatePageModal, setShowUpdatePageModal] = useState(false);

  const handleCloseNewPageModal = () => setShowNewPageModal(false);
  const handleShowNewPageModal = () => setShowNewPageModal(true);

  const handleCloseUpdatePageModal = () => setShowUpdatePageModal(false);
  const handleShowUpdatePageModal = () => setShowUpdatePageModal(true);
  
  const [title, setTitle] = useState('');
  const category = useSelector(state => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [desc, setDesc] = useState('');
  const [banners, setBanners] = useState([]);


  useEffect(() => {

      document.title ='eDuka | Admin | Pages';

      setCategories(linearCategories(category.categories)); 
  }, [category]);

  const handleBannerImages = (e) => {
    console.log(e);
  };

  const handleProductImages = (e) => {
    console.log(e);
  };

  const renderNewPageModal = () => {
    return (
      <Modal show={showNewPageModal}  onHide={handleCloseNewPageModal} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>New Page</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col>
                    <label>Category</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className='form-control'>
                      <option value=''>--Select Category--</option>
                      {
                      categories.map(cat => 
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        )
                      }
                    </select>
                  </Col>
                </Row>  
                <Row>
                  <Col> 
                    <Input label='Page Title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'Page Title'} className='form-control'/>
                  </Col>
                </Row> 
                <Row>
                  <Col> 
                    <Input label='Decription' value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={'Page Description'} className='form-control'/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Input label='Banner Image(s)' type='file' name='banners' onChange={handleBannerImages} className='form-control' />
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <Input label='Product Image(s)' type='file' name='products' onChange={handleProductImages} className='form-control'/>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseNewPageModal}>Close</Button>
              <Button variant="primary">Understood</Button>
            </Modal.Footer>
          </Modal>
    )
  }

    return (
        <Layout sidebar>
          <Row> 
            <Col md={12}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Page</h3>
                    <div className='actionBtnContainer'>
                        <span>Actions: </span>
                        <button onClick={handleShowNewPageModal}><IoIosAdd /><span>Add New</span></button>
                        <button onClick={handleShowUpdatePageModal}><IoIosCloudUpload /><span>Edit</span></button> 
                    </div>
                </div>
            </Col>
          </Row>  
    
          {renderNewPageModal()}

          <Modal show={showUpdatePageModal} onHide={handleCloseUpdatePageModal} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
              <Modal.Title>Update Page</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              I will not close if you click outside me. Don't even try to press
              escape key.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdatePageModal}>Close</Button>
              <Button variant="primary">Understood</Button>
            </Modal.Footer>
          </Modal>
        </Layout>
      );
}

export default NewPage;
