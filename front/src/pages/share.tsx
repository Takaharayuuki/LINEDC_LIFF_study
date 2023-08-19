import type { TextMessage } from '@line/bot-sdk';
import liff from '@line/liff';
import { ChangeEventHandler, useState } from 'react';
import '../styles/share.css';

function Share() {
  const [formData, setFormData] = useState({
    date: '',
    location: '',
    detail: '',
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onClickShare = () => {
    if (liff.isApiAvailable('shareTargetPicker')) {
      const message: TextMessage = {
        type: 'text',
        text: `イベントの詳細:\n日時: ${formData.date}\n場所: ${formData.location}\n詳細: ${formData.detail} \n\n LIFF勉強会情報アカウント を友だち追加できます\nhttps://lin.ee/xoM6MwD`,
      };

      liff
        .shareTargetPicker([message])
        .catch(() => {
          alert(ERROR_MESSAGE.SHARE_TARGET_PICKER);
        })
        .finally(() => {
          liff.closeWindow();
        });
    } else {
      alert(ERROR_MESSAGE.DEVICE_NOT_SUPPORTED);
    }
  };

  const ERROR_MESSAGE = {
    SHARE_TARGET_PICKER:
      'シェアターゲットピッカーの起動に失敗しました。少し時間をおいてから再度お試しください。',
    DEVICE_NOT_SUPPORTED:
      '申し訳ありませんが、このデバイスでは「シェアターゲットピッカー」が利用できません。他の方法で共有をお試しください。',
  };

  return (
    <div className="share">
      <div className="share-container">
        <h2 className="share-title">イベント招待</h2>
        <div className="input-group">
          <label>
            日時:
            <input
              className="input"
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            場所:
            <input
              className="input"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            詳細:
            <textarea
              className="textarea"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="share-button" onClick={onClickShare}>
          イベントを友達にシェアする
        </button>
      </div>
    </div>
  );
}

export default Share;
