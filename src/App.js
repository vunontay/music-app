import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes/routes';
import DefaultLayout from './Layouts/DefaultLayout';
import ButtonTop from './components/ButtonTop/ButtonTop';
import { Helmet } from 'react-helmet';

function App() {
    return (
        <Router>
            <div className="App">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Music App</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                    <meta name="description" content="Helmet application" />
                </Helmet>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
            <ButtonTop />
        </Router>
    );
}

export default App;
