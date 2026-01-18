export interface Event {
    id: string;
    title: string;
    category: 'WORKSHOP' | 'SPORTS' | 'CULTURE' | 'LEADERSHIP' | 'TECH' | 'SOCIAL';
    date: string;
    time: string;
    location: string;
    locationDetails: string;
    imageUrl: string;
    points: number;
    matchPercentage: number;
    urgencySignal?: string;
    description: string;
    regretScore: number;
    slotsTotal: number;
    slotsFilled: number;
    teamNeeded?: boolean;
    teamSize?: number;
    whyFitsYou: string[];
    regretInsight: string;
    skillsGained: string[];
    hostName: string;
    hostAvatar: string;
    coords: { x: number; y: number };
}

export const MOCK_EVENTS: Event[] = [
    {
        id: 'evt-001',
        title: 'AI & Machine Learning 101',
        category: 'WORKSHOP',
        date: 'Friday, Oct 25',
        time: '10:00 AM - 12:00 PM',
        location: 'Innovation Hub, Hall B',
        locationDetails: 'Building 7, 2nd Floor',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        points: 50,
        matchPercentage: 92,
        urgencySignal: 'Filling fast',
        description: 'Dive into the fundamentals of AI and machine learning with hands-on projects. Perfect for beginners!',
        regretScore: 85,
        slotsTotal: 30,
        slotsFilled: 27,
        teamNeeded: true,
        teamSize: 2,
        whyFitsYou: [
            'Matches your "Tech" interest',
            'Trending among your network',
            'Beginner-friendly approach',
        ],
        regretInsight: 'Students who skipped this last year reported missing key networking opportunities with industry leaders.',
        skillsGained: ['Neural Networks', 'Python ML', 'Data Analysis'],
        hostName: 'Dr. Sarah Chen',
        hostAvatar: 'https://i.pravatar.cc/150?u=sarah',
        coords: { x: 120, y: 200 },
    },
    {
        id: 'evt-002',
        title: 'Campus Football Tournament',
        category: 'SPORTS',
        date: 'Saturday, Oct 26',
        time: '3:00 PM - 6:00 PM',
        location: 'Main Stadium',
        locationDetails: 'Athletics Complex',
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
        points: 100,
        matchPercentage: 85,
        urgencySignal: 'Team spots available',
        description: 'Inter-department football championship. Bring your A-game and represent your team!',
        regretScore: 72,
        slotsTotal: 120,
        slotsFilled: 98,
        teamNeeded: true,
        teamSize: 11,
        whyFitsYou: [
            'Matches your "Sports" interest',
            'High Aura Points reward',
            'Team-building opportunity',
        ],
        regretInsight: 'Last tournament winners gained 200+ Aura Points and exclusive campus perks.',
        skillsGained: ['Teamwork', 'Endurance', 'Strategic Play'],
        hostName: 'Athletics Department',
        hostAvatar: 'https://i.pravatar.cc/150?u=athletics',
        coords: { x: 280, y: 450 },
    },
    {
        id: 'evt-003',
        title: 'Cultural Night: Diwali Celebration',
        category: 'CULTURE',
        date: 'Sunday, Oct 27',
        time: '6:00 PM - 9:00 PM',
        location: 'Auditorium',
        locationDetails: 'Main Campus Building',
        imageUrl: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8',
        points: 75,
        matchPercentage: 88,
        urgencySignal: 'Seats filling',
        description: 'Celebrate the festival of lights with traditional performances, food, and fireworks!',
        regretScore: 90,
        slotsTotal: 200,
        slotsFilled: 145,
        whyFitsYou: [
            'Diverse category for balance',
            'Popular campus tradition',
            'Great for networking',
        ],
        regretInsight: 'This is one of the most attended events of the year. Missing it means missing campus culture.',
        skillsGained: ['cultural Awareness', 'Networking', 'Social Ettiquete'],
        hostName: 'Cultural Committee',
        hostAvatar: 'https://i.pravatar.cc/150?u=culture',
        coords: { x: 150, y: 700 },
    },
    {
        id: 'evt-004',
        title: 'Leadership Summit 2024',
        category: 'LEADERSHIP',
        date: 'Monday, Oct 28',
        time: '9:00 AM - 5:00 PM',
        location: 'Conference Hall A',
        locationDetails: 'Business School Building',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        points: 120,
        matchPercentage: 78,
        urgencySignal: 'Limited seats',
        description: 'Full-day summit featuring industry leaders, panel discussions, and networking sessions.',
        regretScore: 95,
        slotsTotal: 50,
        slotsFilled: 48,
        teamNeeded: true,
        teamSize: 1,
        whyFitsYou: [
            'Career advancement opportunity',
            'Industry leader speakers',
            'Certificate of participation',
        ],
        regretInsight: 'Alumni credit this event as pivotal for their career trajectories and professional networks.',
        skillsGained: ['Public Speaking', 'Executive Decision Making', 'Negotiation'],
        hostName: 'Business School',
        hostAvatar: 'https://i.pravatar.cc/150?u=business',
        coords: { x: 300, y: 150 },
    },
];

export const MY_EVENTS: string[] = ['evt-001']; // User is already committed to this event
