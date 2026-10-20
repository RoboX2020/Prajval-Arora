import React from 'react';
import { BookOpen, Zap, Settings, ArrowRight, Star } from 'lucide-react';

interface DashboardProps {
  onSelectChapter: (chapterId: string) => void;
}

export function Dashboard({ onSelectChapter }: DashboardProps) {
  const chapters = [
    {
      id: 'chapter-1',
      title: 'Chapter 1: The Spark of Life',
      description: 'Your very first circuit! Learn about basic components, electricity, and how to blink an LED.',
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      color: 'bg-yellow-100',
      status: 'Start Now',
    },
    {
      id: 'chapter-2',
      title: 'Chapter 2: Sense the World',
      description: 'Build an automatic gate! Use an IR sensor and a servo motor to sense objects and react.',
      icon: <Settings className="w-12 h-12 text-blue-500" />,
      color: 'bg-blue-100',
      status: 'Start Now',
    },
    {
      id: 'chapter-3',
      title: 'Chapter 3: Move It!',
      description: 'Motors and movement. It is time to get those wheels spinning.',
      icon: <Star className="w-12 h-12 text-pink-500" />,
      color: 'bg-pink-100',
      status: 'Start Now',
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12">
      <header className="mb-12 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-black rounded-lg bg-[#FFD700] flex items-center justify-center font-black text-3xl rotate-3">R</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase">
            Robotics Playbook
          </h1>
        </div>
        <p className="text-sm font-black bg-black text-white inline-block px-4 py-2 rounded-full uppercase tracking-widest">
          Your journey from zero to robot hero! 🤖
        </p>
        <a href="/" className="text-xs font-black uppercase tracking-widest underline">
          prajvalarora.com
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chapters.map((chapter) => {
          const isUnlocked = true;
          return (
          <div 
            key={chapter.id}
            className={`doodle-card p-6 flex flex-col h-full ${isUnlocked ? 'cursor-pointer' : 'opacity-75 grayscale'}`}
            onClick={() => isUnlocked && onSelectChapter(chapter.id)}
          >
            <div className={`w-20 h-20 ${chapter.color} rounded-xl border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mx-auto bg-white`}>
              {chapter.icon}
            </div>
            
            <h2 className="text-xl font-black mb-3 text-center uppercase">{chapter.title}</h2>
            <p className="text-gray-700 font-medium mb-6 flex-grow text-center">
              {chapter.description}
            </p>
            
            {isUnlocked ? (
              <button className="doodle-button w-full flex items-center justify-center gap-2 group">
                {chapter.status}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="bg-gray-200 border-4 border-black rounded-xl py-3 text-center font-bold text-gray-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {chapter.status}
              </div>
            )}
          </div>
          );
        })}
      </div>
      
      <div className="mt-16 doodle-card p-8 bg-[#6BCB77] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-8 text-black rounded-2xl">
         <div className="flex-shrink-0 bg-white p-4 border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen className="w-12 h-12 text-black" />
         </div>
         <div>
            <h3 className="text-2xl font-black mb-2 uppercase">Welcome to the Lab!</h3>
            <p className="text-sm font-bold">Grab your breadboard, some jumper wires, and let's get building. This playbook is designed to be messy, fun, and totally hands-on. Don't worry if things don't work on the first try—that's how we learn!</p>
         </div>
      </div>
    </div>
  );
}
