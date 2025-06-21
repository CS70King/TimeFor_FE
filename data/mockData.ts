export interface Item {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  distance: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'New' | 'Like New' | 'Used';
  availability: string;
  borrowingCost: string;
  costPeriod: string;
  durations: string[];
  pickupLocation?: string;
  deposit?: string;
  replacementValue: string;
  contactPreference: string;
  paymentMethod: string;
  owner: {
    name: string;
    rating: number;
    verified: boolean;
    avatar?: string;
  };
  rules?: string[];
}

export interface Request {
  id: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  borrowerName: string;
  lenderName: string;
  status: 'pending' | 'accepted' | 'returned' | 'completed' | 'cancelled' | 'overdue';
  requestedAt: string;
  returnBy?: string;
  type: 'borrow' | 'lend';
  currentUserId: string; // To determine if current user is borrower or lender
  borrowerId: string;
  lenderId: string;
  pickupLocation?: string;
  borrowingCost: string;
  costPeriod: string;
  deposit?: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'feedback' | 'tip' | 'system';
  timestamp: string;
  read: boolean;
}

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Standing Fan - Binatone',
    description: 'High-quality standing fan in excellent condition. Perfect for cooling rooms during hot weather. Has 3 speed settings and oscillation feature.',
    image: 'https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg',
    category: 'Electronics',
    location: 'Kumasi',
    distance: '4.2km',
    condition: 'Excellent',
    availability: 'Available Mon-Fri, 9AM-6PM',
    borrowingCost: '15',
    costPeriod: 'day',
    durations: ['1 day', '3 days', '1 week'],
    pickupLocation: 'Kumasi Central Market',
    deposit: '50',
    replacementValue: '200',
    contactPreference: 'WhatsApp',
    paymentMethod: 'Mobile Money',
    owner: {
      name: 'Kwame Asante',
      rating: 4.8,
      verified: true,
    },
    rules: ['Return clean', 'Handle with care', 'Maximum 3 days'],
  },
  {
    id: '2',
    name: 'Camping Tent - 4 Person',
    description: 'Spacious 4-person camping tent, waterproof and easy to set up. Great for weekend getaways and outdoor adventures.',
    image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
    category: 'Outdoor',
    location: 'Accra',
    distance: '2.1km',
    condition: 'Good',
    availability: 'Weekends only',
    borrowingCost: '25',
    costPeriod: 'day',
    durations: ['1 day', '3 days', '1 week'],
    pickupLocation: 'Accra Mall',
    deposit: '100',
    replacementValue: '350',
    contactPreference: 'Both',
    paymentMethod: 'Cash in Person',
    owner: {
      name: 'Ama Serwah',
      rating: 4.9,
      verified: true,
    },
    rules: ['Check weather forecast', 'Return clean and dry', 'Maximum 1 week'],
  },
  {
    id: '3',
    name: 'Projector - Epson HD',
    description: 'HD projector perfect for presentations, movie nights, or events. Comes with HDMI and VGA cables.',
    image: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg',
    category: 'Electronics',
    location: 'Tamale',
    distance: '1.8km',
    condition: 'Excellent',
    availability: 'Available daily, advance booking required',
    borrowingCost: '40',
    costPeriod: 'day',
    durations: ['3 hours', '1 day', '3 days'],
    pickupLocation: 'Tamale Teaching Hospital',
    deposit: '150',
    replacementValue: '800',
    contactPreference: 'Call Only',
    paymentMethod: 'Bank Transfer',
    owner: {
      name: 'Abdul Rahman',
      rating: 4.7,
      verified: true,
    },
    rules: ['Handle carefully', 'Return with all cables', 'Clean after use'],
  },
  {
    id: '4',
    name: 'Power Drill Set',
    description: 'Complete power drill set with various bits and attachments. Perfect for home improvement projects.',
    image: 'https://images.pexels.com/photos/1250835/pexels-photo-1250835.jpeg',
    category: 'Tools',
    location: 'Cape Coast',
    distance: '3.5km',
    condition: 'Good',
    availability: 'Mon-Sat, 8AM-5PM',
    borrowingCost: '20',
    costPeriod: 'day',
    durations: ['3 hours', '1 day', '3 days'],
    pickupLocation: 'Cape Coast Castle',
    deposit: '80',
    replacementValue: '300',
    contactPreference: 'WhatsApp',
    paymentMethod: 'Mobile Money',
    owner: {
      name: 'Kofi Mensah',
      rating: 4.6,
      verified: false,
    },
    rules: ['Return all bits', 'Clean after use', 'Maximum 2 days'],
  },
  {
    id: '5',
    name: 'Folding Chairs (Set of 6)',
    description: 'Set of 6 comfortable folding chairs, perfect for events, parties, or extra seating.',
    image: 'https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg',
    category: 'Furniture',
    location: 'Tema',
    distance: '5.7km',
    condition: 'Good',
    availability: 'Available for events',
    borrowingCost: '30',
    costPeriod: 'day',
    durations: ['1 day', '3 days', '1 week'],
    pickupLocation: 'Tema Community 1',
    deposit: '60',
    replacementValue: '180',
    contactPreference: 'Both',
    paymentMethod: 'Cash in Person',
    owner: {
      name: 'Efua Adomah',
      rating: 4.5,
      verified: true,
    },
    rules: ['Return clean', 'Stack properly', 'Report any damage'],
  },
  {
    id: '6',
    name: 'Sound System - JBL',
    description: 'Portable bluetooth sound system with great bass. Perfect for parties and outdoor events.',
    image: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg',
    category: 'Electronics',
    location: 'Kumasi',
    distance: '2.9km',
    condition: 'Excellent',
    availability: 'Weekends preferred',
    borrowingCost: '35',
    costPeriod: 'day',
    durations: ['3 hours', '1 day', '3 days'],
    pickupLocation: 'Kumasi Tech Junction',
    deposit: '120',
    replacementValue: '450',
    contactPreference: 'WhatsApp',
    paymentMethod: 'Mobile Money',
    owner: {
      name: 'Yaw Boateng',
      rating: 4.8,
      verified: true,
    },
    rules: ['Keep volume reasonable', 'Return charged', 'Handle with care'],
  },
  {
    id: '7',
    name: 'Soccer Ball & Cones Set',
    description: 'Professional soccer ball with training cones. Perfect for practice sessions and casual games.',
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg',
    category: 'Sports',
    location: 'Accra',
    distance: '1.2km',
    condition: 'Good',
    availability: 'Afternoons and weekends',
    borrowingCost: '10',
    costPeriod: 'day',
    durations: ['3 hours', '1 day', '3 days'],
    pickupLocation: 'Accra Sports Stadium',
    deposit: '25',
    replacementValue: '80',
    contactPreference: 'WhatsApp',
    paymentMethod: 'Mobile Money',
    owner: {
      name: 'Samuel Osei',
      rating: 4.7,
      verified: true,
    },
    rules: ['Return after use', 'Keep inflated', 'Maximum 1 week'],
  },
  {
    id: '8',
    name: 'Coffee Maker - Deluxe',
    description: 'Automatic coffee maker with programmable timer. Makes perfect coffee every morning.',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg',
    category: 'Kitchen',
    location: 'Kumasi',
    distance: '3.1km',
    condition: 'Excellent',
    availability: 'Available daily',
    borrowingCost: '18',
    costPeriod: 'day',
    durations: ['1 day', '3 days', '1 week'],
    pickupLocation: 'Kumasi City Mall',
    deposit: '40',
    replacementValue: '150',
    contactPreference: 'Both',
    paymentMethod: 'Cash in Person',
    owner: {
      name: 'Grace Mensah',
      rating: 4.9,
      verified: true,
    },
    rules: ['Clean after use', 'Return with filters', 'Handle with care'],
  },
  {
    id: '9',
    name: 'Travel Backpack - 40L',
    description: 'Large capacity travel backpack with multiple compartments. Perfect for hiking and travel.',
    image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg',
    category: 'Outdoor',
    location: 'Accra',
    distance: '2.8km',
    condition: 'Good',
    availability: 'Available for trips',
    borrowingCost: '12',
    costPeriod: 'day',
    durations: ['1 day', '3 days', '1 week', '2 weeks'],
    pickupLocation: 'Accra Central Station',
    deposit: '30',
    replacementValue: '120',
    contactPreference: 'WhatsApp',
    paymentMethod: 'Mobile Money',
    owner: {
      name: 'David Asante',
      rating: 4.6,
      verified: true,
    },
    rules: ['Return clean', 'Check all zippers', 'Maximum 2 weeks'],
  },
  {
    id: '10',
    name: 'Gaming Console - PS5',
    description: 'PlayStation 5 console with two controllers and popular games. Perfect for entertainment.',
    image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg',
    category: 'Electronics',
    location: 'Tema',
    distance: '4.5km',
    condition: 'Excellent',
    availability: 'Evenings and weekends',
    borrowingCost: '50',
    costPeriod: 'day',
    durations: ['1 day', '3 days'],
    pickupLocation: 'Tema Harbour',
    deposit: '200',
    replacementValue: '1200',
    contactPreference: 'Call Only',
    paymentMethod: 'Bank Transfer',
    owner: {
      name: 'Michael Adjei',
      rating: 4.8,
      verified: true,
    },
    rules: ['Handle with care', 'Return all accessories', 'Maximum 3 days'],
  },
];

