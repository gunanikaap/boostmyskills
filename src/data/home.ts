import type { Benefit, Step, Testimonial } from "@/lib/types";
import { images } from "@/data/site";

export const steps: Step[] = [
  {
    number: 1,
    title: "Create your account",
    description:
      "Sign up for free and explore our diverse range of micro-programmes and micro-credentials.",
  },
  {
    number: 2,
    title: "Choose your courses",
    description:
      "Pick the micro-programmes and micro-credentials that align with your goals and interests.",
  },
  {
    number: 3,
    title: "Learn and get certified",
    description:
      "Study at your own pace and earn certifications to boost your skills and career prospects.",
  },
];

export const benefits: Benefit[] = [
  {
    title:
      "Up-skill for a greener future: gain in-demand sustainability expertise and become a leader in the green economy.",
    icon: images.benefitStar,
  },
  {
    title:
      "Flexible learning: study at your own pace, anytime, anywhere, with our online courses and resources.",
    icon: images.benefitLabel,
  },
  {
    title:
      "Practical skills: apply your knowledge through real-world projects and case studies.",
    icon: images.benefitLightning,
  },
  {
    title:
      "Positive impact: contribute to a sustainable future by developing solutions to environmental challenges.",
    icon: images.benefitHeart,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "I was amazed by the breadth of renewable energy courses offered. I highly recommend BoostMySkills to anyone passionate about creating a sustainable future.",
    name: "Anya Petrova",
    role: "Sustainability Consultant",
    avatar: images.avatar,
  },
  {
    quote:
      "The practical skills I gained have already helped me implement sustainable practices in my workplace.",
    name: "Maria Gonzalez",
    role: "Renewable Energy Engineer",
    avatar: images.avatar,
  },
  {
    quote:
      "BoostMySkills helped me discover my passion for renewable energy and sustainability and explore potential career paths.",
    name: "David Kim",
    role: "Student",
    avatar: images.avatar,
  },
];
