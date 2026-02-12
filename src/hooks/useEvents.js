import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsCollection = collection(db, 'events');
                // Query events ordered by createdAt descending
                const q = query(eventsCollection, orderBy('createdAt', 'desc'));
                const snapshot = await getDocs(q);

                const eventsList = snapshot.docs.map(doc => ({
                    id: doc.id, // Use Firestore ID
                    ...doc.data()
                }));

                setEvents(eventsList);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return { events, loading, error };
};

export default useEvents;