// Current user ID for demo purposes
export const CURRENT_USER_ID = 'user123';

export const mockRequests: Request[] = [
  {
    id: '1',
    itemId: '1',
    itemName: 'Standing Fan - Binatone',
    itemImage: 'https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg',
    borrowerName: 'John Mensah',
    lenderName: 'Kwame Asante',
    status: 'accepted',
    requestedAt: '2024-01-15T10:30:00Z',
    returnBy: '2024-01-18T18:00:00Z',
    type: 'borrow',
    currentUserId: CURRENT_USER_ID,
    borrowerId: CURRENT_USER_ID,
    lenderId: 'lender1',
    pickupLocation: 'Kumasi Central Market',
    borrowingCost: '15',
    costPeriod: 'day',
    deposit: '50',
  },
  {
    id: '2',
    itemId: '2',
    itemName: 'Camping Tent - 4 Person',
    itemImage: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
    borrowerName: 'Sarah Osei',
    lenderName: 'John Mensah',
    status: 'pending',
    requestedAt: '2024-01-16T14:20:00Z',
    type: 'lend',
    currentUserId: CURRENT_USER_ID,
    borrowerId: 'borrower2',
    lenderId: CURRENT_USER_ID,
    pickupLocation: 'Accra Mall',
    borrowingCost: '25',
    costPeriod: 'day',
    deposit: '100',
  },
  {
    id: '3',
    itemId: '3',
    itemName: 'Projector - Epson HD',
    itemImage: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg',
    borrowerName: 'John Mensah',
    lenderName: 'Abdul Rahman',
    status: 'completed',
    requestedAt: '2024-01-10T08:15:00Z',
    returnBy: '2024-01-13T17:00:00Z',
    type: 'borrow',
    currentUserId: CURRENT_USER_ID,
    borrowerId: CURRENT_USER_ID,
    lenderId: 'lender3',
    pickupLocation: 'Tamale Teaching Hospital',
    borrowingCost: '40',
    costPeriod: 'day',
    deposit: '150',
  },
  {
    id: '4',
    itemId: '4',
    itemName: 'Power Drill Set',
    itemImage: 'https://images.pexels.com/photos/1250835/pexels-photo-1250835.jpeg',
    borrowerName: 'Grace Ampong',
    lenderName: 'John Mensah',
    status: 'accepted',
    requestedAt: '2024-01-12T16:45:00Z',
    returnBy: '2024-01-15T12:00:00Z', // This is overdue
    type: 'lend',
    currentUserId: CURRENT_USER_ID,
    borrowerId: 'borrower4',
    lenderId: CURRENT_USER_ID,
    pickupLocation: 'Cape Coast Castle',
    borrowingCost: '20',
    costPeriod: 'day',
    deposit: '80',
  },
  {
    id: '5',
    itemId: '5',
    itemName: 'Folding Chairs (Set of 6)',
    itemImage: 'https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg',
    borrowerName: 'John Mensah',
    lenderName: 'Efua Adomah',
    status: 'returned',
    requestedAt: '2024-01-14T09:30:00Z',
    returnBy: '2024-01-17T15:00:00Z',
    type: 'borrow',
    currentUserId: CURRENT_USER_ID,
    borrowerId: CURRENT_USER_ID,
    lenderId: 'lender5',
    pickupLocation: 'Tema Community 1',
    borrowingCost: '30',
    costPeriod: 'day',
    deposit: '60',
  },
  {
    id: '6',
    itemId: '6',
    itemName: 'Sound System - JBL',
    itemImage: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg',
    borrowerName: 'Michael Kwame',
    lenderName: 'John Mensah',
    status: 'returned',
    requestedAt: '2024-01-13T11:20:00Z',
    returnBy: '2024-01-16T20:00:00Z',
    type: 'lend',
    currentUserId: CURRENT_USER_ID,
    borrowerId: 'borrower6',
    lenderId: CURRENT_USER_ID,
    pickupLocation: 'Kumasi Tech Junction',
    borrowingCost: '35',
    costPeriod: 'day',
    deposit: '120',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Return Reminder',
    message: 'Standing Fan - Binatone is due for return tomorrow at 6:00 PM. Please coordinate with the owner.',
    type: 'reminder',
    timestamp: '2024-01-17T09:00:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Rate Your Experience',
    message: 'How was your experience borrowing the Projector - Epson HD? Your feedback helps the community grow.',
    type: 'feedback',
    timestamp: '2024-01-14T12:30:00Z',
    read: true,
  },
  {
    id: '3',
    title: 'TimeFor Tip',
    message: 'Pro tip: Items with high ratings and verified owners are more likely to be well-maintained!',
    type: 'tip',
    timestamp: '2024-01-16T08:00:00Z',
    read: false,
  },
  {
    id: '4',
    title: 'New Feature Alert',
    message: 'You can now set custom availability hours for your listed items. Check your profile settings!',
    type: 'system',
    timestamp: '2024-01-15T10:00:00Z',
    read: true,
  },
  {
    id: '5',
    title: 'Item Overdue',
    message: 'Power Drill Set was due yesterday. Please contact Grace Ampong to arrange return.',
    type: 'reminder',
    timestamp: '2024-01-16T18:00:00Z',
    read: false,
  },
];