# Smart Krishi Portal

A comprehensive digital farming assistant platform for Indian farmers built with Next.js, Tailwind CSS, and ShadCN UI components.

## Features

- **Multilingual Support**: Access in 10+ Indian languages
- **Secure Authentication**: Mobile OTP verification using Firebase
- **Marketplace**: Purchase seeds, fertilizers, pesticides, and other agricultural products
- **Equipment Marketplace**: View and contact sellers for farming equipment
- **Expert Connect**: Direct messaging with agricultural experts
- **Real-time Data**: Weather updates, crop prices, agricultural news, and government schemes
- **Community Forums**: Connect with other farmers
- **AI Tools**: Crop disease detection, voice assistant, yield prediction, and more
- **Responsive Design**: Mobile-first approach with modern UI

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth.js with Firebase OTP
- **State Management**: React Context API
- **APIs**: OpenWeatherMap, OpenAI, Google Translate
- **Real-time Communication**: Socket.io
- **AI/ML**: TensorFlow.js

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Firebase project with Authentication enabled
- API keys for OpenWeatherMap, OpenAI, etc.

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/smart-krishi-portal.git
cd smart-krishi-portal
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Copy the `.env.local.example` file to `.env.local` and fill in your API keys and credentials.

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The application can be easily deployed on Vercel:

```bash
npm run build
```

Then deploy using the Vercel CLI or connect your GitHub repository to Vercel for automatic deployments.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [MongoDB](https://www.mongodb.com/)
- [Firebase](https://firebase.google.com/)
- [OpenWeatherMap](https://openweathermap.org/)
- [OpenAI](https://openai.com/)
