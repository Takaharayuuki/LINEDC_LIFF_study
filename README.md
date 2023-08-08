# LINE DC LIFF study

## Prerequired

| tool  | version  |
| ----- | -------- |
| node  | v18.16.1 |
| npm   | 9.5.1    |
| yarn  | 1.22.19  |
| ngrok | 3.3.1    |

- ngrok をインストールする。

```bash
brew install ngrok
```

- <https://dashboard.ngrok.com/> にアクセスしサインアップした後、認証を行う。

```bash
ngrok config add-authtoken <your-auth-token>
```

## Getting Started - front

- `.env.sample`をコピーして`.env`を作成し、LIFF ID を入力してください。

```bash:
cd front

cp -pr .env.sample .env
```

- その後依存パッケージをインストールして、ローカルサーバーを起動します。

```bash:
yarn install
yarn dev
```

- 上記`yarn dev`で起動した localhost のポート番号を一時公開する。

```bash
ngrok http <vite locahost port>
```

- ngrok を起動したターミナルで表示されている `Forwarding` の `https://<ランダム値>.ngrok.io`（または `https://<ランダム値>.ngrok-free.app`）の URL を LINE Developers コンソールから、LIFF > LIFF アプリ詳細の Endpoint URL に指定する。

- 上記の設定を済ませた上で、LIFF URL にアクセスすると、LINE ログインが済んでいない場合は LINE ログインを促され、ngrok が払い出した URL にリダイレクトされる（ngrok の "You are about to visit..." のページが表示された場合は、自分の開発マシンの ngrok から払い出されたリンクであることを確認して "Visit Site" を押下して進む）。

## Getting Started - back

TBD
