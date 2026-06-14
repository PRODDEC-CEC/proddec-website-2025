import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Loader from '../components/Loader';

const EventRedirect = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loadingFirebase, setLoadingFirebase] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [embedUrl, setEmbedUrl] = useState(null);

  useEffect(() => {
    const checkRedirect = async () => {
      try {
        if (!slug) return;

        // Query Firestore to see if this slug exists in the 'events' collection
        const q = query(collection(db, 'events'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Found an event with this slug!
          const eventData = querySnapshot.docs[0].data();
          
          if (eventData.registerLink) {
            let url = eventData.registerLink;
            // Extract src if user pasted a full <iframe ...> snippet
            if (url.includes('<iframe') && url.includes('src=')) {
              const match = url.match(/src="([^"]+)"/);
              if (match && match[1]) {
                url = match[1];
              }
            }
            setEmbedUrl(url);
          } else {
            // Otherwise, just go home
            navigate('/', { replace: true });
          }
        } else {
          // No event found with this slug, just redirect to home
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error("Error fetching redirect link:", error);
        navigate('/', { replace: true });
      } finally {
        setLoadingFirebase(false);
      }
    };

    checkRedirect();
  }, [slug, navigate]);

  const showLoader = loadingFirebase || (embedUrl && iframeLoading);

  return (
    <div className="fixed inset-0 z-40 bg-black w-full h-full flex flex-col">
      {/* Show the loader over everything while Firebase fetches AND iframe loads */}
      {showLoader && (
        <div className="absolute inset-0 z-50">
          <Loader />
        </div>
      )}
      
      {/* Hidden behind the loader until fully loaded */}
      {embedUrl && (
        <iframe 
          src={embedUrl} 
          className="w-full h-full border-0 flex-1"
          onLoad={() => setIframeLoading(false)}
          title="Event Registration"
        />
      )}
    </div>
  );
};

export default EventRedirect;
