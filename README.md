# carspecthai.com
Source code and data of [carspecthai.com](https://carspecthai.com). Webpage is created using Next.JS with static-site generator.

The data of vehicle specifications are stored in yml format, [see data](#data). are in open to the public via github public repository. We

## Data
Data of all vehicles are stored under the folder `/data`. This folder includes the following information:
- Car specification file should be written in yml format. The yml should follow this format **{MANUFACTURE}-{MODEL_LONG_NAME}-{MODEL_RELEASE_YEAR}.yml**. It should contain no white spaces. 

  For example, Toyota Tacoma 2050 specification file should be stored here `/data/cars/toyota-tacoma-2025.yml`. 

- A photo file of each vehicle should be named with the same as car specification file. Format should be png.
  
  For example, Toyota Tacoma 2050 photo file should be stored here `/data/cars/photos/toyota-tacoma-2025.png`. 

- A brochure file of each vehicle should be named with the same as car specification file. Format should be pdf.
  
  For example, Toyota Tacoma 2050 photo file should be stored here `/data/cars/brochures/toyota-tacoma-2025.pdf`. 

## To run locally
```
npm i
npm run dev
```

## Deploy to cloudflare
This repository contains github action that automatically deploy `main` branch to Cloudflare's page. 

To manually deploy from local machine (for testing / debugging purpose), use the following commands:
```
npx wrangler pages project list
npx wrangler pages deploy --project-name carspecthai out
```