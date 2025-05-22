import { PortfolioObjectProps } from '../types';

export const portfolioObjects: PortfolioObjectProps[] = [
  {
    position: [-5, 0, -5],
    rotation: [0, Math.PI / 4, 0],
    scale: [1, 1, 1],
    type: 'education',
    title: 'Education',
    description: 'My educational journey in technology and programming',
    details: [
      'İzmir University of Economics',
      'Associate Degree - Computer Programming',
      '2023 - 2025',
      'Focus on Software Development and Database Management',
      'Active participant in coding workshops and hackathons'
    ],
    color: '#4f46e5'
  },
  {
    position: [5, 0, -5],
    rotation: [0, -Math.PI / 4, 0],
    scale: [1, 1, 1],
    type: 'experience',
    title: 'Experience',
    description: 'Professional journey in software development',
    details: [
      'Dokuz Eylul University Hospital (1 month)',
      'IT Department - Database Management Specialist',
      'Implemented and maintained hospital database systems',
      'Collaborated with healthcare professionals for system optimization',
      'Developed custom solutions for data management needs'
    ],
    color: '#0ea5e9'
  },
  {
    position: [0, 0, -8],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    type: 'projects',
    title: 'Projects',
    description: 'Showcase of my technical projects and contributions',
    details: [
      'Minesweeper (Kotlin, Android Studio)',
      '• Classic game reimagined with modern UI/UX',
      '• Implemented advanced game mechanics and scoring system',
      'Music School Website (PHP, MySQL, HTML/CSS)',
      '• Full-stack development with responsive design',
      '• Integrated payment system and student management',
      'Breaking Point (Unreal Engine, C++, Game Design)',
      '• Developed core gameplay mechanics',
      '• Implemented multiplayer functionality'
    ],
    color: '#10b981'
  },
  {
    position: [-7, 0, 2],
    rotation: [0, Math.PI / 2, 0],
    scale: [1, 1, 1],
    type: 'skills',
    title: 'Skills',
    description: 'Technical expertise and professional competencies',
    details: [
      'Backend Development',
      '• MSSQL, Java, Python, C#, PHP',
      '• RESTful API Design & Implementation',
      '• Database Architecture & Optimization',
      'Frontend Development',
      '• HTML5, CSS3, JavaScript',
      '• Modern UI/UX Principles',
      '• Responsive Web Design',
      'Additional Skills',
      '• Version Control (Git)',
      '• Agile Development',
      '• Problem Solving & Debugging'
    ],
    color: '#f59e0b'
  },
  {
    position: [7, 0, 2],
    rotation: [0, -Math.PI / 2, 0],
    scale: [1, 1, 1],
    type: 'about',
    title: 'About Me',
    description: 'Passionate software developer focused on creating impactful solutions',
    details: [
      'Backend Developer with a strong foundation in database management',
      'Problem solver with analytical thinking and attention to detail',
      'Quick learner with a passion for new technologies',
      'Active contributor to open-source projects',
      'Team player with excellent communication skills',
      'Always eager to take on new challenges and learn from them'
    ],
    color: '#ec4899'
  },
  {
    position: [0, 0, 8],
    rotation: [0, Math.PI, 0],
    scale: [1, 1, 1],
    type: 'contact',
    title: 'Contact',
    description: 'Let\'s connect and discuss potential opportunities',
    details: [
      'Email: salihbatuhansener@hotmail.com',
      'GitHub: github.com/Eulenfields',
      'LinkedIn: linkedin.com/in/salih-batuhan-%C5%9Fener-4347a8221',
      'Location: İzmir, Turkey',
      'Available for freelance projects and full-time positions',
      'Open to collaboration and networking opportunities'
    ],
    color: '#8b5cf6'
  }
];