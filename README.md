
<div style="display:flex;justify-content:center;align-items:center; gap:0.5em;"><h1>Bitsy</h1><img src="https://i.postimg.cc/HLpvFtRb/macaw.webp" height="30"></div>

A URL shortener made with React.js, TypeScript, Express.js, and PostgreSQL.

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

## API Reference

### Get shortened url path

```http
  POST /api/shorten-url
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `long_url` | `string` | **Required**. Add the long_url to the body of the request |

### Redirect to long url

```http
  GET /${short_path}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `short_path`      | `string` | **Required**. Shortened path |

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL`

## Screenshots

![App Screenshot](https://i.postimg.cc/GrpZJhQy/Screenshot-2023-01-10-111616.png)
![App Screenshot](https://i.postimg.cc/xn2LVq4k/Screenshot-2023-01-10-111910.png)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
