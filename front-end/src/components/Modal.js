import React, { useState } from 'react';
import moment from 'moment';
import './Modal.css';

const Modal = ({ banner, onClose, onSubmit }) => {
  const [description, setDescription] = useState(banner?.description || '');
  const [timer, setTimer] = useState(banner?.timer || 0);
  const [link, setLink] = useState(banner?.link || '');
  const [visibleDateTime, setVisibleDateTime] = useState(banner?.visibleDateTime || moment().format('YYYY-MM-DDTHH:mm'));

  const handleSubmit = () => {
    const payload = {
      description,
      timer,
      link,
      visibleDateTime: new Date(visibleDateTime).toISOString(),
      visible: true,
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>{banner ? 'Edit Banner' : 'Create Banner'}</h2>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Timer (in seconds):</label>
          <input type="number" value={timer} onChange={e => setTimer(e.target.value)} />
        </div>
        <div>
          <label>Link:</label>
          <input type="text" value={link} onChange={e => setLink(e.target.value)} />
        </div>
        <div>
          <label>Visibility Date Time:</label>
          <input
            type="datetime-local"
            value={moment(visibleDateTime).format('YYYY-MM-DDTHH:mm')}
            onChange={e => setVisibleDateTime(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} className="btn">{banner ? 'Update Banner' : 'Create Banner'}</button>
      </div>
    </div>
  );
};

export default Modal;
