import { useLocation } from 'react-router-dom';

const ReceivedCasting = () => {
    const location = useLocation();
    const { applicationCollection = [], myCallID } = location.state || {}; // fallback

    console.log("Received location state:", location.state);
    console.log("ApplicationCollection:", applicationCollection);
    console.log("myCallID:", myCallID);

    return (
        <div className='mb-20'>
            {applicationCollection.length > 0 ? (
                applicationCollection.map((data, index) => (
                    <ApplicantsCard key={index} {...data} received={true} />
                ))
            ) : (
                <p>No applicants found for this casting call.</p>
            )}
        </div>
    );
};

export default ReceivedCasting;
