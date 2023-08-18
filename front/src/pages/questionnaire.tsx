import liff from '@line/liff';
import axios from 'axios';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { ENV } from '../config';
import '../styles/questionnaire.css';

function Questionnaire() {
  const [message, setMessage] = useState('');
  const [idToken, setIdtoken] = useState<string | null>('');

  useEffect(() => {
    const token = liff.getIDToken();
    if (token !== null) {
      setIdtoken(token);
    }
  }, []);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const onSubmit = () => {
    if (idToken !== null) {
      axios
        .post(ENV.API_URL + '/message', {
          message: message,
          id_token: idToken,
        })
        .then(function (response) {
          console.log(response);
          liff.closeWindow();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.error('ID token is null.');
    }
  };

  return (
    <div className="questionnaire">
      <h2 className="questionnaire-title">勉強会アンケート</h2>
      <div className="questionnaire-container">
        <label className="questionnaire-label">
          この勉強会に参加したいと思った主な動機や理由は何でしたか？
        </label>
        <textarea
          name="question1"
          value={message}
          onChange={handleChange}
          className="questionnaire-input"
        />
        <button onClick={onSubmit} className="questionnaire-button">
          アンケートを送信
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;
