'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Falilou Khouma',
    // role: 'Lead Developer',
    location: 'Montreal, Quebec, Canada',
    // email: 'sarah@company.com',
    // experience: '6+ years',
    avatar: '',
    skills: ['Full Stack Developer', 'TypeScript', 'React', 'Node.js'],
    role: 'Full Stack Developer',
  },
  {
    id: 2,
    name: 'Jesus Mendoza',
    role: 'Full Stack Developer',
    location: 'Fort Worth, TX',
    // email: 'jesus.doza@gmail.com',
    avatar:
      'https://media.licdn.com/dms/image/v2/C5603AQG-Q4XodRXnRA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1652397815554?e=1758153600&v=beta&t=Q70eliRVgiK2gS5ZndBPu1QBGeOFJ1HWObdW_yIH8iA',
    skills: ['TypeScript', 'React', 'Node.js', 'Cypress', 'Node'],
    // experience: '6+ years',
    experience: '7+ years',
    education: 'BFA Design, Art Center',
    achievements: ['Design Excellence Award', 'UX Innovation Prize'],
  },
  {
    id: 3,
    name: 'Josh Beck',
    role: 'Team Lead',
    // location: 'New York, NY',
    // email: 'emily@company.com',
    avatar: '/professional-woman-product-manager.png',
    skills: ['Product Strategy', 'Analytics', 'Agile', 'Stakeholder Management'],
    // experience: '6+ years',
  },
  {
    id: 4,
    name: 'Justin Cloud',
    role: 'DevOps Engineer',
    location: 'Seattle, WA',
    email: 'david@company.com',
    avatar: '/professional-devops-engineer.png',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
    experience: '4+ years',
  },
  {
    id: 5,
    name: 'Yassah Reed',
    role: 'Full Stack Developer',
    location: 'Boston, MA',
    // email: 'lisa@company.com',
    avatar: '/professional-woman-data-scientist.png',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    experience: '5+ years',
  },
  {
    id: 6,
    name: 'Max Campos',
    role: 'Backend Engineer',
    location: 'Denver, CO',
    // email: 'alex@company.com',
    avatar: '/professional-backend-engineer.png',
    skills: ['Go', 'PostgreSQL', 'Microservices', 'API Design'],
    experience: '3+ years',
  },
  {
    id: 7,
    name: 'Andrew Smith',
    role: 'Backend Developer',
    location: 'New York, NY',
    email: 'emily@company.com',
    avatar: '/professional-woman-product-manager.png',
    skills: ['Product Strategy', 'Analytics', 'Agile', 'Stakeholder Management'],
    experience: '6+ years',
  },
  {
    id: 8,
    name: 'Ndubuisi Onyem',
    role: 'Team Lead',
    location: 'New York, NY',
    email: 'emily@company.com',
    avatar: '/professional-woman-product-manager.png',
    skills: ['Product Strategy', 'Analytics', 'Agile', 'Stakeholder Management'],
    experience: '6+ years',
  },
];

export default function TeamCarousel() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const radius = 400;
  const centerX = 320;
  const centerY = 320;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
      <div className='container mx-auto px-4 py-16'>
        {/* Header */}
        <div className='mb-16 relative h-32'>
          <div className='absolute -left-72'>
            <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
              Meet Our Team
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl'>
              Talented individuals working together to create amazing experiences
            </p>
          </div>
        </div>

        {/* Animated Carousel */}
        <div className='relative mx-auto' style={{ width: '640px', height: '640px' }}>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold text-muted-foreground mb-2'>
                Our Amazing Team
              </h2>
              <p className='text-sm text-muted-foreground'>
                {teamMembers.length} talented professionals
              </p>
            </div>
          </div>

          {teamMembers.map((member, index) => {
            const angle = (rotation + (index * 360) / teamMembers.length) * (Math.PI / 180);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            return (
              <Card
                key={member.id}
                className='absolute w-60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm'
                style={{
                  left: `${x - 120}px`,
                  top: `${y - 180}px`,
                }}
              >
                <CardContent className='p-4'>
                  <div className='flex flex-col items-center text-center space-y-3'>
                    <Avatar className='w-16 h-16 ring-4 ring-blue-100 dark:ring-blue-900'>
                      <AvatarImage src={member.avatar || '/placeholder.svg'} alt={member.name} />
                      <AvatarFallback className='text-base font-semibold'>
                        {member.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className='font-bold text-base'>{member.name}</h3>
                      <p className='text-blue-600 dark:text-blue-400 font-medium text-sm'>
                        {member.role}
                      </p>
                    </div>

                    <div className='space-y-1 text-xs text-muted-foreground w-full'>
                      <div className='flex items-center justify-center gap-1'>
                        <MapPin className='w-3 h-3' />
                        <span>{member.location}</span>
                      </div>
                      {/* <div className='flex items-center justify-center gap-1'>
                        <Calendar className='w-3 h-3' />
                        <span>Joined {member.joinDate}</span>
                      </div>
                      <div className='flex items-center justify-center gap-1'>
                        <Award className='w-3 h-3' />
                        <span>{member.experience} experience</span>
                      </div> */}
                    </div>

                    {/* <div className='w-full'>
                      <p className='text-xs font-medium text-muted-foreground mb-1'>Education</p>
                      <p className='text-xs'>{member.education}</p>
                    </div> */}

                    <div className='w-full'>
                      <p className='text-xs font-medium text-muted-foreground mb-1'>Skills</p>
                      <div className='flex flex-wrap gap-1 justify-center'>
                        {member.skills.slice(0, 3).map(skill => (
                          <Badge key={skill} variant='secondary' className='text-xs'>
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant='outline' className='text-xs'>
                            +{member.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* <div className='w-full'>
                      <p className='text-xs font-medium text-muted-foreground mb-1'>
                        Recent Achievement
                      </p>
                      <p className='text-xs text-center'>{member.achievements[0]}</p>
                    </div> */}

                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                      <Mail className='w-3 h-3' />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Team Stats */}
        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
              {teamMembers.length}
            </div>
            <div className='text-muted-foreground'>Team Members</div>
          </div>
          {/* <div className='text-center'>
            <div className='text-3xl font-bold text-purple-600 dark:text-purple-400'>30+</div>
            <div className='text-muted-foreground'>Years Combined Experience</div>
          </div> */}
          {/* <div className='text-center'>
            <div className='text-3xl font-bold text-green-600 dark:text-green-400'>12</div>
            <div className='text-muted-foreground'>Awards & Achievements</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
