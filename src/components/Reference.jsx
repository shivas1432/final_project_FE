import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Reference.css';

const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close-btn" onClick={onClose}>&times;</span>
        <img src={imageUrl} alt="LoR" className="modal-image-display" />
      </div>
    </div>
  );
};

const Reference = () => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoR, setSelectedLoR] = useState(null);

  const fetchReferences = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/references');
      if (!res.ok) throw new Error('Failed to fetch references');
      setReferences(await res.json());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReferences(); }, []);

  const handleViewLoR = (lorPath) => {
    setSelectedLoR(`http://localhost:8081/${lorPath}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoR(null);
  };

  return (
    <div className="reference">
      <h1>References</h1>
      {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : (
        <div className="reference-list">
          {references.length ? references.map((ref) => (
            <div key={ref.id} className="reference-item">
              <div className="reference-content">
                <img src={`http://localhost:8081/${ref.image_path || 'noimage.png'}`} alt="Reference" className="reference-image" />
                <div className="reference-info">
                  <h3>{ref.name}</h3>
                  <p>Email: {ref.email}</p>
                  <p>Job title: {ref.job_title}</p>
                  <p>Company: {ref.company}</p>
                  <p>Relationship: {ref.relationship}</p>
                  {ref.about_me && <p>About Me: {ref.about_me}</p>}
                  {ref.signature_path && (
                    <div className="reference-signature">
                      <p>Signature:</p>
                      <img src={`http://localhost:8081/${ref.signature_path}`} alt="Signature" className="signature-image" />
                    </div>
                  )}
                  {ref.lor_path ? (
                    <button onClick={() => handleViewLoR(ref.lor_path)} className="view-lor-button">View LoR</button>
                  ) : <p>No LoR uploaded</p>}
                  <Link to={`/edit-reference/${ref.id}`} className="edit-reference-button">Edit</Link>
                </div>
              </div>
            </div>
          )) : <p>No references found.</p>}
        </div>
      )}
      <Link to="/add-references" className="add-reference-button">+</Link>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} imageUrl={selectedLoR} />
    </div>
  );
};

export default Reference;
