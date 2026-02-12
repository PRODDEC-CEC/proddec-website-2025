import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const useEvent = (id) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const docRef = doc(db, 'events', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setEvent({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError(new Error("Event not found"));
                }
            } catch (err) {
                console.error("Error fetching event:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    return { event, loading, error };
};

export default useEvent;
