import { Container, Card } from 'react-bootstrap';
export default function ProfileCard({ User }) {

  return (
    <Container fluid="lg">

      <Card className="mb-3 custom-card">
        <Card.Body>
          <div className="d-flex align-items-center">
            <img src="https://i.pravatar.cc/80" className="rounded-circle me-3" alt="profile" />
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
