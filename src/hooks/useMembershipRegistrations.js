import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Hook to manage membership registration requests.
 * @returns {Object} { registrations, loading, error, updateStatus, deleteRegistration }
 */
const useMembershipRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const registrationsCollection = collection(db, 'membership_requests');
        // Order by creation time (most recent first)
        const q = query(registrationsCollection, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, 
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRegistrations(data);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching registrations:", err);
                setError(err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    /**
     * Update the status of a registration (e.g., 'approved', 'rejected')
     * @param {string} id - The registration document ID
     * @param {string} status - The new status
     */
    const updateStatus = async (id, status) => {
        try {
            const docRef = doc(db, 'membership_requests', id);
            await updateDoc(docRef, { status });
        } catch (err) {
            console.error("Error updating status:", err);
            throw err;
        }
    };

    /**
     * Delete a registration request
     * @param {string} id - The registration document ID
     */
    const deleteRegistration = async (id) => {
        try {
            const docRef = doc(db, 'membership_requests', id);
            await deleteDoc(docRef);
        } catch (err) {
            console.error("Error deleting registration:", err);
            throw err;
        }
    };

    return { registrations, loading, error, updateStatus, deleteRegistration };
};

export default useMembershipRegistrations;
