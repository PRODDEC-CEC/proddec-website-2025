import React, { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
    useEffect(() => {
        document.title = title ? `${title} | PRODDEC` : 'PRODDEC';

        const setMetaTag = (name, content) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.name = name;
                document.head.appendChild(element);
            }
            element.content = content;
        };

        if (description) {
            setMetaTag('description', description);
        }

        if (keywords) {
            setMetaTag('keywords', keywords);
        }
    }, [title, description, keywords]);

    return null;
};

export default SEO;
