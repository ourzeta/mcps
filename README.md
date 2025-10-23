# Marketing Campaign Platform (MCP)

This repository contains the frontend and backend code for the Marketing Campaign Platform (MCP).

## Project Description

The MCP is a web application that displays a list of public promotional offers. The backend service fetches the latest promotional links and data, and the frontend displays this information in a user-friendly format.

## API Documentation

The MCP server provides the following API endpoint:

### Get Public Promotion List

This endpoint retrieves a list of all public, discountable promotional activities and dynamically generates the latest promotional links for each activity.

*   **HTTP Method**: `GET`
*   **Endpoint**: `/api/mcp/jutuike/public_promo_list`
*   **Example Request URL**: `https://<your-backend-service-domain>/api/mcp/jutuike/public_promo_list`

### Response Format

The API response follows a unified data structure, containing `code` and `data` top-level fields.

```json
{
  "code": 200,
  "data": [ ... ]
}
```

*   `code`: (Number) HTTP status code, `200` indicates success.
*   `data`: (Array) An array containing all activity objects.

### `data` Array Object Structure

Each object in the `data` array represents an independent promotional activity, with the following fields:

| Field Name | Type | Description |
| --- | --- | --- |
| `activityType` | String | The unique type identifier for the activity. |
| `activityName` | String | The name of the activity for display. |
| `actId` | String | The ID of the activity on the third-party platform. |
| `category` | String | The category to which the activity belongs. |
| `desc` | String | A brief description of the activity. |
| `link` | String | **Dynamically generated H5 promotional link**. This field may be an empty string if it fails to be retrieved. |
| `miniAppLink` | Object | **Dynamically generated mini-program promotional information**. This field will be an empty object if not supported or if retrieval fails. |

### `miniAppLink` Object Structure

The `miniAppLink` object contains the information required to jump to the promotional mini-program.

| Field Name | Type | Description |
| --- | --- | --- |
| `app_id` | String | The AppID of the WeChat mini-program. |
| `page_path` | String | The target page path of the mini-program, already containing promotional parameters. |
| `miniCode` | String | A QR code image URL pointing to the mini-program's promotional page (may be empty). |

### Full Response Example

```json
{
  "code": 200,
  "data": [
    {
      "activityType": "meituan_air_train_school",
      "activityName": "美团机票火车票开学季福利卷",
      "actId": "48",
      "category": "热门优惠（机票/火车票）",
      "desc": "美团官方机票火车票优惠，含开学季专属福利",
      "link": "https://kurl07.cn/7bWZrT",
      "miniAppLink": {}
    },
    {
      "activityType": "online_car_new_old",
      "activityName": "网约车顺风车不限新老有折扣",
      "actId": "42",
      "category": "出行类活动（网约车/顺风车）",
      "desc": "出行必领",
      "link": "https://kurl08.cn/7bUhFx",
      "miniAppLink": {
        "app_id": "wxaf35009675aa0b2a",
        "page_path": "/webx/entry/block-prevention?scene=Q00mnGo&source_id=234413jutuikedefault&ref_from=dunion",
        "miniCode": "https://ut-static.udache.com/t-painter/tpainter/qrcode/qrcodeda050aa7-9c2b-58eb-a88d-86d1067059730001.jpg"
      }
    }
    // ... more activities
  ]
}
```

## Deployment Guide (GitHub + Render)

This repository contains the frontend and backend code for the MCP server, which can be deployed online to be publicly accessible.

### 1. Prerequisites
1.  Register for a GitHub account: [https://github.com/](https://github.com/)
2.  Register for a Render account: [https://render.com/](https://render.com/) (the free tier is sufficient for deploying the backend service)

### 2. Deploy the Static Frontend (GitHub Pages)

#### Step 1: Create a GitHub Repository
1.  Log in to GitHub, click the "+" in the upper right corner → "New repository".
2.  Enter a repository name: `mcp-javascript-deploy` (or a custom name).
3.  Check "Public" and "Add a README file", then click "Create repository".

#### Step 2: Upload the Frontend File
1.  Go to the repository, click "Add file" → "Upload files".
2.  Upload the `frontend/public_promo.html` file from this repository.

#### Step 3: Enable GitHub Pages
1.  In the repository page, click "Settings" → "Pages" on the left.
2.  In the "Source" section, select the "main" branch and "/ (root)", then click "Save".
3.  Wait for about 1 minute, then refresh the page. Your frontend page address will be displayed (e.g., `https://username.github.io/mcp-javascript-deploy/public_promo.html`).

### 3. Deploy the Backend Service (Render)

#### Step 1: Upload the Backend Code to GitHub
1.  In your GitHub repository, click "Add file" → "Create new file".
2.  Create the following files (copy the code from the repository):
    *   `backend/app.js`
    *   `backend/db.js`
    *   `backend/package.json`

#### Step 2: Deploy the Backend on Render
1.  Log in to Render, click "New" → "Web Service".
2.  Click "Connect to GitHub", authorize access to your repository, and select `mcp-javascript-deploy`.
3.  Configure the deployment information:
    *   Name: Custom (e.g., `mcp-js-server`)
    *   Root Directory: `backend` (specify the backend code directory)
    *   Build Command: `npm install` (install dependencies)
    *   Start Command: `node app.js` (start the service)
4.  Click "Create Web Service" and wait for the deployment to complete (about 1 minute).
5.  Once the deployment is successful, a backend domain will be generated (e.g., `https://mcp-js-server.onrender.com`).

### 4. Connect the Frontend and Backend
1.  Open the `frontend/public_promo.html` file in your GitHub repository and click "Edit".
2.  Find the line `const BACKEND_URL = "https://your-backend-service-domain.onrender.com"` and replace it with your Render backend domain.
3.  Click "Commit changes" to save.

### 5. Test the Access
1.  Frontend Page: Access the address generated by GitHub Pages. You should see a list of promotional offer cards.
2.  Backend API: Access `https://your-backend-domain.onrender.com/api/mcp/jutuike/public_promo_list`. You should see the promotional data in JSON format.

## Common Issues

*   **Frontend page fails to load**: Check if the `BACKEND_URL` is correct and if the Render backend has been deployed successfully.
*   **Backend API returns 404**: Check if the API path in the code is correct and if the "Root Directory" was set to `backend` during the Render deployment.
*   **Free tier Render service goes to sleep**: The service will be suspended after 30 minutes of inactivity. The next visit will require a few seconds to wake it up (this does not affect functionality).
