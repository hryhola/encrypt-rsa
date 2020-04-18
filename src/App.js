/* eslint-disable no-extend-native */
import React, { useState } from 'react';
import NodeRSA from 'node-rsa';
import './App.scss';

function App() {
  console.clear();

  const [sourceText, setSourceText] = useState('');
  const [isVisibleError, setIsVisibleError] = useState(false);
  const [key, setKey] = useState(new NodeRSA({ b: 512 }));

  const handleDecryptInput = ({ target: { value } }) => {
    setSourceText(value);
  };

  const handleEncryptInput = ({ target: { value } }) => {
    try {
      setSourceText(key.decrypt(value, 'utf8'));
      setIsVisibleError(false);
    } catch (e) {
      setIsVisibleError(true);
    }
  };

  return (
    <div className='App'>
      <div>
        <div className='input-small '>
          <span>Приватний ключ</span>
          <textarea
            className='private'
            value={key.exportKey('private')}
            disabled
          />
        </div>
        <div className='input-small '>
          <span>Публічний ключ</span>
          <textarea
            className='public'
            value={key.exportKey('public')}
            disabled
          />
        </div>
        <div className='input'>
          <span>Розшифрований текст</span>
          <input type='text' onChange={handleDecryptInput} value={sourceText} />
        </div>
        <div className='input'>
          <span>Зашифрований текст</span>
          <textarea
            onChange={handleEncryptInput}
            value={key.encrypt(sourceText, 'base64')}
          />
        </div>
        {isVisibleError ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <i>Некоректний ключ</i>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
