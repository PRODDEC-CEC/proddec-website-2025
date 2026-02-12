import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsCollection = collection(db, 'projects');
                const q = query(projectsCollection, orderBy('createdAt', 'desc')); // Assuming you want projects sorted by creation time
                const snapshot = await getDocs(q);

                const projectsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setProjects(projectsList);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, loading, error };
};

export default useProjects;
