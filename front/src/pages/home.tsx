import liff from '@line/liff';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<{
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
  }>();

  useEffect(() => {
    liff.ready
      .then(() => {
        setMessage('LIFF init succeeded.');
      })
      .catch((e: Error) => {
        setMessage('LIFF init failed.');
        setError(`${e}`);
      });
    (async () => {
      const currentProfile = await liff.getProfile();
      console.log(currentProfile);
      setProfile(currentProfile);
    })();
  }, [liff]);

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      {message && <p>{message}</p>}
      {profile && (
        <>
          <p>
            userId: {profile.userId}
            <br />
            displayName: {profile.displayName}
            <br />
            <img src={profile.pictureUrl} width={100} />
            <br />
            statusMessage: {profile.statusMessage}
            <br />
            <Link to="/questionnaire">Questionnaire</Link>
            <br />
            <Link to="/share">Share</Link>
          </p>
        </>
      )}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
    </div>
  );
}

export default Home;
