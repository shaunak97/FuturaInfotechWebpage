// Content loading utilities for Stackbit integration
import { useState, useEffect } from 'react';

// Types for content models
export interface HeroSection {
  _model: 'HeroSection';
  title: string;
  subtitle: string;
  backgroundImage?: string;
  primaryButton?: { text: string; url: string };
  secondaryButton?: { text: string; url: string };
}

export interface AboutSection {
  _model: 'AboutSection';
  title: string;
  subtitle?: string;
  description: string;
  stats: Array<{ number: string; label: string }>;
}

export interface Service {
  _model: 'Service';
  title: string;
  description: string;
  image?: string;
  features: string[];
}

export interface Project {
  _model: 'Project';
  title: string;
  description: string;
  category: string;
  image?: string;
  results: string[];
  tags: string[];
}

export interface TeamMember {
  _model: 'TeamMember';
  name: string;
  title: string;
  bio?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface Testimonial {
  _model: 'Testimonial';
  quote: string;
  name: string;
  title: string;
  company?: string;
  image?: string;
}

export interface GalleryItem {
  _model: 'GalleryItem';
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface ContactSection {
  _model: 'ContactSection';
  title: string;
  subtitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
}

export interface PageData {
  title: string;
  slug: string;
  sections: Array<
    | HeroSection 
    | AboutSection 
    | { _model: 'ServicesSection'; title: string; subtitle?: string; services: string[] }
    | { _model: 'ProjectsSection'; title: string; subtitle?: string; projects: string[] }
    | { _model: 'GallerySection'; title: string; subtitle?: string; items: string[] }
    | { _model: 'TestimonialsSection'; title: string; subtitle?: string; testimonials: string[] }
    | ContactSection
  >;
}

// Content loading functions
export const loadPageContent = async (): Promise<PageData> => {
  try {
    const response = await fetch('/content/pages/home.json');
    if (!response.ok) throw new Error('Failed to load page content');
    return await response.json();
  } catch (error) {
    console.error('Error loading page content:', error);
    // Return fallback data structure
    return {
      title: 'Elevate Events - Home',
      slug: 'home',
      sections: []
    };
  }
};

export const loadServices = async (): Promise<Service[]> => {
  const serviceFiles = [
    'corporate-events.json',
    'social-celebrations.json', 
    'festival-entertainment.json',
    'catering-culinary.json',
    'trade-shows.json',
    'virtual-hybrid.json'
  ];
  
  const services = await Promise.all(
    serviceFiles.map(async (file) => {
      try {
        const response = await fetch(`/content/services/${file}`);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return await response.json();
      } catch (error) {
        console.error(`Error loading service ${file}:`, error);
        return null;
      }
    })
  );
  
  return services.filter(Boolean);
};

export const loadProjects = async (): Promise<Project[]> => {
  const projectFiles = [
    'techcon-2023.json',
    'summer-music-festival.json',
    'richardson-chen-wedding.json'
  ];
  
  const projects = await Promise.all(
    projectFiles.map(async (file) => {
      try {
        const response = await fetch(`/content/projects/${file}`);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return await response.json();
      } catch (error) {
        console.error(`Error loading project ${file}:`, error);
        return null;
      }
    })
  );
  
  return projects.filter(Boolean);
};

export const loadTeamMembers = async (): Promise<TeamMember[]> => {
  const teamFiles = [
    'sarah-johnson.json',
    'michael-torres.json', 
    'emily-chen.json'
  ];
  
  const members = await Promise.all(
    teamFiles.map(async (file) => {
      try {
        const response = await fetch(`/content/team/${file}`);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return await response.json();
      } catch (error) {
        console.error(`Error loading team member ${file}:`, error);
        return null;
      }
    })
  );
  
  return members.filter(Boolean);
};

export const loadTestimonials = async (): Promise<Testimonial[]> => {
  const testimonialFiles = [
    'jennifer-lee.json',
    'robert-chen.json',
    'marcus-johnson.json'
  ];
  
  const testimonials = await Promise.all(
    testimonialFiles.map(async (file) => {
      try {
        const response = await fetch(`/content/testimonials/${file}`);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return await response.json();
      } catch (error) {
        console.error(`Error loading testimonial ${file}:`, error);
        return null;
      }
    })
  );
  
  return testimonials.filter(Boolean);
};

export const loadGalleryItems = async (): Promise<GalleryItem[]> => {
  const galleryFiles = [
    'corporate-conference.json',
    'corporate-event-video.json',
    'music-festival.json',
    'wedding-video.json',
    'wedding-reception.json',
    'product-launch.json',
    'festival-video.json',
    'gala-dinner.json',
    'concert-production.json',
    'team-building.json',
    'birthday-celebration.json',
    'award-ceremony.json'
  ];
  
  const items = await Promise.all(
    galleryFiles.map(async (file) => {
      try {
        const response = await fetch(`/content/gallery/${file}`);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return await response.json();
      } catch (error) {
        console.error(`Error loading gallery item ${file}:`, error);
        return null;
      }
    })
  );
  
  return items.filter(Boolean);
};

// React hooks for content loading
export const usePageContent = () => {
  const [content, setContent] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPageContent()
      .then(setContent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { content, loading, error };
};

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadServices()
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
};

export const useTeamMembers = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeamMembers()
      .then(setMembers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { members, loading, error };
};

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials()
      .then(setTestimonials)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { testimonials, loading, error };
};

export const useGalleryItems = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGalleryItems()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading, error };
};