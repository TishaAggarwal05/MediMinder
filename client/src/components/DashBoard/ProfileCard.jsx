import { Container, Card } from 'react-bootstrap';
import profileF from '../../assets/profile1.png';
import profileM from '../../assets/profile2.png';
export default function ProfileCard({ User }) {
  return (
    <Container fluid="lg">

      <Card className="mb-3 custom-card">
        <Card.Body>
          <div className="d-flex align-items-center">

            {User.gender=='Female'&&<img src={profileF} className="rounded-circle me-3 img-fluid" alt="profile" style={{width:'15%' ,height :'auto'}}/>}
            {User.gender=='Male'&&<img src={profileM} className="rounded-circle me-3 img-fluid" alt="profile" style={{width:'15%' ,height :'auto'}}/>}
            <div>
              <h5>{User.username}</h5>
              <p className="mb-1">Age: {User.age}</p>
              
              {User?.medicalConditions ? (
                <p>
                  {User.medicalConditions.map((cond, idx) => (
                    <span key={idx} className="badge bg-info text-dark me-2">
                      {cond.name}
                    </span>
                  ))}
                </p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
