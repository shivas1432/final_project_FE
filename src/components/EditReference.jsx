import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/EditReference.css';

const EditReference = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', jobTitle: '', company: '', relationship: '', image: null });
  const [status, setStatus] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const fetchReferenceDetails = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/references/${id}`);
      if (!response.ok) throw new Error('Failed to fetch reference details');
      const data = await response.json();
      setFormData({ name: data.name || '', email: data.email || '', jobTitle: data.job_title || '', company: data.company || '', relationship: data.relationship || '', image: null });
      setImagePreview(data.image_path ? `http://localhost:8081/${data.image_path}` : null);
    } catch (error) {
      setStatus('Error fetching reference details.');
    }
  }, [id]);

  useEffect(() => { fetchReferenceDetails(); }, [fetchReferenceDetails]);

  const handleChange = (e) => { setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value })); };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({ ...prevData, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const formDataToSend = new FormData();
    for (const key in formData) formDataToSend.append(key, formData[key]);

    try {
      const response = await fetch(`http://localhost:8081/api/references/${id}`, { method: 'PUT', body: formDataToSend });
      if (!response.ok) throw new Error('Failed to update reference');
      setStatus('Reference updated successfully!');
      navigate('/references');
    } catch (error) {
      setStatus('Failed to update reference.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this reference?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/references/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete reference');
        setStatus('Reference deleted successfully!');
        navigate('/references');
      } catch (error) {
        setStatus('Failed to delete reference.');
      }
    }
  };

  return (
    <div className="edit-reference">
      <button onClick={() => navigate('/references')} className="back-button">Back</button>
      <h1>Edit Reference</h1>
      <form onSubmit={handleSubmit} className="reference-form">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Reference Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Reference Email" required />
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" required />
        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required />
        <input type="text" name="relationship" value={formData.relationship} onChange={handleChange} placeholder="Relationship" required />
        <div className="upload-container">
          <input type="file" accept="image/*" onChange={handleImageChange} className="upload-input" id="file-upload" />
          <label htmlFor="file-upload" className="upload-label">Upload Image (Optional)</label>
        </div>
        {imagePreview ? <img src={imagePreview} alt="Uploaded reference preview" className="image-preview" /> : <p>No image uploaded.</p>}
        <button type="submit" className="submit-button">Save Changes</button>
        <button type="button" className="delete-button" onClick={handleDelete}>Delete Reference</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default EditReference;
