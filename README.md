# SecureSight - CCTV Monitoring Dashboard 🔒

A comprehensive, pixel-perfect CCTV monitoring and incident management system built with Next.js 15, React 18, and TypeScript. This project demonstrates advanced full-stack development skills with real-time incident detection, management capabilities, and modern UI/UX implementation.

**Live Website ->(https://cctvdash.netlify.app/)**

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development Notes](#development-notes)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🎯 Core Functionality
- **Real-time Incident Monitoring** with interactive dashboard interface
- **Camera Management System** with live feed simulation and controls
- **Incident Detection & Resolution** with optimistic UI updates
- **User Authentication Interface** with role-based access control
- **Professional CCTV Interface** matching industry security standards

### 📊 Dashboard Components
- **Incident Player** - Large video display with camera switching and overlay information
- **Incident List** - Real-time incident feed with resolve functionality
- **Navigation System** - Centered navigation with professional icons
- **User Profile Management** - Complete user authentication interface

### 🔧 Technical Features
- **Pixel-Perfect Figma Implementation** - Exact design specification matching
- **Interactive Data Visualization** using Recharts library
- **Database Management** with Prisma ORM and SQLite/PostgreSQL
- **RESTful API Design** with proper error handling
- **Responsive Design** with Tailwind CSS
- **TypeScript Type Safety** throughout the application

---

## 🛠 Tech Stack

| Layer            | Technology                     | Purpose                           |
|------------------|--------------------------------|-----------------------------------|
| **Framework**    | Next.js 15 (App Router)       | React meta-framework with SSR    |
| **Frontend**     | React 18 + TypeScript         | Component-based UI development    |
| **Styling**      | Tailwind CSS 3                | Utility-first CSS framework      |
| **Database**     | Prisma + SQLite/PostgreSQL    | Type-safe database management    |
| **Charts**       | Recharts 2                     | Data visualization library       |
| **Deployment**   | Netlify                        | Serverless deployment platform   |
| **Development**  | AI-Enhanced Workflow           | Modern development practices      |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
git clone https://github.com/techops-chirag/Secure-Sight-Dashboard.git
cd Secure-Sight-Dashboard/securesight-dashboard

2. **Install dependencies**
npm install
npm install recharts

3. **Setup database**
npx prisma db push
npx prisma db seed

4. **Run development server**
npm run dev

5. **Open application**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

securesight-dashboard/
├── app/
│ ├── api/
│ │ └── incidents/ # API routes for incident management
│ │ ├── route.ts # GET /api/incidents
│ │ └── [id]/resolve/ # PATCH /api/incidents/:id/resolve
│ ├── globals.css # Global styles and Tailwind imports
│ ├── layout.tsx # Root layout component
│ └── page.tsx # Main dashboard page
├── components/
│ ├── IncidentList.tsx # Incident management interface
│ ├── IncidentPlayer.tsx # Main video player with controls
│ └── Navbar.tsx # Navigation with user profile
├── lib/
│ └── prisma.ts # Database client configuration
├── prisma/
│ ├── schema.prisma # Database schema definition
│ └── seed.ts # Database seed script
├── public/
│ └── thumbnails/ # Incident thumbnail images
├── .env # Environment variables
├── next.config.js # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── netlify.toml # Netlify deployment configuration


## 📝 Development Notes

### AI-Assisted Development Process
This project was developed using modern AI-enhanced workflows while maintaining full technical ownership and understanding.

**Areas where AI assistance was utilized:**
- TypeScript error resolution and type safety optimization
- Next.js 15 configuration and deployment troubleshooting
- Code review and best practices validation
- Documentation enhancement and technical writing

**Core development completed independently:**
- System architecture and component design
- Database schema design with Prisma
- API route structure and business logic
- User interface design and interaction patterns
- Technical decision-making and problem-solving approach

**Key Technical Challenges Resolved:**
- Next.js 15 App Router configuration compatibility
- TypeScript strict mode error handling patterns
- Serverless deployment with Prisma client
- Production image optimization
- API route error handling with unknown types

---

## 🎯 Features Demonstrated

### Technical Skills
- **Modern React Patterns**: Hooks, component composition, state management
- **TypeScript Proficiency**: Strict typing, error handling, interface design
- **API Development**: RESTful endpoints, error handling, database integration
- **UI/UX Implementation**: Pixel-perfect Figma conversion, responsive design
- **Database Design**: Relational modeling, schema design, seed data

### Development Practices
- **Version Control**: Git workflow with meaningful commits
- **Code Quality**: ESLint, TypeScript strict mode, error boundaries
- **Documentation**: Comprehensive README, API documentation
- **Deployment**: Production-ready configuration and optimization
- **Modern Tooling**: AI-enhanced development workflow

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
git checkout -b feature/amazing-feature

3. **Commit your changes**
git commit -m 'Add amazing feature'

4. **Push to the branch**
git push origin feature/amazing-feature

5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain pixel-perfect design accuracy
- Add proper error handling
- Update documentation for new features
- Test on multiple screen sizes

---

## 👨‍💻 Developer

**Chirag Saini**  
**Email:** chirag111saini@gmail.com  
**GitHub:** [@techops-chirag](https://github.com/techops-chirag)  
**Repository:** [Secure-Sight-Dashboard](https://github.com/techops-chirag/Secure-Sight-Dashboard)
