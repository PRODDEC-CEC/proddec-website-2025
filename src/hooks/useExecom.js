import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const useExecom = () => {
    const [execom, setExecom] = useState({}); // Object grouped by year
    const [currentTeam, setCurrentTeam] = useState([]); // Array of current team members
    const [currentYear, setCurrentYear] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExecomData = async () => {
            try {
                // 1. Fetch Teams to find Current
                const teamsSnapshot = await getDocs(collection(db, 'execom_teams'));
                let activeYear = '';
                teamsSnapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.isCurrent) activeYear = data.year;
                });

                // Fallback to latest year string if no isCurrent found
                if (!activeYear && !teamsSnapshot.empty) {
                    const allYears = teamsSnapshot.docs.map(d => d.data().year).sort().reverse();
                    if (allYears.length > 0) activeYear = allYears[0];
                }

                setCurrentYear(activeYear);

                // 2. Fetch Members
                const execomCollection = collection(db, 'execom');
                const snapshot = await getDocs(execomCollection);

                const members = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Group by year
                const grouped = members.reduce((acc, member) => {
                    const year = member.year || 'Unknown';
                    if (!acc[year]) acc[year] = [];
                    acc[year].push(member);
                    return acc;
                }, {});

                
                // Sort members by 'order' field (ascending)
                Object.keys(grouped).forEach((year) => {
                    grouped[year].sort((a, b) => {
                        const valA = parseInt(a.order);
                        const valB = parseInt(b.order);
                        const orderA = isNaN(valA) ? 9999 : valA;
                        const orderB = isNaN(valB) ? 9999 : valB;
                        return orderA - orderB;
                    });
                });

                setExecom(grouped);
                setCurrentTeam(grouped[activeYear] || []);
                setLoading(false);

            } catch (err) {
                console.error("Error fetching execom:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchExecomData();
    }, []);

    return { execom, currentTeam, currentYear, loading, error };
};

export default useExecom;
