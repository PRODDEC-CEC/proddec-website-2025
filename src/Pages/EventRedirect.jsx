import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Loader from '../components/Loader';

const EventRedirect = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
            // If it has a registerLink, redirect to it immediately
            window.location.href = eventData.registerLink;
          } else {
            // Optional: If it doesn't have a register link but has an event page, redirect there
            // navigate(`/event/${querySnapshot.docs[0].id}`);
            
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
        setLoading(false);
      }
    };

    checkRedirect();
  }, [slug, navigate]);

  if (loading) {
    return <Loader />;
  }

  return null;
};

export default EventRedirect;
