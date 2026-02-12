import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title ? `${title} | PRODDEC` : 'PRODDEC - Product Design & Development Centre'}</title>
            <meta name="description" content={description || "Product Design and Development Centre (PRODDEC) is a student-run organization at College of Engineering Chengannur focusing on innovation and technical excellence."} />
            <meta name="keywords" content={keywords || "PRODDEC, CET, Engineering, Design, Development, Projects, Students"} />
            <meta property="og:title" content={title ? `${title} | PRODDEC` : 'PRODDEC - Product Design & Development Centre'} />
            <meta property="og:description" content={description || "Product Design and Development Centre (PRODDEC) is a student-run organization at College of Engineering Chengannur focusing on innovation and technical excellence."} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

export default SEO;
