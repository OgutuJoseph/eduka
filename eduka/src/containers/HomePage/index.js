import React, { useEffect } from 'react' 
import Layout from '../../components/Layout';

const HomePage = (props) => {

    useEffect(() => {

        document.title ='eDuka | Home';
 
    }, []);
    
    return (
        <div>
            <Layout>
                HomePage
            </Layout>
        </div>
    )
}

export default HomePage;
