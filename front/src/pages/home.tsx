import liff from "@line/liff";
import { useEffect, useState } from "react";

function Home() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<{
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
  }>();

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
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
          <ul>
            <li>userId: {profile.userId}</li>
            <li>displayName: {profile.displayName}</li>
            <li>
              <img src={profile.pictureUrl} width={100} />
            </li>
            <li>statusMessage: {profile.statusMessage}</li>
          </ul>
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
