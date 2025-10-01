// Utility to add sample data to empty admin tables
import { supabase } from "@/integrations/supabase/client";

export const addSampleData = async () => {
  try {
    // Check if tables are empty and add sample data
    const { data: services } = await supabase.from('services').select('id').limit(1);
    const { data: projects } = await supabase.from('projects').select('id').limit(1);
    const { data: products } = await supabase.from('products').select('id').limit(1);
    const { data: events } = await supabase.from('events').select('id').limit(1);

    // Add sample services if empty
    if (!services || services.length === 0) {
      await supabase.from('services').insert([
        {
          title: 'Business Development Consultation',
          description: 'Expert business development and strategy consultation services',
          content: 'Our business development consultation services help you identify growth opportunities, develop strategic plans, and implement effective business strategies to achieve your goals.',
          category: 'business_development',
          image_url: '/api/placeholder/400/300'
        },
        {
          title: 'Academic Research Support',
          description: 'Comprehensive academic research and consultation services',
          content: 'We provide academic research support, thesis guidance, and consultation services for students and researchers across various disciplines.',
          category: 'academic_consultancy',
          image_url: '/api/placeholder/400/300'
        },
        {
          title: 'Personal Development Coaching',
          description: 'Transform your personal and professional life with our coaching services',
          content: 'Our personal development coaching helps individuals unlock their potential, set meaningful goals, and create lasting positive changes in their lives.',
          category: 'personal_development',
          image_url: '/api/placeholder/400/300'
        },
        {
          title: 'General Merchandise Supply',
          description: 'Quality products and supplies for various needs',
          content: 'We offer a wide range of quality merchandise and supplies to meet your business and personal needs.',
          category: 'general_merchandise',
          image_url: '/api/placeholder/400/300'
        }
      ]);
    }

    // Add sample projects if empty
    if (!projects || projects.length === 0) {
      await supabase.from('projects').insert([
        {
          title: 'Sustainable Agriculture Initiative',
          description: 'Promoting sustainable farming practices in rural communities',
          content: 'This project focuses on implementing sustainable agricultural practices to improve crop yields while protecting the environment.',
          category: 'agribusiness' as const,
          status: 'active' as const,
          image_url: '/api/placeholder/500/300'
        },
        {
          title: 'Modern Housing Development',
          description: 'Affordable housing solutions for urban areas',
          content: 'Development of modern, affordable housing units to address the growing urban housing demand.',
          category: 'real_estate' as const,
          status: 'planning' as const,
          image_url: '/api/placeholder/500/300'
        },
        {
          title: 'Industrial Automation Project',
          description: 'Implementing automation solutions for manufacturing',
          content: 'A comprehensive project to automate manufacturing processes and improve efficiency.',
          category: 'industrial' as const,
          status: 'active' as const,
          image_url: '/api/placeholder/500/300'
        },
        {
          title: 'Educational Research Initiative',
          description: 'Research on improving educational outcomes',
          content: 'Academic research project focused on developing innovative educational methodologies.',
          category: 'research_academic' as const,
          status: 'active' as const,
          image_url: '/api/placeholder/500/300'
        }
      ]);
    }

    // Add sample products if empty
    if (!products || products.length === 0) {
      await supabase.from('products').insert([
        {
          name: 'Office Supplies Bundle',
          description: 'Complete office supplies package for businesses',
          category: 'Office Supplies',
          price: 150.00,
          in_stock: true,
          image_url: '/api/placeholder/300/300'
        },
        {
          name: 'Agricultural Tools Set',
          description: 'Professional farming tools and equipment',
          category: 'Agriculture',
          price: 350.00,
          in_stock: true,
          image_url: '/api/placeholder/300/300'
        },
        {
          name: 'Educational Materials Pack',
          description: 'Learning resources and educational materials',
          category: 'Education',
          price: 75.00,
          in_stock: true,
          image_url: '/api/placeholder/300/300'
        },
        {
          name: 'Construction Equipment',
          description: 'Quality construction tools and materials',
          category: 'Construction',
          price: 500.00,
          in_stock: false,
          image_url: '/api/placeholder/300/300'
        }
      ]);
    }

    // Add sample events if empty
    if (!events || events.length === 0) {
      await supabase.from('events').insert([
        {
          title: 'Business Development Workshop',
          description: 'Learn essential business development strategies',
          content: 'Join us for an intensive workshop covering business planning, market analysis, and growth strategies.',
          event_date: '2024-03-15T09:00:00Z',
          location: 'Conference Center, Accra',
          registration_required: true,
          max_participants: 50,
          image_url: '/api/placeholder/600/400'
        },
        {
          title: 'Academic Research Symposium',
          description: 'Annual symposium for researchers and academics',
          content: 'A gathering of researchers, academics, and students to share knowledge and collaborate on research projects.',
          event_date: '2024-03-22T10:00:00Z',
          location: 'University Campus',
          registration_required: true,
          max_participants: 100,
          image_url: '/api/placeholder/600/400'
        },
        {
          title: 'Personal Development Seminar',
          description: 'Unlock your potential with our development seminar',
          content: 'Interactive seminar focused on personal growth, goal setting, and achieving life balance.',
          event_date: '2024-04-05T14:00:00Z',
          location: 'Community Center',
          registration_required: false,
          max_participants: 30,
          image_url: '/api/placeholder/600/400'
        }
      ]);
    }

    console.log('Sample data added successfully');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
};