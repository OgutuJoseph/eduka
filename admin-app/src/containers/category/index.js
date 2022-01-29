import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'; 
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions';
import Input from '../../components/ui/input'; 
import CheckboxTree from 'react-checkbox-tree';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowForward, IoIosArrowDown, IoIosAdd, IoIosCloudUpload, IoIosTrash } from 'react-icons/io';
 import 'react-checkbox-tree/lib/react-checkbox-tree.css';
 import './style.css';

const Category = (props) => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded,setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]); 
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

    useEffect(() => {

        document.title ='eDuka | Admin | Categories';
 
    }, []);

    const handleClose = () => {     
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    const handleAddCategory = () => {

        if(categoryName === '')
        {
            alert('Name is required');
            return;
        }

        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // };

        // console.log(cat);

        setShow(false);
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for(let category of categories){
            myCategories.push(
                // <li key={category.name}>
                //     {category.name}
                //     {category.children.length > 0 ? (<ul>{ renderCategories(category.children) }</ul>) : null }
                // </li>
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    };

    const createCategoryList = (categories, options = []) => {
        for(let category of categories){
            options.push({ value: category._id, name: category.name, parentId: category.parentId, type: category.type });
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options;
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const renderAddCategoriesModal = () => {
        return (
            <Modal show={show} onHide={handleClose} modalTitle={'Add New Category'}> 
                <Modal.Header closeButton> 
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                            <Input label='Name' className='form-control' value={categoryName} placeholder={`Category Name`} onChange={(e) => setCategoryName(e.target.value)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label>Parent Category</label>
                            <select className='form-control' value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
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
                                <Input label='Category Image' type='file' name='categoryImage' onChange={handleCategoryImage} className='form-control' /> 
                            </Col>
                        </Row>  
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button size='md' style={{ margin: '10px'}} variant='secondary' onClick={handleClose}>Close</Button>
                    <Button size='md' style={{ margin: '10px'}} variant='primary' onClick={handleAddCategory}>Save Changes</Button> 
                </Modal.Footer>
            </Modal>
        );
    };

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };
    const handleShowUpdateModal = () => {
        setShowUpdateModal(true);
        updateCheckedAndExpandedCategories();
    }; 

    const handleCategoryInput = (key, value, index, type) => {
        console.log(value);
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    };

    const renderUpdateCategoriesModal = () => {
        console.log({expandedArray, checkedArray})
        return (
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} modalTitle={'Edit Category'} size='lg'> 
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h6>Expanded</h6>
                        </Col>
                    </Row>
                    {
                        expandedArray.length > 0 &&
                        expandedArray.map((item, index) => 
                        <Row key={index}>
                            <Col>
                                <Input 
                                label='Name'
                                className='form-control'
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                            </Col>
                            <Col>
                            <label>Parent Category</label>
                            <select className='form-control' value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>--Select Category--</option>
                                {
                                    createCategoryList(category.categories).map(option => 
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                            </Col>
                            <Col>
                                <label>Category Type</label>
                                <select className='form-control' value={item.type} onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}>
                                    <option>--Select Type--</option>
                                    <option value='store'>Store</option>
                                    <option value='product'>Product</option>
                                    <option value='page'>Page</option>
                                </select>
                            </Col>
                        </Row> 
                        )
                    } 
                    <Row>
                        <Col>
                            <h6>Checked</h6>
                        </Col>
                    </Row>
                    {
                        checkedArray.length > 0 &&
                        checkedArray.map((item, index) => 
                        <Row key={index}>
                            <Col>
                                <Input 
                                label='Name'
                                className='form-control'
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                            </Col>
                            <Col>
                                <label>Parent Category</label>
                                <select className='form-control' value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                    <option>--Select Category--</option>
                                    {
                                        createCategoryList(category.categories).map(option => 
                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <label>Category Type</label>
                                <select className='form-control' value={item.type} onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}>
                                    <option>--Select Type--</option>
                                    <option value='store'>Store</option>
                                    <option value='product'>Product</option>
                                    <option value='page'>Page</option>
                                </select>
                            </Col>
                        </Row> 
                        )
                    } 
                    {/* <br />
                    <label>Category Image</label>
                    <br/>
                    <input type='file' name='categoryImage' onChange={handleCategoryImage} /> 
                    <br /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button size='md' style={{ margin: '10px'}} variant='secondary' onClick={handleCloseUpdateModal}>Close</Button>
                    <Button size='md' style={{ margin: '10px'}} variant='primary' onClick={updateCategoriesForm}>Save Changes</Button>
                </Modal.Footer> 
            </Modal>
        );
    };

    const updateCategoriesForm = () => {

        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type);
        });
        dispatch(updateCategories(form));
        setShowUpdateModal(false);
    }
    
    const handleCloseDeleteModal = () => {     
        setShowDeleteModal(false);
    };
    const handleShowDeleteModal = () => {
        updateCheckedAndExpandedCategories();
        setShowDeleteModal(true);
    };

    const renderDeleteCategoryModal = () => { 
        return (
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Expanded</h5>
                    {
                        expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
                    }
                    <h5>Checked</h5>
                    {
                        checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
                    }
                <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button size='md' style={{ margin: '10px'}} variant='secondary' onClick={handleCloseDeleteModal}>No</Button>
                    <Button size='md' style={{ margin: '10px'}} variant='danger' onClick={deleteCategoriesForm}>Delete</Button>
                </Modal.Footer>
                
                
            </Modal>
        )
    };

    const deleteCategoriesForm = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));
        const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if(checkedIdsArray.length > 0)
        {
            dispatch(deleteCategoriesAction(checkedIdsArray))
            .then(result => {
                if(result)
                {
                    dispatch(getAllCategory())
                    setShowDeleteModal(false);
                }
            });
        }   
        setShowDeleteModal(false);    
    }

    return (
        <Layout sidebar>
            <Container>
                <Row> 
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className='actionBtnContainer'>
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd /><span>Add New</span></button>
                                <button onClick={handleShowUpdateModal}><IoIosCloudUpload /><span>Edit</span></button>
                                <button onClick={handleShowDeleteModal}><IoIosTrash /><span>Delete</span></button>
                            </div>
                        </div>
                    </Col>
                </Row> 
                <Row>
                    <Col md={12}>
                        {/* <ul>
                            { renderCategories(category.categories) }  
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container> 
            {renderAddCategoriesModal()}
            {/* Edit Modal */}
            {renderUpdateCategoriesModal()}
            {/* Delete Modal */}
            {renderDeleteCategoryModal()}
        </Layout>
    )
}

export default Category;