export interface MediaItem {
  id: number;
  url: string;
  ext?: string;
  mime?: string;
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  size?: number;
  previewUrl?: string;
  provider?: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface HeroData {
  id: number;
  hero_background: MediaItem[];
  hero_photo: MediaItem;
  createdAt: string;
  updatedAt: string;
}

export interface HeroResponse {
  data: HeroData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  profile_image: MediaItem;
  bio?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  linkedin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamResponse {
  data: TeamMember[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  image: MediaItem;
  company?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialsResponse {
  data: Testimonial[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ContentBlock {
  title: string;
  description: string;
  list?: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  content?: ContentBlock[];
  conclusion: string;
  slug: string;
  image?: MediaItem;
  icon?: string;
  category?: string;
  price?: number;
  duration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  data: Service[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image: MediaItem;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Client {
  id: number;
  name: string;
  logo: MediaItem;
  description?: string;
  website?: string;
  industry?: string;
  case_study?: string;
  testimonial?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientsResponse {
  data: Client[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterResponse {
  data: NewsletterSubscription;
  meta: {};
}

export interface NavItem {
  title: string;
  url: string;
  items?: NavItem[];
}

export interface FooterLink {
  title: string;
  link: string;
}

export interface SearchResult {
  team: TeamMember[];
  services: Service[];
}

export interface SearchParams {
  q?: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    message: string;
    status: number;
  };
}

export interface SearchState {
  query: string;
}

export interface LanguageState {
  locale: 'en' | 'ar';
}

export interface SubscriptionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  lastEmail?: string;
  knownEmails: string[];
  errorMessage?: string;
}

export interface RootState {
  search: SearchState;
  language: LanguageState;
  subscription: SubscriptionState;
}

export interface HeroSectionProps {
  heroBackground: MediaItem[];
  heroPhoto: MediaItem;
}

export interface OurTeamSectionProps {
  team: TeamMember[];
}

export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export interface ServiceContentProps {
  service?: Service;
}

export interface SubscriptionFormValues {
  email: string;
}

export interface ValidationErrors {
  email?: string;
}

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseApiOptions {
  immediate?: boolean;
  revalidate?: number;
}

export interface UseSearchState {
  results: SearchResult | null;
  loading: boolean;
  error: string | null;
}

export type SupportedLocale = 'en' | 'ar';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
